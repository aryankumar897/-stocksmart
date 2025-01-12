"use client"

import React, { useState } from 'react';
import { Link, Box, Button, TextField, Typography, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SnapPOS from "@/components/nav/SnapPOS"
import { signIn,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

const LoginComponent = () => {

   const  {data}=useSession()
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
    
    console.log({email ,password   })


    try {

      const result = await signIn("credentials", {

        redirect: false,
        email, password



      })


      console.log("response", result)

      if (result?.error) {

        setSnackbar({ open: true, message: result?.error || 'Login failed!', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
       if(data){

router.push(`/dashboard/${data?.user?.role}`)

       }
      }
    } catch (error) {
      console.log("xxxxx", error);
      setSnackbar({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
    }
  };

 
 const handleCloseSnackbar=()=>{
  setSnackbar({ ...snackbar,    open: false, })
 }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/pos.jpg)',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        opacity: 0.9
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'black',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
      
        <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
          <SnapPOS />
        </Typography>


        <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
          Login
        </Typography>


        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: {
              color: '#fff',
              borderColor: 'blue',
            },
          }}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'blue',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
          }}

        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          InputLabelProps={{
            style: { color: 'white' },
          }}

          InputProps={{
            style: {
              color: '#fff',
              borderColor: 'blue',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{ color: 'white' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}





          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'blue',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: 'blue',
            ':hover': {
              backgroundColor: 'blue',
            },
          }}
        >
          Login
        </Button>
        <Link href="/register" variant="body2" sx={{ mt: 2 }}>
          Don't have an account? Sign Up
        </Link>
      </Box>
     

<Snackbar 
open={snackbar.open}
autoHideDuration={6000}
onClose={handleCloseSnackbar}

   >  




<Alert  

          onClose={handleCloseSnackbar}
severity={snackbar.severity}


sx={{width:"100%"}}
 >  

{snackbar.message}

 </Alert>
 </Snackbar>



    </Box>
  );
};

export default LoginComponent;