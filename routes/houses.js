const express = require('express')
const router = express.Router()

const {
    getAllHouses,
    getHouse,
    createHouse,
    updateHouse,
    deleteHouse} = require('../controllers/houses')
    
const auth = require('../middleware/auth')
    router.post('/',createHouse);
    router.get('/',getAllHouses);
    router.get('/:id',getHouse);
    router.delete('/',deleteHouse);
    router.put('/',updateHouse);


    module.exports = router