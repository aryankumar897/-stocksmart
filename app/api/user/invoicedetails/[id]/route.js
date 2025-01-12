import { NextResponse } from "next/server";


import dbConnect from "@/utils/dbConnect";

import Invoice from "@/models/invoice";
import Invoicedetails from "@/models/invoicedetails";
import Payment from "@/models/payment";

import PaymentDeatils from "@/models/paymentdetails";





 export  async function GET(req,context){
 await dbConnect()

 console.log("xxx======context?.params?.id",context?.params?.id)

  try {
    

 const  invoice=await Invoice.find({_id:context?.params?.id})
 const  invoicedetails=await  Invoicedetails.find({invoice_id:invoice[0]?._id})
.populate("category_id")
.populate("product_id")


 const payment=await Payment.find({invoice_id:invoice[0]?._id})
 .populate("customer_id")

  const paymentDetails=await  PaymentDeatils.find({invoice_id:invoice[0]?._id})


 console.log({  invoice,invoicedetails,
   payment,paymentDetails})


 return NextResponse.json({ 
    invoice,invoicedetails,
    payment,paymentDetails

 })





  } catch (error) {
     console.log("error",error)
      return NextResponse.json({err:error.message}  ,{status:500} )
  }



 }
