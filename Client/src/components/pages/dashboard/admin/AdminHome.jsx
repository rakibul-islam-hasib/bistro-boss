import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import BarChartCompo from './home/components/ChartJS/BarChart';
import PieDashboard from './home/components/ChartJS/PieDashboard';

const AdminHome = () => {
    const {user } = useContext(AuthContext);
    const [adminStats, setAdminStats] = useState({});
    useEffect(()=>{
        fetch('http://localhost:5000/admin-stats')
        .then(res=>res.json())
        .then(data=>setAdminStats(data))    
    },[])
    return (
        <div className='mx-6'>
            <h1 className='text-2xl my-9 font-bold'>Welcome Back ,<span className='text-yellow-500'>{user?.displayName}</span></h1>

            <div className="grid gap-8 md:grid-cols-4">
                {/* Revenue */}
                <div style={{background: 'linear-gradient(90deg, #BB34F5 0%, #FCDBFF 100%)'}} className="flex justify-center items-center py-5 px-6 gap-5 rounded-xl">
                    <FaMoneyCheckAlt className='text-5xl text-white ' />
                    <div className="">
                        <h1 className='text-2xl text-white font-bold'>${parseFloat(adminStats?.totalAmount).toFixed(1)}</h1>
                        <h1 className='text-2xl text-white font-bold'>Revenue</h1>
                    </div>
                </div>
                {/* Customers */}
                <div style={{background: 'linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)'}} className="flex justify-center items-center py-5 px-6 gap-5 rounded-xl">
                    <FaMoneyCheckAlt className='text-5xl text-white ' />
                    <div className="">
                        <h1 className='text-2xl text-white font-bold'>{adminStats?.totalUsers}</h1>
                        <h1 className='text-2xl text-white font-bold'>Customers</h1>
                    </div>
                </div>
                {/* Products  */}
                <div style={{background: 'linear-gradient(90deg, #FE4880 0%, #FECDE9 100%)'}} className="flex justify-center items-center py-5 px-6 gap-5 rounded-xl">
                    <FaMoneyCheckAlt className='text-5xl text-white ' />
                    <div className="">
                        <h1 className='text-2xl text-white font-bold'>{adminStats?.totalItem}</h1>
                        <h1 className='text-2xl text-white font-bold'>Products</h1>
                    </div>
                </div>
                {/* Orders   */}
                <div style={{background: 'linear-gradient(90deg, #6AAEFF 0%, #B6F7FF 100%)'}} className="flex justify-center items-center py-5 px-6 gap-5 rounded-xl">
                    <FaMoneyCheckAlt className='text-5xl text-white ' />
                    <div className="">
                        <h1 className='text-2xl text-white font-bold'>{adminStats?.totalOrder}</h1>
                        <h1 className='text-2xl text-white font-bold'>Orders</h1>
                    </div>
                </div>
                
            </div>
            <div className="grid my-9 grid-cols-2">
                <div className="">
                    <BarChartCompo />
                </div>
                <div className="">
                    <PieDashboard />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;