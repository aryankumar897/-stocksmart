import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Invoice from "@/models/invoice";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  try {
    const { startDate, endDate } = body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const query = {
      date: {
        $gte: start,
        $lte: end,
      },
    };

 const invoice=await  Invoice.find(query).sort({createdAt:-1})

 console.log("fetching invoice report", invoice)


  return NextResponse.json(invoice)


  } catch (error) {

    console.log("fetching invoice report error", error)


    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
