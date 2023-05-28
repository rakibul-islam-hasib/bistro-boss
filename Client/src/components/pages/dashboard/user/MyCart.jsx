import React from 'react';
import SectionTitle from '../../../shared/SectionTitle';
import { useCart } from '../../../../hooks/useCart';

const MyCart = () => {
    const [cart] = useCart();
    console.log("🚀 ~ file: MyCart.jsx:7 ~ MyCart ~ cart:", cart);

    return (
        <div>
            <div className="my-8">
                <SectionTitle title="My Cart" body="Wanna add more? " />
            </div>
            <div className="">
                <div className="  py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
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
                                            </tr>
                                        </thead>
                                        <tbody className="gap-7">
                                            {cart.map((item) => (
                                                <tr  key={item._id} className=''>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                className="h-16 w-16 mr-4"
                                                                src={item.image}
                                                                alt="Product image"
                                                            />
                                                            <span className="font-semibold">Product name</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">$19.99</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                                            <span className="text-center w-8">1</span>
                                                            <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">$19.99</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="md:w-1/4">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>$19.99</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Taxes</span>
                                        <span>$1.99</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold">$21.98</span>
                                    </div>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
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
