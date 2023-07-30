import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import http from '../../../http';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    http.get('/cms/users')
        .then(({ data }) => setUsers(data))
        .catch(err => {console.log(err)});
    
    http.get('/cms/books')
        .then(({ data }) => setBooks(data))
        .catch(err => {console.log(err)});
  }, []);
  
  return (
    <div className=" min-h-full md:min-h-screen p-5">
      {/* wrapper */}
      <div className="bg-green-200 min-h-screen">
        <h1 className="text-2xl p-2 bg-gray-400">Dashboard</h1>
        <div className="h-full flex flex-col min-[622px]:flex-row md:flex-row p-4 items-center gap-10">
          <div className=" bg-teal-600 hover:bg-slate-500 text-white transition-colors duration-200 h-56 w-56 flex flex-col justify-between py-4 items-center rounded-lg">
            <div>

              <h1 className="font-bold text-4xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-20 h-20 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Books
              </h1>
            </div>
            <div>
              <span>Total Books: </span><span>{books.length ? books.length : 'Loading...'}</span>
            </div>
            <div className="flex items-center">
              <Link className="bg-slate-800 transition-all duration-200 hover:bg-teal-400 text-teal-200 hover:text-black p-2 rounded-lg" to="/cms/books">
                Manage
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-teal-600 hover:bg-slate-500 text-white transition-colors duration-200 h-56 w-56 flex flex-col justify-between py-4 items-center rounded-lg">
            <div>
              <h1 className="font-bold text-4xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
                Users
              </h1>
            </div>
            <div>
              <span>Total Users: </span><span>{users.length ? users.length : 'Loading...'}</span>
            </div>
            <div className="flex items-center">
              <Link className="bg-slate-800 transition-all duration-200 hover:bg-teal-400 text-teal-200 hover:text-black p-2 rounded-lg" to="/cms/users">
                Manage
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;