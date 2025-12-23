const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type:String,unique:true},
  email: { type: String, unique: true },
  password:{type: String},
  role: { type: String, enum: ["admin", "author"] },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
