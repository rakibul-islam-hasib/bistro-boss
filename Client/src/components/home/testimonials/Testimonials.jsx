import React, { useEffect, useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { FaQuoteLeft } from 'react-icons/fa';
const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className='w-[90%] mx-auto'>
            <SectionTitle title='What Our Clients Say' body='TESTIMONIALS' />
            <Swiper
                navigation={true}
                loop={true}
                modules={[Navigation]}
                className='mt-32'
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col mx-24 my-10 space-y-5 items-center justify-center">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <FaQuoteLeft className='text-7xl text-black' />
                            <p className='text-center text-[#737373]'>{review.details}</p>
                            <h1 className='text-2xl uppercase text-[#CD9003] font-bold mt-3'>{review.name}</h1>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;