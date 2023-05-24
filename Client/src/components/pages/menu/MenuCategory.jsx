import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import MenuItem from '../../MenuItem/MenuItem';

const MenuCategory = ({ item = [], sTitle, sBody }) => {
    return (
        <>
            <div className="my-16">
              {sTitle && <SectionTitle title={sTitle} body={sBody} />}
            </div>
            <div className="grid my-8 w-[80%] mx-auto gap-10 md:grid-cols-2">
                {
                    item.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </>
    );
};

export default MenuCategory;