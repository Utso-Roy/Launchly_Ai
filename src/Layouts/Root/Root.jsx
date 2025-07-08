import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>
      <Footer></Footer>


    </div>
  );
};

export default Root;