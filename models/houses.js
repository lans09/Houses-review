const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const housesSchema = new mongoose.Schema({
  
  address: {
    type: String,
  },
  
  rentalPrice: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  agent: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  googleMapsRef: {
    type: String,
    unique: true
  },
  buildingType: {
    type: String,
    // required: true
  },
  gatedEstate: {
    type: Boolean,
    required: true
  },
  estateName: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, { timestamps: true });

// geocode & create location
// housesSchema.pre('save',async function(next){
//   const loc = await geocoder.geocode(this.address);
//   console.log(loc)
//   this.location = {
//     type: 'point',
//     coordinates: [loc[0].longitude,loc[0].latitude],
//     formattedAddress: loc[0].formattedAddress
//   }
//   this.address = undefined
//   next()
// })

module.exports = mongoose.model ('House',housesSchema)