import { NextResponse } from "next/server";

import Stripe from "stripe";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";

const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const { billingPeriod, price } = body;

  console.log("{billingPeriod,price}", { billingPeriod, price });

  const sessions = await getServerSession(authOptions);

  const str = price;
  const integerOnly = str && parseInt(str.match(/\d+/)[0], 10);

  try {
    const user = await User.findOne({ _id: sessions?.user?._id });

    if (!user) {
      return NextResponse.json({ err: "user not found" }, { status: 500 });
    }

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: `${billingPeriod} Subscription`,
            },
            unit_amount: integerOnly * 100,
          },

          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: user?.email,

      metadata: {
        userId: user?._id.toString(),
        billing: billingPeriod,
      },
    });



 console.log("session===========",session)

 return  NextResponse.json({id:session.url})


  } catch (error) {
    console.log("error ", error);

    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
