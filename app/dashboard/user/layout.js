

"use client"

import Admin from "@/components/dashboard/user/User"
import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { CloudDownload } from '@mui/icons-material';  // Example MUI Icon
import { useRouter } from 'next/navigation'



import { ToastContainer, toast } from 'react-toastify';

export default function AdminLayout({ children }) {
    const router = useRouter()
    const { data } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [plan,setPlan]=useState(null)
    useEffect(() => {
        if (!data?.user?._id) return;
        fetchSubscription();
    }, [data]);

    const fetchSubscription= async () => {

        const userId = data?.user?._id;

        try {
            const response = await fetch(`${process.env.API}/user/active/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            if (!response.ok) {
              toast.error(data?.err);
                router.push("/pricing")

            } else {



                setPlan(data?.msg)
                console.log(data);
                setIsLoading(false)

            }


        } catch (err) {
            console.log(err);
          
            setIsLoading(false)

        }
    };


//  useEffect(()=>{
//  if(plan===false){
//    router.push("/pricing")
//  }


//  },[ plan,router])



 if (isLoading) {
  return (
      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
      >
          <Box
              sx={{
                  backgroundImage: 'url("/images/pos1.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: 4,
                  flexDirection: 'column',
              }}
          >
              <CloudDownload
                  sx={{
                      color:"blue",
                      fontSize: 60,
                     
                      marginBottom: 2,
                      animation: 'spin 2s infinite linear',
                  }}
              />
              <Typography
                  variant="h4"
                  sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      marginBottom: 3,
                  }}
              >
                  Loading...
              </Typography>
              <CircularProgress size={60} color="primary" sx={{ marginTop: 2 }} />
          </Box>
      </motion.div>
  );
}







    return (
        <>

           
            
{   
                plan ? (<Admin>
                    {children}
                </Admin>) : (router.push("/pricing")  )


            }

         


        </>
    );
}