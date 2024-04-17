import express from "express"
import BookStore from '../models/database.js'

const router = express.Router()

//Route to create a new book
router.post('/', async (req, res) => {
    console.log("Books were accessed")
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please send all the required fields" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await BookStore.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }

})

//Route for getting all books from the database
router.get('/', async (req, res) => {
    try {
        const books = await BookStore.find({})
        return res.status(200).send({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for getting one book from the database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await BookStore.findById(id)
        return res.status(200).send({
            data: book
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route to update a book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please send all the required fields" })
        }
        const { id } = req.params
        const updatedBook = await BookStore.findByIdAndUpdate(id, req.body)

        if (!updatedBook) {
            return res.status(400).json({ message: "BOOK NOT FOUND" })
        }
        return res.status(200).json({ message: "BOOK UPDATED" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route to delete a Book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookStore.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({message: "BOOK NOT FOUND"})
        }
        return res.status(200).json({message: "BOOK DELETED SUCESSFULLY"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router