// const User = require("../models/userModel"); // Make sure your User model exists

// // Controller to GET all users (Admin only)
// const getAllUsers = async (req, res) => {
//   try {
//     // Fetch all users but exclude passwords
//     const users = await User.find().select("-password");
//     res.json(users); // Return users as JSON
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { getAllUsers };
