import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearStorage } from '../lib';
import { removeUser } from '../state';
import { Link } from 'react-router-dom';

const CmsNav = () => {
  const user = useSelector(state => state.user.value);

  const dispatch = useDispatch();

  const logout = id => {
    clearStorage('token');
    dispatch(removeUser());
  };

  return (Object.keys(user).length && user.userType === 'admin' ?
    (<nav className='p-4 bg-zinc-600 flex justify-between shadow-lg rounded-b-lg'>
      <div className='border-dashed border-2 border-sky-500 rounded-md p-2'>
        <Link className='text-slate-200' to="/">eBuk</Link>
      </div>
      <div className='flex flex-1 ml-4 gap-3 items-center text-teal-400 font-semibold'>
        <Link className='hover:text-lime-300 transition-colors text-sm md:text-' to="/cms/dashboard">Dashboard</Link>
        <Link className='hover:text-lime-300 transition-colors text-sm md:text-' to="/cms/books">Books</Link>
        <Link className='hover:text-lime-300 transition-colors text-sm md:text-' to="/cms/users">Users</Link>
      </div>
      <div className='flex items-center gap-2 text-sm'>
        <span className='text-gray-200 md:flex items-center cursor-pointer hover:text-lime-200'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <span className='hidden md:inline'>{user.name}</span>
        </span>
        <button onClick={logout} className='bg-teal-500 p-2 rounded-md flex items-center hover:bg-slate-300 transition-colors'>
          <span className='hidden md:inline'>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block md:ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>
    </nav>) : (
      <nav className='p-4 bg-zinc-600 flex justify-between shadow-lg rounded-b-lg'>
        <div className='border-dashed border-2 border-sky-500 rounded-md p-2'>
          <Link className='text-slate-200' to="/">eBuk</Link>
        </div>
        <div className='flex gap-3'>
          <Link className=' bg-slate-500 px-3 flex items-center rounded-md text-slate-200 text-sm transition-colors duration-300 md:text-lg hover:bg-slate-800 hover:text-teal-300' to="/login">User Login</Link>
        </div>
      </nav>
    )
  );
};

export default CmsNav;