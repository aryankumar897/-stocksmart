"use client"


import {
  Container, TextField,
  Button, Link, Typography, Box, Grid,
  Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material'
import SnapPOS from "@/components/nav/SnapPOS"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'

const RegisterPage = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [openSnackbar, setOpenSnackBar] = useState(false)



  const [snackbarMessage, setSnackBarMessage] = useState("")


  const [snackbarSeverity, setSnackBarSeverity] = useState("success")

  const handleRegister = async (e) => {

    e.preventDefault()
    if (!name || !phone || !password || !email) {

      setSnackBarMessage("All field  are required")


      setSnackBarSeverity("error")

      setOpenSnackBar(true)
      return

    }


    console.log({ name, phone, password, email })




    try {



      const response = await fetch(`${process.env.API}/register`, {

        method: 'POST',

        headers: {
          "Content-Type": "application/json"

        },

        body: JSON.stringify({ name, email, password, phone })

      })

      const data = await response.json()

      console.log(data)
      if (response.ok) {
        setSnackBarMessage(data?.msg || "Registration successfull")



        setSnackBarSeverity("success")
      } else {

   
        setSnackBarMessage(data?.err || "Registration failed")

        setSnackBarSeverity("error")


      }


    } catch (err) {

      setSnackBarMessage("an error occured please try again")
      setSnackBarSeverity("error")

    }

    setOpenSnackBar(true)
  }






  const togglePasswordVisibility = () => {

    setShowPassword((prev) => !prev)

  }


  const handleCloseSnackbar = () => {
    setOpenSnackBar(false)
  }


  return (



    <Container maxWidth="xxl"  >

      <Grid container spacing={2} alignItems="center" justifyContent="center"

        sx={{
          minHeight: "100vh"

        }}

      >
        <Grid

          item="true"
          xs={12}
          md={6}
        >


          <Box component="form"
            display="flex"
            flexDirection="column"

            justifyContent="center"

            alignItems="center"

            sx={{

              p: 3


            }}
            onSubmit={handleRegister}
          >

            <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
              <SnapPOS />
            </Typography>


            <Typography variant='h4' gutterBottom  >   Register</Typography>


            <TextField
              label="Name"
              fullWidth
              variant='outlined'
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}

              InputLabelProps={{

                style: { color: 'white' },

              }}
              InputProps={{
                style: {


                  color: 'white',
                  bordercolor: "blue"


                },


              }}




              sx={{

                input: { color: 'white' },


                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "blue",
                  },
                  '&:hover fieldset': {
                    borderColor: "blue",
                  },

                  '&:Mui-focused fieldset': {
                    borderColor: "blue",
                  },

                }

              }}


            />



            <TextField
              label="Phone"
              fullWidth
              variant='outlined'
              margin='normal'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}

              InputLabelProps={{

                style: { color: 'white' },

              }}
              InputProps={{
                style: {


                  color: 'white',
                  bordercolor: "blue"


                },


              }}




              sx={{

                input: { color: 'white' },


                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "blue",
                  },
                  '&:hover fieldset': {
                    borderColor: "blue",
                  },

                  '&:Mui-focused fieldset': {
                    borderColor: "blue",
                  },

                }

              }}


            />





            <TextField
              label="Email"
              type="email"
              fullWidth
              variant='outlined'
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              InputLabelProps={{

                style: { color: 'white' },

              }}
              InputProps={{
                style: {


                  color: 'white',
                  bordercolor: "blue"


                },


              }}




              sx={{

                input: { color: 'white' },


                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "blue",
                  },
                  '&:hover fieldset': {
                    borderColor: "blue",
                  },

                  '&:Mui-focused fieldset': {
                    borderColor: "blue",
                  },

                }

              }}


            />




            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant='outlined'
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              InputLabelProps={{

                style: { color: 'white' },

              }}
              InputProps={{
                style: {


                  color: 'white',
                  bordercolor: "blue"


                },


                endAdornment: (
                  <InputAdornment position="end"  >
                    <IconButton

                      onClick={togglePasswordVisibility}


                      sx={{ color: "white" }}    >

                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>

                  </InputAdornment>



                )


              }}




              sx={{

                input: { color: 'white' },


                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "blue",
                  },
                  '&:hover fieldset': {
                    borderColor: "blue",
                  },

                  '&:Mui-focused fieldset': {
                    borderColor: "blue",
                  },

                }

              }}


            />

            <Button



              type="submit"
              variant='contained'
              sx={{

                backgroundColor: "blue",
                '&:hover': {

                  backgroundColor: "blue",
                },
                mt: 2,
                width: '100%'

              }}


            >

              Submit

            </Button>

            <Link
              href="/login"
              variant='body2'
              sx={{ mt: 2, color: "#fff" }}
            >


              Already have an account? Login
            </Link>

          </Box>


        </Grid>
        <Grid
          item="true"

          xs={12}
          md={6}

        >

          <Box

            sx={{


              width: "100%",
              height: "100vh",

              display: { xs: 'none', md: 'block' }

            }}




          >


            <Box

              component="img"
              src="images/pos.jpg"

              alt="register image"


              sx={{

                width: "100%",
                height: "100%",
                objectFit: "cover"

              }}

            />


          </Box>



        </Grid>








      </Grid>





      <Snackbar

        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}

      >

        <Alert

          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}


        >{snackbarMessage}</Alert>

      </Snackbar>




    </Container>






  )


}


export default RegisterPage
