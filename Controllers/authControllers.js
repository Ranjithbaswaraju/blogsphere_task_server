const { UserModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const signUpController = async (req, res) => {
  try {
    const { email, name, password,role } = req.body;
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      res.status(400).json({
        message: "User already exist",
      });
    }

    if(!email || !password || !name){
      res.status(400).json({
        message:"Please enter all fields"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user=new UserModel({
      name,
      email,
      password:hashedPassword,
      role
    })
    const data=await user.save()

    res.status(200).json({
      message:"User registered succesfully",
      data:data
    })

  } catch (err) {
    res.send(err);
  }
};
const loginController = async (req, res) => {
 try{
    const {email,password}=req.body

    if(!email || !password){
      res.status(400).json({
        message:"Please Required Fields"
      })
    }

    const user=await UserModel.findOne({email})
    if(!user){
      res.status(400).json({
        message:"User not found"
      })
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
      res.status(400).json({
        message:"Password is incorrect"
      })
    }
    
    const token=await jwt.sign(
      {id:user._id,role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.status(200).json({
      message:"login succesfully",
      token,
       user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

 }
 catch(err){
  console.log(err)
 }
};

const logOutController = (req, res) => {
  res.send("Logout Successfully");
};

module.exports = { loginController, logOutController, signUpController };
