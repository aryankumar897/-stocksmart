import mongoose from "mongoose";


const CustomerSchema = new mongoose.Schema({


  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {

    type: String,
    required: true,
    unique: true,
    lowercase: true,

  },

  mobileNumber: {
    type: Number,

    required: true

  },


  image: {
    type: String
  },

  address: {


    type: String

  },
  status: {
    type: Boolean,

    default: true
  }






},

  {



    timestamps: true



  })




export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)