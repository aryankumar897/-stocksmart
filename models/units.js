import mongoose from "mongoose"

const UnitsSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

export default mongoose.models.Unit || mongoose.model("Unit", UnitsSchema)