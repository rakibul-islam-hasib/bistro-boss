import React from 'react';
import { CiFacebook } from 'react-icons/ci';
import { BsInstagram } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
const Footer = () => {
    return (
        <>
            <div className='grid md:grid-cols-2 mt-60'>
                <div className="bg-[#1F2937] flex justify-end">
                    <div className="text-white text-center pr-20 py-20">
                        <h1 className='text-2xl mb-5 font-bold'>CONTACT US</h1>
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>Phone: +880 123 456 789</p>
                        <p>Mon - Fri: 08:00 - 22:00 </p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>
                <div className="bg-[#111827]  text-white pl-20 py-20">
                    <h1 className='text-2xl font-bold '>Follow US</h1>
                    <p className='my-6'>Join us on social media</p>
                    <div className="flex items-center mt-3 gap-5">
                        <CiFacebook className='h-8 hover:text-red-400 duration-300 cursor-pointer w-8' />
                        <BsInstagram className='h-8 hover:text-red-400 duration-300 cursor-pointer w-8' />
                        <AiOutlineTwitter className='h-8 hover:text-red-400 duration-300 cursor-pointer w-8' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;