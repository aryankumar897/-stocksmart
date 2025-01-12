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





export async function POST(req) {

  await dbConnect()


  const body = await req.json()

  const { productName, supplierNameId, unitNameId, categoryNameId } = body



 console.log({ productName, supplierNameId, unitNameId, categoryNameId }  )


  try {





    const product = await Product.create({

      productName, supplierNameId, unitNameId, categoryNameId


    })

 console.log(" product saved successfully",product  )


    return NextResponse.json(product)
  } catch (error) {
    console.log("error", error)

    return NextResponse.json({ err: error.message }, { status: 500 })


  }





}