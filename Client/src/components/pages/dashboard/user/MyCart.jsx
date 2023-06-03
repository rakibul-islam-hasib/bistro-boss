import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle';
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import { useCart } from '../../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../providers/AuthProvider';
const MyCart = () => {
    // const [cart, refetch , isLoading] = useCart();
    const [cart, setCart] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loader, setLoader] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(cart.slice(0, 5));
    const itemPerPage = 5;
    const totalItem = cart.length;
    const pageCount = Math.ceil(totalItem / itemPerPage);
    const handelPageChange = (event, value) => {
        setCurrentPage(value);
    };
    const fetchData = () => {
        setLoader(true);
        axiosSecure
            .get(`/cart?email=${user.email}`)
            .then((res) => {
                setCart(res.data);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);
            });
    };

    useEffect(() => {
      fetchData()
    }, [user, currentPage])
    // console.log('hello ')
    useEffect(() => {
        const start = (currentPage - 1) * itemPerPage;
        const end = currentPage * itemPerPage;
        setData(cart.slice(start, end));
    }, [currentPage, cart]);

    let handelDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            fetchData()
                            Swal.fire(
                                'Deleted!',
                                'Your item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })


    }

    const subTotal = cart.reduce((acc, item) => acc + item.price, 0);
    const tax = Math.round(subTotal * 0.1) || 0;
    const shipping = Math.round(subTotal * 0.2) || 0;
    const total = subTotal + tax + shipping || 0;

    if (loader) {
        return <div className="">
            <h1>Loading....</h1>
        </div>
    }

    return (
        <div>
            <div className="my-8">
                <SectionTitle title="My Cart" body="Wanna add more? " />
            </div>
            <div className="">
                <div className="  py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-semibold mb-4">Total item : {cart.length}</h1>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-3/4">
                                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="text-left font-semibold">Product</th>
                                                <th className="text-left font-semibold">Price</th>
                                                <th className="text-left font-semibold">Quantity</th>
                                                <th className="text-left font-semibold">Total</th>
                                                <th className="text-left font-semibold">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="gap-7">
                                            {
                                                data.length > 0 ? data.map((item) => (
                                                    <tr key={item._id} className=''>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="h-16 w-16 mr-4"
                                                                    src={item.image}
                                                                    alt="Product image"
                                                                />
                                                                <span className="font-semibold">{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">${item.price}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                                                <span className="text-center w-8">1</span>
                                                                <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">$19.99</td>
                                                        <td className="py-4">
                                                            <button className="text-red-500" onClick={() => handelDelete(item._id)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : <tr>
                                                    <td colSpan="5" className="text-center">No item found</td>
                                                </tr>

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Stack spacing={2}>
                                    <Pagination onChange={handelPageChange} count={pageCount} color="primary" />
                                </Stack>
                            </div>
                            <div className="md:w-1/5 md:fixed right-0">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>${subTotal}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Taxes</span>
                                        <span>${tax}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span>${shipping}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold">${total}</span>
                                    </div>
                                    <button onClick={() => navigate('/dashboard/payment', { state: { price: total } })} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyCart;
  /* useEffect(() => {
    if (user?.email) {
        fetch(`http://localhost:5000/cart?email=${user?.email}` , { 
            headers : { 
                authorization : `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }
}, []) */