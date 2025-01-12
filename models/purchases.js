import mongoose from "mongoose";

import User from "./user";
import Supplier from "./supplier";
import Category from "./category";

const PurchasesSchema = new mongoose.Schema(
  {
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    date: {
      type: Date,
    },

    purchase_no: {
      type: String,
      requires: true,
    },

    description: {
      type: String,
      required: true,
    },
    buying_qty: {
      type: Number,
      required: true,
    },

    unit_price: {
      type: Number,
      required: true,
    },
    buying_price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Purchases || mongoose.model("Purchases",PurchasesSchema);
