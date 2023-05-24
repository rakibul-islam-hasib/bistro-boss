import React from 'react';

const ShopCards = ({ data = [] }) => {
    return (
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
                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                            Add to cart
                        </button>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default ShopCards;