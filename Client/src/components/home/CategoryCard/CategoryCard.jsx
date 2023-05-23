import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import slider1 from '../../../assets/home/slide1.jpg';
import slider2 from '../../../assets/home/slide2.jpg';
import slider3 from '../../../assets/home/slide3.jpg';
import slider4 from '../../../assets/home/slide4.jpg';
import slider5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../shared/SectionTitle';


const CategoryCard = () => {
    const [slidesPerView, setSlidesPerView] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 680) {
                setSlidesPerView(2);
            }
            else if (screenWidth > 680 && screenWidth < 880) {
                setSlidesPerView(3);
            }
            else {
                setSlidesPerView(4);
            }
        };

        handleResize(); // Set initial value

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='my-24'>
            <div className="mb-16">
                <SectionTitle title={'From 11:00am to 10:00pm'} body={'ORDER ONLINE'} />
            </div>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, FreeMode]}
                className="mySwiper max-w-[80%] mx-auto"
            >
                <SwiperSlide>
                    <img src={slider1} alt="" />
                    <h1 className='text-3xl text-center uppercase font-bold -mt-14 text-white shadow-lg'>Salads</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <h1 className='text-3xl text-center uppercase font-bold -mt-14 text-white shadow-lg'>Soups</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h1 className='text-3xl text-center uppercase font-bold -mt-14 text-white shadow-lg'>pizzas</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <h1 className='text-3xl text-center uppercase font-bold -mt-14 text-white shadow-lg'>desserts</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <h1 className='text-3xl text-center uppercase font-bold -mt-14 text-white shadow-lg'>salads</h1>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CategoryCard;
