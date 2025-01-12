

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";


import Invoice from "@/models/invoice";





export async function GET() {

    await dbConnect();
  
    try {
  
      const invoice = await Invoice.find({})
     
  
  
  
       console.log("hii")
  
      return NextResponse.json(
  
        invoice)
  
  
  
  
    } catch (err) {
       console.log(err)
      return NextResponse.json({ err: err.message }, { status: 500 })
  
    }
  
  }
  
  