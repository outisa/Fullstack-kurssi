const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  born: {
    type: Number,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }]
})
schema.virtual("bookCount", {
  ref: "Book",
  localField: "books",
  foreignField: "_id",
  count: true
})

module.exports = mongoose.model('Author', schema)