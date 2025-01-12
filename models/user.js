import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({



  name: {

    type: String,
    required: true,

    trim: true,
    minLength: 3,
    maxLength: 20

  },

  email: {
    type: String,

    required: true,

    unique: true,
    index: true,

    lowercase: true,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: "user",
    required: true,
  },

  subscription: {
    type: String,
  }


}, { timestamps: true })


export default  mongoose.models.User || mongoose.model("User",UserSchema)
