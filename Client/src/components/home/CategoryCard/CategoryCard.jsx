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
                    <div className="relative">
                        <img src={slider1} alt="" />
                        <div className="absolute bottom-0  p-4 bg-white bg-opacity-30 backdrop-filter w-full backdrop-blur-md">
                            <h1 className='text-3xl text-center uppercase font-bold text-white'>Salads</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={slider2} alt="" />
                        <div className="absolute bottom-0  p-4 bg-white bg-opacity-30 backdrop-filter w-full backdrop-blur-md">
                            <h1 className='text-3xl text-center uppercase font-bold text-white'>Soups</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={slider3} alt="" />
                        <div className="absolute bottom-0  p-4 bg-white bg-opacity-30 backdrop-filter w-full backdrop-blur-md">
                            <h1 className='text-3xl text-center uppercase font-bold text-white'>Pizzas</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={slider4} alt="" />
                        <div className="absolute bottom-0  p-4 bg-white bg-opacity-30 backdrop-filter w-full backdrop-blur-md">
                            <h1 className='text-3xl text-center uppercase font-bold text-white'>Desserts</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={slider5} alt="" />
                        <div className="absolute bottom-0  p-4 bg-white bg-opacity-40 backdrop-filter w-full backdrop-blur-md">
                            <h1 className='text-3xl text-center uppercase font-bold text-white'>Salads</h1>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CategoryCard;
