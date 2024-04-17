import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }
    }
)

const bookStoreSchema = new mongoose.Schema(bookSchema, {
    timestamps: true
});

const BookStore = mongoose.model("bookStore", bookStoreSchema);

export default BookStore
