import React, { useContext } from 'react';
import bgImg from '../../../assets/reservation/wood-grain-pattern-gray1x.png'
import authImg from '../../../assets/others/authentication2.png'
import { AuthContext } from '../../../providers/AuthProvider';
const Register = () => {
    const { signUp , user } = useContext(AuthContext); 

    // if (user) {
    //     return <Navigate to='/' />
    // }

    const handelFormSubmit = (e) => {
        e.preventDefault()
        const fromData = new FormData(e.target)
        const data = Object.fromEntries(fromData)
        signUp(data.email, data.password)
        .then(result => {})
        .catch(err => { 
            console.log(err.code)
        })
    }
    console.log(user , 'user from register')
    return (
        <div className='min-h-screen lg:px-40 py-20 ' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="shadow-lg py-11 shadow-indigo-500 grid grid-cols-1 lg:grid-cols-2" style={{ backgroundImage: `url(${bgImg})` }}>
                <div className="">
                    <img src={authImg} alt="" />
                </div>
                <div className="w-1/2 mx-auto">
                    <h1 className='text-3xl text-center font-bold'>Register</h1>
                    <form onSubmit={handelFormSubmit} action="">
                        <div className="flex flex-col items-center">
                            <div className="">
                                <h1 className='ml-2'>Name</h1>
                                <input
                                    className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                                    type="text" name='name' placeholder='Name' />
                            </div>
                            <div className="my-5">
                                <h1 className='ml-2'>Email</h1>
                                <input
                                    className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                                    type="email"
                                    required
                                    name='email'
                                    placeholder='Email' />
                            </div>
                            <div className="">
                                <h1 className='ml-2'>Password</h1>
                                <input
                                    className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                                    type="password"
                                    required
                                    name='password'
                                    placeholder='Name' />
                            </div>
                            <p className='my-2 text-[#D1A054]'>Already registered? Go to log in</p>
                            <button type='submit' className='w-full py-3 my-4 rounded-xl font-bold bg-[#D1A054]'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;