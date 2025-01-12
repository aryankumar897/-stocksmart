import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/product";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { reportType, name } = body;

  console.log({ reportType, name });

  try {
    const data =
      reportType === "supplier"
        ? await Product.find({ supplierNameId: name })
            .populate("supplierNameId")
            .populate("categoryNameId")
        : await Product.find({ categoryNameId: name })
            .populate("supplierNameId")
            .populate("categoryNameId");

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
