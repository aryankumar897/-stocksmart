import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Product from "@/models/product";
import Invoice from "@/models/invoice";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { invoiceDetails } = body;

  try {
    for (let details of invoiceDetails) {
      const { product_id, selling_qty, invoice_id } = details;

      const product = await Product.findById(product_id?._id);
      if (product.quantity < selling_qty) {
        return NextResponse.json({
          success: false,
          message: `NOT enough  stock  for ${product.productName}`,
        });
      }
    }

    for (let details of invoiceDetails) {
      const { product_id, selling_qty, invoice_id } = details;

      await Product.findByIdAndUpdate(product_id?._id, {
        $inc: {
          quantity: -selling_qty,
        },
      });

      await Invoice.findByIdAndUpdate(invoice_id, {
        status: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Invoice approved and stock updated successfully",
    });
  } catch (error) {
    console.log(" error aprove", error);

    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
