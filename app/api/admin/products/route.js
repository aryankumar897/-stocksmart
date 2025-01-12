import { NextResponse } from "next/server"
import dbConnect from "@/utils/dbConnect"
import Product from "@/models/product"




export async function GET() {



  await dbConnect()
  try {


    const product = await Product.find({})
      .populate("unitNameId")
      .populate("categoryNameId")
      .populate("supplierNameId")


    return NextResponse.json(product)



  } catch (error) {
    console.log("error  getting product", error)
    return NextResponse.json({ err: error.message }, { status: 500 })


  }




}

