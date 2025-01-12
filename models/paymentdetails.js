import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Invoice from "./invoice";

const PaymentDetails = new Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    current_paid_amount: {
      type: Number,
      required: false,
    },

    date: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PaymentDetails ||
  mongoose.model("PaymentDetails", PaymentDetails);
