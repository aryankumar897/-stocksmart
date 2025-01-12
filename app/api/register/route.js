import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect"

import User from "@/models/user"

import bcrypt from "bcrypt"

export async function POST(req) {

  await dbConnect()
  const body = await req.json();



   const  {name, email, password,phone}=body


  console.log({ name, email, password, phone }   )

  try {

    const user = await new User({

      name, email, phone,

      password: await bcrypt.hash(password, 10)



    }).save()
    console.log("user created successfuly", user)
    return NextResponse.json({ msg: "register successfully" }, { status: 200 })

  } catch (error) {


    console.log(error)

    return NextResponse.json({ err: error.message }, { status: 500 })

  }


}










