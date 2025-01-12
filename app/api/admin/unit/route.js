import { NextResponse } from "next/server";


import Unit from "@/models/units"


import dbConnect from "@/utils/dbConnect";


export async function GET() {

  await dbConnect()



  try {


    const unit = await Unit.find({}).sort({ createdAt: -1 })
    // console.log("unit data",unit)
    return NextResponse.json(unit)


  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }


}

