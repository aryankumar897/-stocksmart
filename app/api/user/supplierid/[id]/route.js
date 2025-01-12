import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import Product from "@/models/product";

export async function GET(req, context) {
  await dbConnect();

  try {
    const categories = await Product.find({ supplierNameId: context.params.id })
      .select("categoryNameId")
      .populate("categoryNameId");

    console.log("categories", categories);

    return NextResponse.json(categories);
  } catch (error) {
     console.log("eror server side", error)
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
