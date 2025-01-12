import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Customer from "@/models/customers";
import Category from "@/models/category";
import User from "@/models/user";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";

import Invoice from "@/models/invoice";
import Invoicedetails from "@/models/invoicedetails";
import Payment from "@/models/payment";
import PaymentDetails from "@/models/paymentdetails";




const generateInvoiceNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number

  return `INV-${datePart}-${randomPart}`;
};



// Example: 'INV-20241029-2345'
//console.log(invoiceNumber);



export async function POST(req) {
  await dbConnect();

  const body = await req.json();


 console.log("body", body)


  const {
    date,
    grandTotal,
    partialAmount,
    selectedCustomer,
    name, email, phone,
    discount,
    description,
    purchaseData,
    status


  } = body;



  // console.log({
  //   date,
  //   grandTotal,
  //   partialAmount,
  //   selectedCustomer,
  //   name, email, phone,
  //   discount,
  //   description,
  //   purchaseData,
  //   status

  // })

  const parsedPartialAmount = parseFloat(partialAmount) || 0;




  try {




    const invoiceNumber = generateInvoiceNumber();

    if (grandTotal < parsedPartialAmount) {
      return NextResponse.json({ err: "you  have pay maximum  amount" }, { status: 500 });

    } else {

      const invoice = await Invoice.create({

        invoice_no: invoiceNumber,
        date,
        description,
        status: false,
     

      })

     console.log("invoice", invoice)

      if (invoice) {

        const invoicedetails = await Promise.all(
          purchaseData.map(async invoicedet => {
            const invoicede = await Invoicedetails.create({
              product_id: invoicedet.selectedProduct,


              category_id: invoicedet.selectedCategory,
              date: invoicedet.startDate,
              invoice_id: invoice?._id,
              selling_qty: invoicedet.quantity,
              unit_price: invoicedet.unitPrice,

              selling_price: invoicedet.totalPrice,

              status: true
              // created_by:


            });
            return invoicede;
          })
        );




     console.log("invoicedetails", invoicedetails)

        let customerId;

        if (selectedCustomer === 'new_customer') {

          const newCustomer = await Customer.create({
            name,
            email,
            mobileNumber: phone,
          });

          customerId = newCustomer?._id

        } else {
          customerId = selectedCustomer
        }



        let paid_amount;
        let due_amount;
        let current_paid_amount;

        if (status === 'full_paid') {
          paid_amount = grandTotal;
          due_amount = 0;
          current_paid_amount = grandTotal;
        } else if (status === 'full_due') {
          paid_amount = 0;
          due_amount = grandTotal;
          current_paid_amount = 0;
        } else if (status === 'partial_paid') {
          paid_amount = parsedPartialAmount;
          due_amount = grandTotal - parsedPartialAmount;
          current_paid_amount = parsedPartialAmount;
        }




        const payment = await Payment.create({

          invoice_id: invoice?._id,
          customer_id: customerId,
          paid_status: status,
          discount_amount: discount || 0,
          total_amount: grandTotal,
          paid_amount,
          due_amount,
          customer_id: customerId,
        })


        const paymentdetails = await PaymentDetails.create({
          current_paid_amount,
          invoice_id: invoice?._id,
          date,
        

        })

        console.log("payment", payment)
      console.log("paymentdetails", paymentdetails)

      }
    }








    return NextResponse.json({ msg: "data inserted successfully" }, { status: 201 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



export async function GET() {

  await dbConnect();

  try {

    const invoice = await Invoice.find({})
    const invoicedetails = await Invoicedetails.find({})


    const payment = await Payment.find({})

    const paymentdetails = await PaymentDetails.find({})


    console.log({

      invoice, invoicedetails, payment, paymentdetails

    })


     console.log("hii")

    return NextResponse.json(

      invoice)




  } catch (err) {
     console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }

}



