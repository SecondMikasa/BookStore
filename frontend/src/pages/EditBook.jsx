import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader, BackButton } from '../components'
import { Button } from 'antd'
import { useSnackbar } from 'notistack'


function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const newBook = {
    title,
    author,
    publishYear
  }

  useEffect(() => {
    axios.get(`http://localhost:3500/books/${id}`)
       .then((res) => {
         setTitle(res.data.data.title);
         setAuthor(res.data.data.author);
         setPublishYear(res.data.data.publishYear);
       })
       .catch((err) => {
         console.error(err)
       });
   }, [id])

  const handleSubmit = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar("Please Input all the neccessary detials to continue", {variant: 'warning'})
      return
    }
    axios
      .put(`http://localhost:3500/books/${id}`, newBook)
      .then(() => {
        enqueueSnackbar("The book available in store has been updated successfully", {variant: 'success'})
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar('An error occured. Please check console for further details', {variant: 'error'})
        return
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className='text-3xl my-4 mx-auto'>Edit Pre-Existing Book</h1>
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
          Edit
        </Button>
      </div>
    </div>
  )
}

export default EditBook
