import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import http from '../../../http';
import { setInForm } from "../../../lib";
import { toast } from "react-hot-toast";

const AddBook = () => {

  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    let formData = new FormData();

    for (let data in form) {
      formData.append(data, form[data]);
    }

    formData.append('image', image);

    http.post('/cms/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      toast.success('Book Added Successfully!');
      navigate('/cms/books');
    }).catch(err => {console.log(err)});
  }

  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
      <div className="mx-auto max-w-xl px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <h1 className="text-2xl font-bold mb-8 text-center">Add New Book</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="name"
              id='name'
              placeholder=" "
              required
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="name" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Book Name</label>
          </div>

          <div className="relative z-0 w-full mb-5">
            <input
              type="text"
              name="author"
              id='author'
              placeholder=" "
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label htmlFor="author" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Author Name</label>
          </div>

          <div className="relative z-0 w-full mt-7 mb-5">
            <textarea
              name="description"
              placeholder=" "
              id='description'
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              rows={5}
            ></textarea>
            <label htmlFor="description" className="absolute duration-300 top-0 -z-1 origin-0 text-gray-500">Description</label>
          </div>

          <div className="relative my-7 z-0 w-full">
            <select
              name="status"
              id="status"
              onChange={ev => setInForm(ev, form, setForm)}
              className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            >
              <option value="" className='text-gray-600' selected disabled>Select any option</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <label htmlFor="status" className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Status</label>
          </div>

          <div className="relative z-0 w-full mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Upload file</label>
            <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 p-4 rounded-lg cursor-pointer bg-gray-50 appearance-none focus:outline-none" id="image" name="image" onChange={ev => setImage(ev.target.files[0])} />
            <div className="mt-3 flex justify-center">
              {image ? <img src={URL.createObjectURL(image)} className="w-auto max-h-48" alt="cover image of the book" /> : null}
            </div>
          </div>

          <button
            id="button"
            type="submit"
            className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook