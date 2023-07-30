import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import CmsNav from './CmsNav';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const CmsLayout = () => {

    const user = useSelector(state => state.user.value);

    return (
        <main className='w-11/12 mx-auto bg-secondary'>
            <CmsNav />

            <Outlet />

            <Footer />
        </main>
    );
};

export default CmsLayout;