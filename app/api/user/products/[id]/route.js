import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Product from "@/models/product";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();

  try {
    const updatingProduct = await Product.findByIdAndUpdate(
      context.params.id,
      body,
      { new: true }
    );

 console.log("updated product",updatingProduct )

    return NextResponse.json(updatingProduct);



  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const deletingProduct = await Product.findByIdAndDelete(context.params.id);

    console.log("deleteProduct", deletingProduct);

    return NextResponse.json(deletingProduct);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
