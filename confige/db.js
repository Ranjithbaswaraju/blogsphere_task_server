const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.mongoServer, { dbName: process.env.mongoDBName })
      .then(() => {
        console.log("connected to database", process.env.mongoDBName);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {connectDB};
