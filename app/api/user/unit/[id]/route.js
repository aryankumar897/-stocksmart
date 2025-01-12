import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Unit from "@/models/units"


export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json()
  console.log(context?.params?.id)

  console.log( "body",   body)



  try {

  

    const updatingUits = await Unit.findByIdAndUpdate(
      context.params.id,
     body,
      { new: true }

    )

 console.log("updating unit", updatingUits)

    return NextResponse.json(updatingUits)


  } catch (error) {
    return NextResponse.json({ err: error.message }, { stat: 500 })
  }





}




export async function DELETE(req, context) {

  await dbConnect()



  try {

    const deletingUnits = await Unit.findByIdAndDelete(context.params.id)
 //console.log("deleting units", deletingUnits)
    return NextResponse.json(deletingUnits)


  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 })
  }


}