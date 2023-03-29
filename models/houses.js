const mongoose = require('mongoose')

const housesSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
      },
      rentalPrice: {
        type: Number,
        required: true
      },

})

module.exports = mongoose.model ('House',housesSchema)