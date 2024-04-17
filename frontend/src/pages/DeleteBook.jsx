import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BackButton, Loader } from '../components'
import axios from 'axios'
import { Button } from 'antd'
import { useSnackbar } from 'notistack'

function DeleteBook() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()

  const handleSubmit = () => {
    axios
      .delete(`http://localhost:3500/books/${id}`)
      .then(() => {
        enqueueSnackbar("The book available in store has been deleted successfully", {variant: 'success'})
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
      <h1 className="text-3xl my-4">
        Delete Book
      </h1>
      {loading ?
        <Loader /> : ('')}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto hover:border-sky-600 hover:shadow-xl">
        <h3 className="text-2xl">
          Are You Sure You Want To Delete This Book?
        </h3>
        <Button danger className='my-5' onClick={handleSubmit}>Delete</Button>
      </div>
    </div>
  )
}

export default DeleteBook