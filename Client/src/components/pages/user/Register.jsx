import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { trigger } from 'react-hook-form'; // Add this import
import bgImg from '../../../assets/reservation/wood-grain-pattern-gray1x.png';
import authImg from '../../../assets/others/authentication2.png';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../Modal/Modal';
const Register = () => {
  const navigate = useNavigate();
  const { signUp, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const onSubmit = (data) => {
    console.log(data , 'register data');
    signUp(data.email, data.password)
      .then((result) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err.code);
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='min-h-screen lg:px-40 py-20' style={{ backgroundImage: `url(${bgImg})` }}>
      <div
        className='shadow-lg py-11 shadow-indigo-500 grid grid-cols-1 lg:grid-cols-2'
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className=''>
          <img src={authImg} alt='' />
        </div>
        <div className='w-1/2 mx-auto'>
          <h1 className='text-3xl text-center font-bold'>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} action=''>
            <div className='flex flex-col items-center'>
              <div className=''>
                <h1 className='ml-2'>Name</h1>
                <input
                  className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                  type='text'
                  name='name'
                  {...register('name', { required: true })}
                  placeholder='Name'
                />
                {errors.name && (
                  <span className='text-xs text-red-500 ml-2'>This field is required</span>
                )}
              </div>
              <div className='my-2'>
                <h1 className='ml-2'>Email</h1>
                <input
                  className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                  type='email'
                  {...register('email', { required: true })}
                  name='email'
                  placeholder='Email'
                />
                {errors.email && (
                  <span className='text-xs text-red-500 ml-2'>Email is required</span>
                )}
              </div>
              <div className=''>
                <h1 className='ml-2'>Password</h1>
                <input
                  className='border-2 border-gray-400 outline-none w-full rounded-md px-2 py-1 mt-2'
                  type='password'
                  {...register('password', {
                    required: true, minLength: 8,
                    // pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$/
                  })}
                  name='password'
                  placeholder='Password'
                  onChange={() => {
                    trigger('password');
                  }}
                />
                {errors.password?.type === 'required' && (
                  <span className='text-xs text-red-500 ml-2'>Password is required</span>
                )}
                {/* {errors.password?.type === 'pattern' && (
                  <span className='text-xs text-red-500 ml-2'>Need One uppercase one lowercase and one symbol</span>
                )} */}
                {errors.password?.type === 'minLength' && (
                  <span className='text-xs text-red-500 ml-2'>
                    Password must be at least 6 characters long
                  </span>
                )}
              </div>
              <p className='my-2 text-[#D1A054]'>
                Already registered? Go to <Link to={'/login'}>log in</Link>
              </p>
              <button
                type='submit'
                className='w-full py-3 my-4 rounded-xl font-bold bg-[#D1A054]'
              >
                Register
              </button>
            </div>
          </form>
          <button onClick={openModal}>Open Modal</button>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Register;
