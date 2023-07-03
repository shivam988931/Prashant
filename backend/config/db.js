const mongoose = require("mongoose");
MONGO_URI="mongodb+srv://prashanta9367:jRxLD0pA9U7ALLWJ@cluster0.d97hbmj.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};



module.exports = connectDB;