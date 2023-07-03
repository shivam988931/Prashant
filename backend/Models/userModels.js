const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

// create a schema for matching password

userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

// we want to encode the password which are present in our database
// it means before we saving
userSchema.pre('save',async function(next){
  // if current password is not modified move on to the next that is dont run the code after this
  if(!this.isModified){
    next();
  }
  // else create a new password 
  const salt=await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  ///// upar ke do line padhna hai 

})


// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next(); 
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("User", userSchema);

module.exports = User;