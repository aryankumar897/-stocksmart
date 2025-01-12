import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";

import Subscription from "@/models/subscription";

import User from "@/models/user";

export async function POST(req, context) {
  await dbConnect();

  const sessions = await getServerSession(authOptions);

  try {
    const user = await User.findOne({ _id: sessions?.user?._id });

    const res = context?.params?.id?.toString() === user?._id?.toString();

    console.log("res******", res);

    if (!res) {
      return NextResponse.json({ err: "unauthorized access" }, { status: 500 });
    }

    const subscription = await Subscription.findById(user?.subscription);

    if (subscription && subscription.endDate > new Date()) {
      return NextResponse.json({ msg: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { err: "subscription expired" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
