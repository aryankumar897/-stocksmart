import mongoose from "mongoose";

import Category from "./category";
import Product from "./product";
import Invoice from "./invoice";

const InvoicedetailsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    selling_qty: {
      type: Number,
      required: true,
    },

    unit_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invoicedetails ||
  mongoose.model("Invoicedetails", InvoicedetailsSchema);
