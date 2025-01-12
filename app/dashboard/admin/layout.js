"use client"

import Admin from "@/components/dashboard/admin/Admin"
import React, { useEffect, useState } from 'react';


export default function AdminLayout({ children }) {


  return (
    <>


      <Admin>
        {children}
      </Admin>





    </>
  );
}