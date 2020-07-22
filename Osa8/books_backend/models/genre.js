const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  genre: {
    type: String,
    unique: true
  },
})

module.exports = mongoose.model('Genre', schema)