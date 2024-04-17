import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader, BackButton } from '../components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useSnackbar } from 'notistack'

function CreateBook() {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [publishYear, setPublishYear] = useState()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const newBook = {
    title,
    author,
    publishYear
  }

  const handleSubmit = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar("Please Input all the neccessary detials to continue", {variant: 'warning'})
      return
    }
    axios
      .post('http://localhost:3500/books', newBook)
      .then(() => {
        enqueueSnackbar("A new book has been added to the store successfully", {variant: 'success'})
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar('An error occured. Please check console for further details', { variant: 'error'})
        return
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className='text-3xl my-4 mx-auto'>Create A New Book</h1>
      {loading ?
        <Loader /> : ('')}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto shadow-md hover:border-sky-600 hover:shadow-xl">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </div>
  )
}

export default CreateBook