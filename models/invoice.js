import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    invoice_no: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
