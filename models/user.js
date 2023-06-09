const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true,'please provide an Email'],
    trim : true
  },
  password: {
    type: String,
    required: [true,'please provide a password']
  },
  account_type: {
    type: String,
    required: true,
    default: 'basic',
    enum: ['basic', 'admin']
  }
});


// userSchema.pre('save', async function() {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10)
//   user.password = await bcrypt.hash(user.password,salt)
//       next();
//     });
  

module.exports = mongoose.model('User', userSchema);
