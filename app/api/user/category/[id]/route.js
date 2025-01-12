 import {NextResponse} from "next/server"

 import dbConnect from "@/utils/dbConnect"

 import Category  from "@/models/category"

  export async function PUT(req,context){
await dbConnect()





 const  body=await req.json()

 console.log("update", body)

 try {
  

 const {...updateBody}=body

  const updatingCategory=await Category.findByIdAndUpdate(  
 context.params.id,
    updateBody,
{new :true}

   )

   console.log(" updatingCategory", updatingCategory)



   return NextResponse.json(updatingCategory)

 } catch (error) {
   return  NextResponse.json({err: error.message} ,{start: 500})
 }




  }



   export async function DELETE(req,context){



await dbConnect()



 try {
  

   const  deletingCategory= await Category.findByIdAndDelete(context.params.id)

   console.log("deletingCategory",deletingCategory)

   return NextResponse.json(deletingCategory)

 } catch (error) {
   return  NextResponse.json({err:error.message},{status:500}  )
 }

   }