import { NextResponse } from "next/server"


import dbConnect from "@/utils/dbConnect"

import Category from "@/models/category"


export async function GET() {


  await dbConnect()

  try {

    const category = await Category.find({}).sort({ createdAt: -1 })
    return NextResponse.json(category)


  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 })
  }


}


