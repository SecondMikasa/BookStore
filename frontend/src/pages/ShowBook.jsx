import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BackButton, Loader } from '../components'

function ShowBook() {
  const [book, setBook] = useState()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3500/books/${id}`)
      .then((response) => {
        setBook(response.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    <div className='m-10'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ?
        <Loader /> : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Book ID
              </span>
              <span>{ book._id }</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Title
              </span>
              <span>{ book.title }</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Author
              </span>
              <span>{ book.author }</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Publish Year
              </span>
              <span>{ book.publishYear }</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Last Updated Time
              </span>
              <span>{ new Date(book.createdAt).toString() }</span>
            </div>
          </div>
        )}
    </div>
  )
}

export default ShowBook