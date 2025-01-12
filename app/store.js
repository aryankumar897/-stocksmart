"use client";

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/reduxslice/categorySlice";
import unitReducer from "@/reduxslice/unitSlice";
import supplierReducer from "@/reduxslice/supplierSlice";
import customerReducer from "@/reduxslice/customerSlice";
import productReducer from "@/reduxslice/productSlice";
import purchaseReducer from "@/reduxslice/purchaseSlice";

import invoiceReducer from "@/reduxslice/invoiceSlice";
import admincategoryReducer from "@/reduxslice/admincategorySlice";

import adminunitReducer from "@/reduxslice/adminunitSlice";
import adminsupplierReducer from "@/reduxslice/admibsupplierSlice";

import adminproductReducer from "@/reduxslice/adminproductSlice";
import adminpurchaseReducer from "@/reduxslice/adminpurchaseSlice";
import admininvoiceReducer from "@/reduxslice/admininvoiceSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,

    units: unitReducer,
    suppliers: supplierReducer,
    customers: customerReducer,
    products: productReducer,
    purchases: purchaseReducer,
    invoices: invoiceReducer,
    admincategories:admincategoryReducer,
    adminunits:adminunitReducer ,
    adminsuppliers:adminsupplierReducer,
    adminproducts:adminproductReducer,
    adminpruchases:adminpurchaseReducer,
    admininvoices:admininvoiceReducer
  
  },
});
