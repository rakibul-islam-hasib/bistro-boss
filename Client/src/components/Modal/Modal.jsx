import { useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCrossMark } from 'react-icons/gi';
import { AuthContext } from '../../providers/AuthProvider';
const Modal = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // const [loader, setLoader] = useState(false);
  const { login  , loader} = useContext(AuthContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 20);
  };
  const handelFromSubmit = async (e) => {
    // setLoader(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await login(email, password);
      // setLoader(false);
      closeModal()
    } catch (error) {
      // setLoader(false);
      console.log(error.code);
    }
  };
  console.log(loader)
  if (loader) {
    return <div className="h-screen w-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            className={`bg-white rounded-lg p-4 shadow-xl ${isAnimating ? 'pointer-events-none' : ''}`}
          >
            <div className=" w-full relative">
              <button
                title='Close Popup'
                className="bg-transparent text-black absolute top-0 right-0 rounded px-4 py-2"
                onClick={closeModal}
              >
                <GiCrossMark className="w-6 text-red-500 h-6" />
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-xl  font-bold text-center mb-4">Login</h2>
              <p className="mb-4 text-center">Please login to continue.</p>
              {/* Form  */}
              <form onSubmit={handelFromSubmit} action="">

                <div className="bg-white p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      ref={emailRef}
                      type="text"
                      required
                      name="email"
                      className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me" />
                    <label
                      htmlFor="email"
                      onClick={() => emailRef.current.focus()}
                      className="absolute cursor-text left-1 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                      Email Address
                    </label>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="relative bg-inherit">
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      required
                      className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me" />
                    <label
                      htmlFor="password"
                      onClick={() => passwordRef.current.focus()}
                      className="absolute cursor-text left-1 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                      Password
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button className='px-7 py-2 bg-blue-500 font-bold text-white rounded-md' type='submit'>Login</button>
                </div>
              </form>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
