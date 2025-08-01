const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'receptionist'], default: 'receptionist' },
  clinicName: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
