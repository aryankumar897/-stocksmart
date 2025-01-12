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


export async function POST(req) {



  await dbConnect()


  const body = await req.json()

  const { name } = body

 //console.log("name unit", name)



  try {
    const unit = await Unit.create({ name })

    // console.log("unit", unit)
    return NextResponse.json(unit)

  } catch (error) {

 console.log("error", error)

    return NextResponse.json({ err: error.message }, { status: 500 })
  }




}
