import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Modal from '../../Modal/Modal';
import { useCart } from '../../../hooks/useCart';
import { toast } from 'react-hot-toast';
import beepAlert from '../../../assets/audios/beep-sound-8333.mp3';
import  alertAudio from '../../../assets/audios/wrong-answer-129254.mp3';
const beepAudio = new Audio(beepAlert);
const alert = new Audio(alertAudio);

const ShopCards = ({ data = [] }) => {
    const { user } = useContext(AuthContext);
    const [carts, refetch] = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const onClickHandler = itm => {
        // console.log(itm._id)
        if (carts.find(item => item.itemId === itm._id)) {
            alert.play(); // Play the alert sound
            toast.error("Item already added to cart");
            return;
        }
        if (!user || !user.email) {
            openModal();
            return;
        }

        if (user && user.email) {
            const { _id, ...itemData } = itm; // Create a new object without the _id field
            const item = { ...itemData, email: user.email, itemId: _id };
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        beepAudio.play(); // Play the beep sound
                        toast.success("Item added to cart");
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            openModal();
        }
    };

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
                            <p className="text-center text-gray-800 my-1">${item.price}</p>

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