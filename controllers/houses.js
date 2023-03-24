const getAllHouses = async(req,res) =>{
    res.send('get all secrets')
}
const getHouse = async(req,res) =>{
    res.send('get single secret')
}
const createHouse = async(req,res) =>{
    res.send('create secret')
}
const updateHouse = async(req,res) =>{
    res.send('update secret')
}
const deleteHouse = async(req,res) =>{
    res.send('delete secret')
}

module.exports = {
    getAllHouses,
    getHouse,
    createHouse,
    updateHouse,
    deleteHouse
}