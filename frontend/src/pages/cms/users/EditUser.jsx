import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import http from '../../../http';
import { setInForm } from "../../../lib";
import { toast } from "react-hot-toast";

const EditUser = () => {

  const [form, setForm] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    http.get(`/cms/users/${params.id}`)
        .then(({ data }) => {
          setForm(data);
        })
        .catch(err => {console.log(err)});
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    http.put(`/cms/users/${params.id}`, form)
        .then(res => {
          toast.success('Updated successfully!');
          navigate('/cms/users');
        })
        .catch(err => {console.log(err)});
  };

  const handleClick = ev => {
    ev.preventDefault();

    navigate('/cms/users');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
      <div className="mx-auto max-w-xl px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <h1 className="text-2xl font-bold mb-8 text-center">Edit User</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="name"
              id='name'
              placeholder=" "
              defaultValue={form.name}
              required
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Name</label>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="email"
              name="email"
              defaultValue={form.email}
              id='email'
              placeholder=" "
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="email" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Email</label>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="password"
              name="password"
              id='password'
              placeholder=" "
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="password" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Password</label>
          </div>

          <div className="relative my-7 z-0 w-full">
            <select
              name="userType"
              id="userType"
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            >
              <option value="" className='text-gray-600' selected disabled>Select any option</option>
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="status" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Status</label>
          </div>

          <button
            id="button"
            type="submit"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
          >
            Update
          </button>
          <button
            id="cancle"
            type="button"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-400 hover:bg-red-500 hover:shadow-lg focus:outline-none"
            onClick={handleClick}
          >
            Cancle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;