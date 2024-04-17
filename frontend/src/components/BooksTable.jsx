import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { BiShow } from 'react-icons/bi'
import BookModel from './BookModel'

function BooksTable({ books }) {
  const [showModel, setShowModel] = useState(false)
  return (
    <div>

      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded md">Book ID</th>
            <th className="border border-slate-600 rounded md">Title</th>
            <th className="border border-slate-600 rounded md max-md:hidden">Author</th>
            <th className="border border-slate-600 rounded md max-md:hidden">Publish Year</th>
            <th className="border border-slate-600 rounded md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((book, index) => (
              <React.Fragment key={book._id}>
                <tr>
                  <td className="border border-slate-700 rounded-md text-center"> {index + 1} </td>
                  <td className="border border-slate-700 rounded-md text-center"> {book.title} </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden"> {book.author}</td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden"> {book.publishYear} </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <BiShow
                        className='text-xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={(e) => setShowModel(true)}
                      />
                      <Link to={`books/details/${book._id}`}>
                        <BsInfoCircle className='text-xl text-green-800 hover:text-black' />
                      </Link>
                      <Link to={`books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-xl text-yellow-600 hover:text-black' />
                      </Link>
                      <Link to={`books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-xl text-red-600 hover:text-black' />
                      </Link>
                    </div>
                  </td>
                </tr>
                {showModel && (
                  <BookModel book={book} onClose={() => setShowModel(false)} />
                )}
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default BooksTable
