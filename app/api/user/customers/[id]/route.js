import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Customer from "@/models/customers";


export async function PUT(req, context) {



  await dbConnect()

  const body = await req.json();

  try {

    const updatingCustomer = await Customer.findByIdAndUpdate(

      context.params.id,
      body,
      { new: true }



    )

    return NextResponse.json(updatingCustomer)


  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }





}




export async function DELETE(req, context) {



  await dbConnect()


 console.log("customerid", context?.params?.id)

  try {

    const deletingCustomer = await Customer.findByIdAndDelete(context.params.id)

 console.log("deleted customerid", deletingCustomer)
    return NextResponse.json(deletingCustomer)

  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 })
  }


}