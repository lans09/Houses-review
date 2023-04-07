const jwt = require ('jsonwebtoken')
const User = require('../models/user')

const auth = async(req,res,next)=>{
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       return res.status(401).json({
            message : 'no token provided',
        })
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
    //    attach the user to the route
        req.user = {userId:payload.userId, email: payload.email}
        next()
    } catch (error) {
        res.status(401).json({
            message : 'cant verify token',
            content : error
        })
    }
}

module.exports = auth;