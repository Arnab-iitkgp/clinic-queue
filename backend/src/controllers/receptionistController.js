const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin is authenticated
    const admin = req.user;
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add receptionists" });
    }

    // Check if email is already used
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newReceptionist = await User.create({
      name,
      email,
      passwordHash,
      role: "receptionist",
      clinicName: admin.clinicName,
    });

    res.status(201).json({
      message: "Receptionist created",
      user: {
        name: newReceptionist.name,
        email: newReceptionist.email,
        role: newReceptionist.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getReceptionists = async (req, res) => {
  try {
    const admin = req.user;

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const receptionists = await User.find({
      role: "receptionist",
      clinicName: admin.clinicName,
    }).select("-passwordHash"); // Don't return password

    res.json(receptionists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteReceptionist = async (req, res) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const deleted = await User.findOneAndDelete({
      _id: id,
      role: "receptionist",
      clinicName: admin.clinicName, // ensure same clinic
    });

    if (!deleted) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    res.json({ message: "Receptionist deleted", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
