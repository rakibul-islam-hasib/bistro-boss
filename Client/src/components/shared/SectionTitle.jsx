import React from 'react';

const SectionTitle = ({ title , body}) => {
    return (
        <div className="md:w-[30%] w-[80%] mx-auto text-center">
            <h1 className='text-[#D99904] text-xl  font-semibold italic'>--- {title} ---</h1>
            <div className="border-b-2 my-3"></div>
            <h1 className='text-3xl font-bold'>{body}</h1>
            <div className="border-b-2 my-3"></div>
        </div>
    );
};

export default SectionTitle;