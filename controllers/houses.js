const House = require('../models/houses')

const createHouse = async(req,res) =>{
try{
    const house = await House.create(req.body)
    res.status(201).json({message : 'house successfully created',content : house})
} catch(error){
    res.status(500).json({ message: 'Error createing house', error: error });
}
}
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