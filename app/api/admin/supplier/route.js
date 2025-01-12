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

