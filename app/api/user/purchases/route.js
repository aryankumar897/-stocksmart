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

export async function POST(req) {
  await dbConnect();

  const body = await req.json();


  console.log("purchase body", body)



  try {
    const savedPurchases = await Promise.all(
      body.map(async (purchase) => {
        const product = await Purchases.create({
          product_id: purchase.selectedProduct,
          supplier_id: purchase.supplierName,
          category_id: purchase.selectedCategory,
          date: purchase.startDate,
          buying_qty: purchase.quantity,
          unit_price: purchase.unitPrice,
          description: purchase.description,
          buying_price: purchase.totalPrice,
          purchase_no: purchase.purchaseNo,
          status:false
        });

 return product

      })
    );




    console.log("purchase body saved", savedPurchases)


  return NextResponse.json(savedPurchases)


  } catch (error) {
     console.log("purchases error", error)
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
