const User = require('../models/user');


const signUp = async (req, res) => {
    const { email, password } = req.body
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const emailParts = email.split('@');
    const username = emailParts[0];
    const checkEmailProvider = emailParts[1];
    if(checkEmailProvider !== "gmail.com" && checkEmailProvider !== "yahoo.com" && checkEmailProvider !== "live.com"){
      return res.status(409).json({
        success: false,
        message: 'This is not a vaild email',
      });
    }

    try {
      // Check if user exists in database
      const isUser = await User.findOne({ email });
  
      if (isUser) {
        return res.status(409).json({
          success: false,
          message: 'User already exists',
        });
      }
  
      // Create a new user
      const user = new User({ username, email, password });
  
      // Save the user to the database
      const savedUser = await user.save();
  
      return res.status(201).json({ message: 'User created successfully', content: savedUser });
    } catch (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
  };
  


const login = async (req,res) => {
    res.send('login user')
}


module.exports = {
    signUp,
    login
}