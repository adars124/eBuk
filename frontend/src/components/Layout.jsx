import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import CmsNav from './CmsNav';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const Layout = () => {

    const user = useSelector(state => state.user.value);

    return (
        <main className='w-11/12 mx-auto bg-secondary'>
            <NavBar />

            <Outlet />

            <Footer />
        </main>
    );
};

export default Layout;