import React, { useContext, useEffect } from 'react';
import bgImg from '../../../assets/reservation/wood-grain-pattern-gray1x.png'
import authImg from '../../../assets/others/authentication2.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handelFormSubmit = e => {
        e.preventDefault()
        const fromData = new FormData(e.target)
        const data = Object.fromEntries(fromData)
        // console.log(data)
        login(data.email, data.password)
        .then(result => { 
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err.code)
        })
        const user_captcha = data.captcha;
        // if (validateCaptcha(user_captcha)) {
           
        // }
        // else {
        //     alert('Captcha Does Not Matched')
        //     return;
        // }
    }


    // Effects 
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    return (
        <div className='min-h-screen lg:px-40 py-20 ' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="shadow-lg py-11 shadow-indigo-500 grid grid-cols-1 lg:grid-cols-2" style={{ backgroundImage: `url(${bgImg})` }}>
                <div className="">
                    <img src={authImg} alt="" />
                </div>
                <div className="w-1/2 mx-auto">
                    <h1 className='text-3xl text-center font-bold'>Login</h1>
                    <form onSubmit={handelFormSubmit} action="">
                        <div className="flex flex-col items-center">
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
                                    placeholder='Password' />
                            </div>
                            <div className="w-full my-2">
                                <LoadCanvasTemplate />
                            </div>
                            <div className="">
                                <h1 className='ml-2'>Captcha</h1>
                                <input
                                    className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                                    type="text"
                                    // required
                                    name='captcha'
                                    placeholder='Captcha' />
                            </div>
                            <p className='my-2 text-[#D1A054]'>New to Bistro ?  <Link to={'/register'} className='text-orange-300'>Register</Link></p>
                            <button type='submit' className='w-full py-3 my-4 rounded-xl font-bold bg-[#D1A054]'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;