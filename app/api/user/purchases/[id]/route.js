import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Purchases from "@/models/purchases";


import Product from "@/models/product"
export async function PUT(req, context) {
  await dbConnect();

  try {
    const purchase = await Purchases.findById({ _id: context.params.id });
    
    
    
    if (!purchase) {
      return NextResponse.json(
        { message: "Purchage not found" },
        { status: 404 }
      );
    }

    if (purchase.status === true) {
      return NextResponse.json(
        { message: "Purchases already approve not  update needed" },
        { status: 400 }
      );
    }

 const product=await Product.findById({_id:purchase?.product_id })
 if (!product) {
  return NextResponse.json(
    { message: "product not found" },
    { status: 404 }
  );
}


 const purchaseQty=parseFloat(purchase.buying_qty)+parseFloat(product?.quantity)

product.quantity=purchaseQty


await product.save()


 purchase.status=true

 await purchase.save()


  console.log({ purchase,product })


  return NextResponse.json({purchase,product});

  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  try {
    const deletingPurchases = await Purchases.findByIdAndDelete(
      context.params.id
    );

 console.log(" deletingPurchases", deletingPurchases )


    return NextResponse.json(deletingPurchases);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
