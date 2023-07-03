
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModels");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {  registerUser, authUser, allUsers };













// const asyncHandler= require("express-async-handler");
// // above is used for error handling
// const User=require("../Models/userModels") 
// const generateToken=require('../config/generateToken')



// // const allUsers = asyncHandler(async (req, res) => {
// //   const keyword = req.query.search
// //     ? {
// //         $or: [
// //           { name: { $regex: req.query.search, $options: "i" } },
// //           { email: { $regex: req.query.search, $options: "i" } },
// //         ],
// //       }
// //     : {};

// //   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
// //   res.send(users);
// // });



// // // For registratipon pages 

// const registerUser=asyncHandler(async(req,res)=>{
//     const {name, email, password, pic}=req.body;

//     // if any of the above is undefined its throw an error
//     if(!name || !email || !password){
//         res.status(400);
//         throw new Error("Please enter all the fields")
//     }
//     // If user is already exist throw an error
//      const userExists=await User.findOne({email});

//      if(userExists){
//         res.status(400);
//         throw new Error("user already exists");
//      }
//      // if user is not exists creat a new user with the help of by user.Create which is query of database

//      const user=await User.create({
//         name,
//         email,
//         password,
//         pic,
//      });
//      // If operation is successful and new user is created

//      if(user){
//         res.status(201).json({
//             _id:user._id,
//             name: user.name,
//             email:user.email,
//             pic:user.pic,
//             //generate token
//             token:generateToken(user._id),
//         })
//      }
//      else{
//         res.status(400);
//         throw new Error("Failed to create new user");
//      }
// });




// // // For login pages
// const authUser=asyncHandler(async(req,res)=>{
//    const {email,password}=req.body;
//    const user=await User.findOne({email});
   
// //    // if user exists and the password they are entered are matches which are present in the database
//    if(user && (await user.matchPassword(password))){
//       res.json({
//          _id:user._id,
//          name: user.name,
//          email:user.email,
//          pic:user.pic,
//          //generate token
//          token:generateToken(user._id),
//      })
//   }
//   else{
//      res.status(400);
//      throw new Error("Invalid email or password");
//   }
   

// });



// // module.exports={registerUser,authUser};


// // const authUser = asyncHandler(async (req, res) => {
// //   const { email, password } = req.body;

// //   const user = await User.findOne({ email });

// //   if (user && (await user.matchPassword(password))) {
// //     res.json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       isAdmin: user.isAdmin,
// //       pic: user.pic,
// //       token: generateToken(user._id),
// //     });
// //   } else {
// //     res.status(401);
// //     throw new Error("Invalid Email or Password");
// //   }
// // });




// module.exports = {  registerUser,authUser };