import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from "@/models/category";

import Customer from "@/models/customers";

import Invoice from "@/models/invoice";
import InvoiceDetails from "@/models/invoicedetails";

import Payment from "@/models/payment";
import PaymentDetails from "@/models/paymentdetails";

import Product from "@/models/product";
import Purchases from "@/models/purchases";

import Subscription from "@/models/subscription";

import Supplier from "@/models/supplier";
import Unit from "@/models/units";

export async function GET() {
  await dbConnect();

  try {
    const categorycount = await Category.countDocuments({});

    const customercount = await Customer.countDocuments({});

    const invoicecount = await Invoice.countDocuments({});

    const invoicedetailscount = await InvoiceDetails.countDocuments({});

    const paymentcount = await Payment.countDocuments({});

    const paymentdetailscount = await PaymentDetails.countDocuments({});

    const productcount = await Product.countDocuments({});

    const purchasescount = await Purchases.countDocuments({});

    const subscriptioncount = await Subscription.countDocuments({});

    const suppliercount = await Supplier.countDocuments({});

    const unitcount = await Unit.countDocuments({});







 return NextResponse.json({


    categorycount,
    customercount,
    invoicecount ,

    invoicedetailscount ,
    paymentcount ,
    paymentdetailscount ,
    productcount,
    purchasescount ,
    subscriptioncount,
    suppliercount ,
    unitcount



 })




  } catch (error) {
    console.log("error ", error);

    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
