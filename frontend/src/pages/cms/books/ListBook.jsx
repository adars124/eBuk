import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import http from '../../../http';

const ListBook = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => http.get('/cms/books')
                             .then(({ data }) => setBooks(data))
                             .catch(err => {console.log(err)});

  const formatDate = (timeStamp) => {
    let ts = new Date(timeStamp);

    const year = ts.getFullYear();
    const month = String(ts.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(ts.getDate()).padStart(2, '0');

    ts = `${year}/${month}/${day}`

    return ts;
  };

  const handleDelete = id => {
    const flag = confirm('Are you sure??');
    if(flag) {
      http.delete(`/cms/books/${id}`)
          .then(() => {
            loadData();
            navigate('/cms/books');
          })
          .catch(err => {console.log(err)});
    }
  };
  
  return (
    <div className=" min-h-full md:min-h-screen p-5">
      {/* wrapper */}
      <div className="bg-green-200 min-h-screen">
        <h1 className="text-2xl p-4 bg-gray-400">
          Books
          <Link to="/cms/books/add" className="ml-4 text-lg bg-slate-800 text-white p-2 hover:bg-teal-400 hover:text-gray-700 rounded-md transition-all duration-200">Add Boook</Link>
        </h1>
        <div className="h-full flex flex-col min-[622px]:flex-row md:flex-row p-4 items-center gap-10">
          <div className="p-3 min-w-full">
            <table className=" table-auto min-w-full">
              <thead className=" bg-slate-800 text-teal-200 border-b-2 border-gray-400">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Title</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Image</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Author</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Updated</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left" colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book._id} className=" even:bg-cyan-400 odd:bg-white">
                  <td className="p-3 text-sm text-gray-800">{book.name}</td>
                  <td className="p-3">{
                    book.imagePath.length ? <img className="w-auto max-h-24" src={`${import.meta.env.VITE_API_URL}/front/images/${book.imagePath}`} alt='book cover' width={500} height={500} /> : null
                  }</td>
                  <td className="p-3 text-sm text-gray-800">{book.author}</td>
                  <td className="p-3 text-sm text-gray-800">{book.status}</td>
                  <td className="p-3 text-sm text-gray-800">{formatDate(book.updatedAt)}</td>
                  <td className="p-2 text-sm text-gray-800">
                    <Link className="inline-flex items-center px-4 py-2 hover:bg-lime-200 text-gray-800 text-sm font-medium rounded-md" to={`/cms/books/${book._id}/edit`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    </Link>
                  </td>
                  <td className="p-2 text-sm text-gray-800">
                  <button onClick={() => handleDelete(book._id)} className="inline-flex items-center px-4 py-2 hover:bg-red-400 hover:text-gray-800 text-sm font-medium rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBook;