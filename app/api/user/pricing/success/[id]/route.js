import { NextResponse } from "next/server";

import Stripe from "stripe";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";

const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

import Subscription from "@/models/subscription";
import Order from "@/models/order";

export async function GET(req, context) {
  await dbConnect();

  const sessionuser = await getServerSession(authOptions);

  try {
    const session = await stripeInstance.checkout.sessions.retrieve(
      context.params.id
    );

    console.log("session****************", session);
    if (session && session?.payment_status === "paid") {
      const user = await User.findOne({ _id: sessionuser?.user._id });

      const alreadysubscription = await Subscription.findOne({
        userId: user?._id,
      });

      const currentDate = new Date();

      const billingPeriod = session.metadata.billing;

      const userId = session.metadata.userId;
      const amount = session.amount_total / 100;

      if (amount === 0) {
        return NextResponse.json(
          { message: "No  charge for  this  transaction" },
          { status: 400 }
        );
      }

      if (alreadysubscription) {
        if (currentDate < alreadysubscription.endDate) {
          const updatedEndDate = new Date(alreadysubscription.endDate);

          if (billingPeriod === "annual") {
            updatedEndDate.setFullYear(updatedEndDate.getFullYear() + 1);
          } else if (billingPeriod === "monthly") {
            updatedEndDate.setMonth(updatedEndDate.getMonth() + 1);
          }

          alreadysubscription.endDate = updatedEndDate;

          const order = new Order({
            userId,
            transactionId: session.id,
            orderStatus: "Completed",
            paymentMethod: "Credit Card",
            paymentStatus: "Paid",
            totalPrice: amount,
          });

          await order.save();
        } else {
          const newEndDate = new Date();

          if (billingPeriod === "annual") {
            newEndDate.setFullYear(newEndDate.getFullYear() + 1);
          } else if (billingPeriod === "monthly") {
            newEndDate.setMonth(newEndDate.getMonth() + 1);
          }

          alreadysubscription.endDate = newEndDate;

          const order = new Order({
            userId,
            transactionId: session.id,
            orderStatus: "Completed",
            paymentMethod: "Credit Card",
            paymentStatus: "Paid",
            totalPrice: amount,
          });

          await order.save();
        }

        await alreadysubscription.save();
      } else {
        const endDate = new Date();

        if (billingPeriod === "annual") {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else if (billingPeriod === "monthly") {
          endDate.setMonth(endDate.getMonth() + 1);
        }

        const subscription = new Subscription({
          userId,
          stripesubscriptionId: session.id,
          startDate: new Date(),
          endDate,
          price: amount,
        });

        await subscription.save();

        const order = new Order({
          userId,
          transactionId: session.id,
          orderStatus: "Completed",
          paymentMethod: "Credit Card",
          paymentStatus: "Paid",
          totalPrice: amount,
        });

        await order.save();

        await User.findByIdAndUpdate(userId, {
          subscription: subscription?._id,
        });
      }

       console.log("success: payment verified")
      return NextResponse.json(
        { success: "payment verified" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { err: "payment  failed , please try  again" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("payment error*****", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
