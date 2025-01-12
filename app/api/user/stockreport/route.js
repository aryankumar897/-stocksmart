import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/product";
export async function GET() {
  await dbConnect();

  try {
    const product = await Product.find({}).populate("categoryNameId");
   
    console.log("stock  produtct",  product)
   
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
