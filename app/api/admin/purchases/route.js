import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Purchases from "@/models/purchases";


export async function GET() {
  await dbConnect();
  try {
    const purchases = await Purchases.find({})
      .populate("supplier_id")
      .populate("category_id")
      .populate("product_id");

    return NextResponse.json(purchases);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}