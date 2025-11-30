import { React, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/auth-hook';
import Avatar from '../../assets/avatar.png';
import DigitalClock from '../../contexts/DigitalClock';
import { userLogout } from '../../utils/api';
import FullScreen from '../../contexts/FullScreen';
import Cookies from 'js-cookie';

const Header = ({ issidebar, changeSidebar, islogin, isBreadcrumb, handleOpenBreadcrumb }) => {
  const { email, name, } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const logoutbtn = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = { token: userData.token };
    try {
      setIsSubmitted(false);
      const response = await userLogout(data);
      Cookies.remove('email');
      Cookies.remove('password');
      localStorage.clear();
      window.location.replace('/');
    }
    catch (err) {
      setIsSubmitted(null);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const onChangeProjectHandler = () => {
    localStorage.removeItem("selectedProject");
    window.location.reload();
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);



  return (

    <header className="flex-shrink-0 border-b mb-5" style={{ backgroundColor: 'rgb(63, 61, 86) !important' }}>
      <div className="flex items-center justify-between p-2 pr-4 pl-4">
        <div className="items-center space-x-3 hidden px-2 space-x-2 lg:flex xl-flex">
          <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">C</span>
          <button
            className="p-2 rounded-md focus:outline-none focus:ring"
            edge="start"
            aria-label="menu"
            onClick={changeSidebar}
          >
            <svg
              className={`w-4 h-4 text-gray-600 transform transition-transform ${!issidebar ? '-rotate-180' : ''
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path className="stroke-2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div
          className='items-center px-0 py-2 space-x-2 hidden custom_bredcrumb'
        >
          <button
            className="rounded-md focus:outline-none focus:ring"
            aria-label="menu"
            onClick={handleOpenBreadcrumb}
          >
            <svg className="text-gray-500 h-8 w-8" fill='#9f262d' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2"></rect>
              <rect x="4" y="11" width="16" height="2"></rect>
              <rect x="4" y="17" width="16" height="2"></rect>
            </svg>
          </button>
        </div>

        <div className="relative flex items-center space-x-3">
          <DigitalClock />
          <FullScreen />
          <div className="relative" ref={modalRef}>
            <button
              className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"
              onClick={toggleDropdown}
            >
              <img className="object-cover w-8 h-8 rounded-full" src={Avatar} />
            </button>
            <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
            <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>
            {isOpen && (
              <div
                className="w-56 md:min-w-0 absolute mt-2 transform -translate-x-full bg-lightAlmond shadow-lg min-w-max translate-x-[-11rem] z-10 border border-gray-200"
                style={{ zIndex: '11' }}
              >
                <div className="flex flex-col p-4 space-y-1 font-medium border-b items-center">
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full" role="none">
                    <img src={Avatar} className="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt="" role="none" />
                  </div>
                  <span className="text-gray-800">{name}</span>
                  <span className="text-xs text-gray-600 overflow-wrap-normal text-center" style={{ overflowWrap: 'anywhere' }}>{email}</span>
                </div>
                <ul className="flex flex-col p-2 my-2 space-y-1">
                  <li>
                    <Link to="/userprofile" className="block px-2 py-1 transition rounded-md hover:bg-primary-900 hover:text-white">Profile</Link>
                  </li>
                  <li>
                    <button onClick={onChangeProjectHandler} className="block px-2 py-1 transition rounded-md hover:bg-primary-900 hover:text-white">Switch project</button>
                  </li>
                </ul>
                <div className="flex items-center justify-center text-blue-700">
                  <button disabled={isSubmitted === false ? true : false} className="w-full flex justify-center py-2 px-4 text-sm font-medium no-underline text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 " onClick={logoutbtn}>
                    {isSubmitted === false ? <><svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                      />
                    </svg><span>Logging out...</span></> : <>
                      <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path className="stroke-2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      <span>Logout</span>
                    </>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    </header >

  );
};

export default Header;
