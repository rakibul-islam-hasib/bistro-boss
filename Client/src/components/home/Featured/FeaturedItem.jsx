import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import featuredImg from '../../../assets/home/latestnews.jpg'
const FeaturedItem = () => {
    return (
        <div className='my-36 bg-cover bg-no-repeat bg-fixed' style={{ backgroundImage: `url(${featuredImg})` }}>
            <div className="bg-black text-white py-28 bg-opacity-60">
                <div className="">
                    <SectionTitle title='Check it out' body='FROM OUR MENU' />
                </div>
                <div className="w-[70%] mt-11    items-center gap-12 flex-col md:flex-row flex justify-center mx-auto">
                    <div className="">
                        <img className='w-[750px]' onContextMenu={e => e.preventDefault()} src={featuredImg} alt="" />
                    </div>
                    <div className="">
                        <p>March 20, 2023</p>
                        <h2 className='text-xl font-bold my-3'>WHERE CAN I GET SOME?</h2>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                        <button className='uppercase px-7 border-b-2 border-white rounded-xl py-3 mt-5 hover:bg-white hover:text-black duration-300'>read more </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;