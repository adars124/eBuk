import { useState } from 'react'
import { setInStorage, setInForm } from '../../lib';
import http from '../../http';
import { useDispatch } from 'react-redux';
import { addUser } from '../../state';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [form, setForm] = useState({});
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();

    http.post('/login', form)
        .then(({ data }) => {
          setInStorage('token', data.token, remember);
          dispatch(addUser(data.user));
          navigate('/');
        })
        .catch(err => {console.log(err)});
  };

  return (
    // main container
      <section className="bg-gray-50 dark:bg-teal-600">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                User Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" onChange={ev => setInForm(ev, form, setForm)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" onChange={ev => setInForm(ev, form, setForm)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 accent-lime-400 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" onClick={() => setRemember(!remember)} defaultChecked={remember} />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-400 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full text-gray-950 bg-slate-400 hover:bg-teal-400 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link to="/register" className=" ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Login;