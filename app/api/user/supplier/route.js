import { NextResponse } from "next/server"


import dbConnect from "@/utils/dbConnect"

import Supplier from "@/models/supplier"



export async function GET() {

  await dbConnect()
  try {

    const supplier = await Supplier.find({})

    return NextResponse.json(supplier)

  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 })
  }


}



export  async function POST(req ){

  await dbConnect()


   const  body=await   req.json()
 const  {name,email,phone,address}=body



 try {
  
 const  supplier=await  Supplier.create({
name,email,phone,address

 })

   console.log("saved supplier", supplier)
 return  NextResponse.json(supplier)

 } catch (error) {
   console.log(error)

    return NextResponse.json({err:error.message},{status:500}) 
 }



}
