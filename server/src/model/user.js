import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    phone: {
      type: Number,
      unique: true,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
