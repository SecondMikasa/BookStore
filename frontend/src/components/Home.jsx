import React, { useEffect, useState } from "react";
import axios from 'axios'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import { BooksTable, BooksCard } from './index'
import { Button } from "antd";
import { MdOutlineAddBox } from 'react-icons/md'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        axios.get('http://localhost:3500/books')
            .then((response) => {
                setBooks(response.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    })

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <Button type="primary" onClick={() => setShowType('table')}>
                    Table
                </Button>
                <Button type="primary" onClick={() => setShowType('card')}>
                    Card
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
                </Link>
            </div>
            {
                loading ?
                    <Loader /> : ( showType === 'table'?
                        (<BooksTable books={books} />) :
                        (<BooksCard books={books} />)
                    )
            }
        </div>
    )
}

export default Home