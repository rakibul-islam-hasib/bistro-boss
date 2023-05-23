import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, recipe, price } = item;
    return (
        <div className='flex items-center gap-3'>
            <img className='h-[100px] w-[110px]' style={{borderRadius : '0 200px 200px 200px'}} src={image} alt="" />
            <div className="">
                <h1 className='text-2xl'>{name}----------</h1>
                <p className='text-[#737373]'>{recipe}</p>
            </div>
            <h1 style={{ whiteSpace: 'nowrap' }} className='text-[#BB8506]'>$ {price}</h1>
        </div>
    );
};

export default MenuItem;