import React, { useState, useEffect } from 'react';
import Router from '../Router';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import Footer from '../components/dashboard/Footer';
import { checkLogin, selectedProject } from '../auth/index';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [islogin, setislogin] = useState(false);
  const [issidebar, sidebaraction] = useState(false);
  const [isBreadcrumb, setIsBreadcrumb] = useState(false);



  const changeSidebar = () => {
    sidebaraction(!issidebar);
  };

  const handleOpenBreadcrumb = () => {
    setIsBreadcrumb(!isBreadcrumb);
  };

  const handleCloseBreadcrumb = () => {
    setIsBreadcrumb(!isBreadcrumb);
  }

  useEffect(() => {
    if (checkLogin()) {
      setislogin(true);
    }
  }, []);

  return (
    <>
      <div className='flex h-screen overflow-y-hidden bg-whiteLinen'>
        {checkLogin() && selectedProject() ? (<Sidebar islogin={islogin} issidebar={issidebar} isBreadcrumb={isBreadcrumb} handleCloseBreadcrumb={handleCloseBreadcrumb} />) : null}
        <div className='flex flex-col flex-1 h-full overflow-hidden'>
          {checkLogin() && selectedProject() ? (<Header issidebar={issidebar} islogin={islogin} changeSidebar={changeSidebar} isBreadcrumb={isBreadcrumb} handleOpenBreadcrumb={handleOpenBreadcrumb} />) : null}
          <main className='flex-1 max-h-full px-5 overflow-hidden overflow-y-auto'>
            <Router />
          </main>
        </div>
      </div >
    </>
  );
};

export default Index;
