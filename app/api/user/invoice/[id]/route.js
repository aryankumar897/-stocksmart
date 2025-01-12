import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Invoice from "@/models/invoice";
import InvoiceDetails from "@/models/invoicedetails";
import Payment from "@/models/payment";
import PaymentDetails from "@/models/paymentdetails";
import invoice from "@/models/invoice";

export async function DELETE(req, context) {
  await dbConnect();


 console.log("invoice data")

  try {
    const invocie = await Invoice.findByIdAndDelete(context?.params?.id);

    const invociedetails = await InvoiceDetails.deleteMany({
      invoice_id: invoice?._id,
    });
    const payment = await Payment.deleteMany({ invoice_id: invoice?._id });

    const paymentdetails = await PaymentDetails.deleteMany({
      invoice_id: invoice?._id,
    });




     console.log("invocie1===",invocie)


     console.log("invociedetails2===",invociedetails)
     console.log("payment3=== ",payment )
     console.log("paymentdetails4===",paymentdetails)
    return NextResponse.json(invoice);
  } catch (error) {

     console.log("eror  deleting  invoice", error)
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
