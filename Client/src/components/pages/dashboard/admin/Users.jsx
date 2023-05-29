import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SectionTitle from '../../../shared/SectionTitle';
import { FaUserAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';

const Users = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'], queryFn: async () => {
            const result = await fetch('http://localhost:5000/users');
            const data = await result.json();
            return data;
        }
    })
    console.log(users)
    return (
        <>
            <div className="my-16">
                <SectionTitle title="How many ? " body='Manage all users' />
            </div>
            <div className="flex  flex-col w-[80%] mx-auto">
                <h1 className='text-center  text-3xl my-4'>Total users  : {users.length}</h1>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b bg-[#D1A054]">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Role</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => <tr className="border-b" key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"><div className='px-3 text-xl py-2 w-fit rounded-lg cursor-pointer bg-[#D1A054]'><FaUserAlt /></div></td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <div className='px-3 py-2 w-fit rounded-lg cursor-pointer text-xl bg-red-400 text-white'><BsTrash /></div>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;