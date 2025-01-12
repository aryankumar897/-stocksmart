"use client"

import InvoiceListPdf from "@/components/invoicelistpdf/InvoiceListPdf"


import { useSearchParams } from 'next/navigation'
export default function Pos() {
const searchParams=useSearchParams()

 const   search=searchParams.get("invoiceid")



  return (


    <>
  



 <InvoiceListPdf
search={search}



/>  


    </>
  )

}