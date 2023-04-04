const express = require('express')
const router = express.Router()

const {
    getAllHouses,
    getHouse,
    createHouse,
    updateHouse,
    deleteHouse} = require('../controllers/houses')
    
    router.route('/').post(createHouse).get(getAllHouses)
    router.route('/:id').get(getHouse).delete(deleteHouse).put(updateHouse)


    module.exports = router