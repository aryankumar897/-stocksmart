import { NextResponse } from "next/server"

import dbConnect from "@/utils/dbConnect"


import Supplier from "@/models/supplier"

export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json()

   console.log(" update body", body)


 
  try {
    const updatingSupplier = await Supplier.findByIdAndUpdate(
      context.params.id,
      { ...body },
      { new: true }



    )

 console.log(" updating supplier", updatingSupplier)


    return NextResponse.json(updatingSupplier)

  } catch (error) {
     console.log("error updating", error)
    return NextResponse.json({ err: error.message }, { status: 500 })
  }


}



export async function DELETE(req, context) {

  await dbConnect(context.params.id)

  try {
 console.log()
    const deletingSupplier = await Supplier.findByIdAndDelete(context.params.id)

 console.log("deleted supplier" , deletingSupplier)

    return NextResponse.json(deletingSupplier)

  } catch (error) {
    console.log(error)

    return NextResponse.json({ err: error.message }, { status: 500 })
  }




}