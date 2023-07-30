import { useEffect, useState } from 'react';
import http from '../../http';
import { useParams } from 'react-router-dom';

const Details = () => {

  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);

  const params = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    http.get(`/front/books/${params.id}`)
      .then(({ data }) => {
        setBook(data);
        if (data.imagePath) {
          setImage(`${import.meta.env.VITE_API_URL}/front/images/${data.imagePath}`)
        }
      })
      .catch(err => { })
  }

  return (
    <div className='w-full py-4'>
      <div className='p-5 min-h-screen min-w-4xl rounded-lg shadow-lg bg-teal-300 mx-auto'>
        <h1 className='text-2xl text-center mb-4 md:text-4xl'>Book Details</h1>
        <div className='flex gap-5 flex-col md:flex-row'>
          <div className='flex justify-center'>
            {image ? <img className='object-fit' src={image} width={300} height={300} /> : null}
          </div>
          <div className='w-full p-4 bg-primary rounded-lg shadow-lg text-xl font-semibold '>
            <h2 className='mb-3'>Book Title: <span className='text-md font-normal text-gray-800'>{book.name}</span></h2>

            <h2 className='mb-3'>Author: <span className='text-md font-normal text-gray-800'>{book.author}</span></h2>

            <h2 className='mb-3'>Description: <span className=' text-sm font-normal text-gray-800'>{book.description}</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

