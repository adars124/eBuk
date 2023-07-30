import { useEffect, useState } from 'react';
import http from '../../http';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        http.get('/front/books')
            .then(({ data }) => setBooks(data))
            .catch(err => { })
    };
    return (
        <div className='p-5 mb-5'>
            <h1 className='text-4xl text-center mb-4'>Home</h1>
            <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8'>
                {books?.map(book => (
                    <div key={book._id} className='flex flex-col overflow-hidden border shadow-lg rounded-lg bg-white max-h-96'>
                        <Link to={`/book/${book._id}`} className='group relative block h-48 overflow-hidden bg-gray-100 md:h-72'>
                            {book.imagePath.length ? <img src={`${import.meta.env.VITE_API_URL}/front/images/${book.imagePath}`} alt='book cover' width={500} height={500} /> : null}
                        </Link>

                        <div className='flex flex-1 flex-col p-4 sm:p-6'>
                            <h2 className='mb-2 text-lg font-semibold text-gray-800'>
                                <Link to={`/book/${book._id}`} className='transition duration-100 hover:text-lime-800 active:text-teal-600'>{book.name}</Link>
                            </h2>
                            <p className='text-sm space-x-3 mb-2'>
                                <strong className=' text-gray-800'>Author:</strong><span>{book.author}</span>
                            </p>
                            <p className='text-sm line-clamp-3 space-x-3 text-gray-500 mb-3'><strong className='text-gray-800'>Description:</strong><span>{book.description}</span></p>
                            <Link to={`/book/${book._id}`} className=' bg-slate-800 text-center hover:bg-slate-950 transition-colors text-teal-200 p-1 rounded-md'>Read...</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;