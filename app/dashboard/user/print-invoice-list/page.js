"use client"

import Print from "@/components/PrintInvoiceList/Print"


import { useSearchParams } from 'next/navigation'
export default function Pos() {
const searchParams=useSearchParams()

 const   search=searchParams.get("invoiceid")



  return (


    <>
  

<Print
search={search}



/> 


    </>
  )

}