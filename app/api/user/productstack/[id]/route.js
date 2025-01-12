import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/product";


export async function GET(req, context) {
  await dbConnect();

  try {
    const products = await Product.findOne({ _id: context.params.id });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
