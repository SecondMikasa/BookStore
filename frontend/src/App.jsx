import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, CreateBook, EditBook, DeleteBook, ShowBook} from './pages/index.js'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/books/create' element={ <CreateBook /> } />
      <Route path='/books/details/:id' element={ <ShowBook /> } />
      <Route path='books/edit/:id' element={ <EditBook /> } />
      <Route path='books/delete/:id' element={ <DeleteBook /> } />
    </Routes>
  )
}

export default App
