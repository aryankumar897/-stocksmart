import mongoose from "mongoose";



const SupplierSchema = new mongoose.Schema(
  {
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

    phone: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Supplier ||mongoose.model("Supplier", SupplierSchema);
