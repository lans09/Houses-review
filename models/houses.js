const mongoose = require('mongoose')

const housesSchema = new mongoose.Schema({
    houseNumber: {
        type: String,
        required: true
      },
    street: {
        type: String,
        required: true
      },
    city: {
        type: String,
        required: true
      },
    state: {
        type: String,
        required: true
      },
    rentalPrice: {
        type: Number,
        required: true
      },

})

module.exports = mongoose.model ('House',housesSchema)