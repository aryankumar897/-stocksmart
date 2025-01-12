import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Supplier from "@/models/supplier";
import Category from "@/models/category";

export async function GET() {
  await dbConnect();

  try {
    const supplier = await Supplier.find({});
    const category = await Category.find({});

    return NextResponse.json({ supplier, category });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
