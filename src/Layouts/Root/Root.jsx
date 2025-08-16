import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='md:mt-16 sm:mt-16 mt-18'>
        
      <Outlet></Outlet>
      <Footer></Footer>
</div>


    </div>
  );
};

export default Root;