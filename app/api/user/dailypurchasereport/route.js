import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Purchases from "@/models/purchases";

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

    const purchases = await Purchases.find(query)
      .populate("supplier_id")
      .populate("category_id")
      .populate("product_id");


 console.log("purchases",purchases )


       return NextResponse.json(purchases)
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
