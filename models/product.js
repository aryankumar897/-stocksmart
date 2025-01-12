import mongoose from "mongoose";

import Unit from "./units"
import Supplier from "./supplier"
import Category from "./category"


const ProductSchema = new mongoose.Schema({

  productName: {

    type: String,
    required: true,
    trim: true,
    
  },
  quantity: {

    type: Number,
    required: true,
    default: 0,

  },

  status: {

    type: Boolean,
    default: true

  },


  unitNameId: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit"


  },
  categoryNameId: {



    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"

  },
  supplierNameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  }







}, { timestamps: true })




export default mongoose.models.Product || mongoose.model("Product", ProductSchema)

