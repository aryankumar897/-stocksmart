import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Customer from "./customers";
import Invoice from "./invoice";

const PaymentSchema = new Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    paid_status: {
      type: String,
      required: false,
    },

    paid_amount: {
      type: Number,
      required: false,
    },

    due_amount: {
      type: Number,
      required: false,
    },
    total_amount: {
      type: Number,
      required: false,
    },
    discount_amount: {
      type: Number,
      required: false,
    },
  },
  { timeseries: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
