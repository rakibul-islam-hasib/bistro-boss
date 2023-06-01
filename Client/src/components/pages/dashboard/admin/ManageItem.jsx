import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle';
import { useMenu } from '../../../../hooks/useMenu';
import { Pagination, Stack } from '@mui/material';

const ManageItem = () => {
    const [menu] = useMenu();

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(menu.slice(0, 5));
    const itemPerPage = 8;
    const totalItem = menu.length;
    const pageCount = Math.ceil(totalItem / itemPerPage);
    const handelPageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const start = (currentPage - 1) * itemPerPage;
        const end = currentPage * itemPerPage;
        setData(menu.slice(start, end));
    }, [currentPage, menu]);

    return (
        <div>
            <div className="my-10">
                <SectionTitle title="Hurry up" body="MANAGE ALL ITEM" />
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-[#D1A054]">
                            <th className="w-[10%] py-4 pl-6 pr-2 text-left text-white font-bold uppercase"></th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Photo</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Item name</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Price</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Update</th>
                            <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white overflow-y-auto">
                        {data.map((item, index) => {
                            const itemIndex = (currentPage - 1) * itemPerPage + index + 1;
                            return (
                                <tr key={item._id}>
                                    <td className="py-4 pl-6 pr-2 border-b border-gray-200">{itemIndex}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                                        <img src={item.image} className="h-[60px] w-[60px] " alt="" />
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{item.name}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{item.price}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span className="bg-[#D1A054] text-white py-1 px-2 rounded-full text-xs">Update</span>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Delete</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Stack spacing={2}>
                    <Pagination onChange={handelPageChange} count={pageCount} color="primary" />
                </Stack>
            </div>
        </div>
    );
};

export default ManageItem;
