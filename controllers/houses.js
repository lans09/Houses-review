const House = require('../models/houses')
const geocoder = require('../utils/geocoder')

const createHouse = async (req, res) => {
  const {address} = req.body
  if(!address){
    return res.status(400).json({
      message : 'please provide an address'
    })
  }
  // get the googlePlaceId from address
  const loc = await geocoder.geocode(address);
  // console.log(loc)
  locationData = {loc}
  const googlePlaceId = locationData.loc[0].extra.googlePlaceId;
  console.log(googlePlaceId);
  
  // Check if the house already exists
  const existingHouse = await House.findOne({ googleMapsRef: googlePlaceId });
  
  if (existingHouse) {
    return res.status(409).json({ error: 'House already exists' });
  }
  
  try {
    // Create a new house object with the request body
    const house = new House({ ...req.body });

    // Geocode the address and store the formatted address and coordinates in the location field
    const locationData = await geocoder.geocode(address);
    house.location = {
      type: 'Point',
      coordinates: [locationData[0].longitude, locationData[0].latitude],
      formattedAddress: locationData[0].formattedAddress,
    };

    // Set the googleMapsRef field to the place_id returned by the Google Maps API geocoding service
    house.googleMapsRef = googlePlaceId;
    house.address = undefined
    // Save the house to the database
    await house.save();

    // Return the created house object
    res.status(201).json({ house});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllHouses = async(req,res) =>{
    try {
          const houses = await House.find();
          res.status(200).json(houses);

    } catch (error) {
          res.status(500).json({ message: 'Error getting houses', error: error });
    }
    };

const getHouse = async(req,res) =>{
    try {
        const singleHouse = await House.findById(req.params.id);
        if (!singleHouse) {
          return res.status(404).json({ message: 'House not found' });
        }
        res.json(singleHouse);
      } catch (error) {
        res.status(500).json({ content: error });
      }
    };
    

const updateHouse = async(req,res) =>{
    try {
        const { id } = req.params;
        const { houseNumber, street, city, state, rentalPrice } = req.body;
        // Find the house by id
        const house = await House.findById(id);
        if (!house) {
          return res.status(404).json({ message: 'House not found' });
        }
        // Update the house fields
        house.houseNumber = houseNumber || house.houseNumber;
        house.street = street || house.street;
        house.city = city || house.city;
        house.state = state || house.state;
        house.rentalPrice = rentalPrice || house.rentalPrice;
        // Save the updated house to the database
        const updatedHouse = await house.save();
        return res.status(200).json({ message: 'House updated successfully', content: updatedHouse });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating house', error });
      }
    };

const deleteHouse = async(req,res) =>{
    try {
        const houseId = req.params.id;
        const deletedHouse = await House.findByIdAndDelete(houseId);
        if (!deletedHouse) {
          return res.status(404).json({ message: 'House not found' });
        }
        return res.status(200).json({ message: 'House deleted successfully', content: deletedHouse });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting house', error: error });
      }
    };

module.exports = {
    getAllHouses,
    getHouse,
    createHouse,
    updateHouse,
    deleteHouse
}