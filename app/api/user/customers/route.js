
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Customer from "@/models/customers";


export async function GET() {

  await dbConnect();

  try {

    const customer = await Customer.find({}).sort({ createdAt: -1 })
    return NextResponse.json(customer)




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}




export async function POST(req) {

  await dbConnect();

  console.log("hello")

  const body = await req.json();


  console.log(body)


  const { name, email, image, address, mobilenumber } = body

  try {


    const customer = await Customer.create({
      name,
      email,
      image,
      address,
      mobileNumber: mobilenumber
    })


    return NextResponse.json(customer)

  } catch (err) {
    console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}