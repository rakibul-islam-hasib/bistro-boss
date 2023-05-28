import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Modal from '../../Modal/Modal';
import { useCart } from '../../../hooks/useCart';
import { toast } from 'react-hot-toast';

const ShopCards = ({ data = [] }) => {
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carts, setCarts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/carts')
            .then(res => res.json())
            .then(data => setCarts(data))
    }, [])
    const openModal = () => {
        setIsModalOpen(true);
    };
    const onClickHandler = itm => {
        if (!user && !user?.email) {
            openModal();
        }
        if (user && carts.find(c => c._id === itm._id)) {
            toast.error("Item is already added to cart")
            return;
        }
        if (user && user.email) {
            const item = { ...itm, email: user.email }
            // console.log(item)
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        toast.success("Item added to cart")
                        refetch();
                    }
                })
        } else {
            openModal();
        }
    }
    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
                    data.map(item => <div key={item._id} className=" bg-white shadow rounded">
                        <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}>
                        </div>
                        <div className="p-4 flex flex-col items-center">
                            <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                            <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                            <p className="text-center text-gray-800 mt-1">€1299</p>

                            <button
                                onClick={() => onClickHandler(item)}
                                className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                Add to cart
                            </button>
                        </div>
                    </div>
                    )
                }
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ShopCards;