
"use client"
import React, { useState, useEffect } from 'react';



import { useDispatch, useSelector } from 'react-redux';



import {
  Box,

  Button,

  TextField,

  Typography,

  IconButton,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  TablePagination,

  Paper,

  Modal,

  Snackbar,

  Alert,

  Grid

} from '@mui/material';


import { Edit, Delete, Add } from '@mui/icons-material';


import CircularProgress from '@mui/material/CircularProgress';

import { addCustomer, fetchCustomers, deleteCustomer, updateCustomer } from "@/reduxslice/customerSlice"

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`
const CLOUDINARY_PRESET = "ml_default"

const CustomerTable = () => {

  const dispatch = useDispatch()



  const { customers, loading, error } = useSelector((state) => state.customers)
  const [page, setPage] = useState(0);


  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [newCustomerImagePreview, setNewCustomerImagePreview] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState(null)
const [filter,setFilter] = useState("")
  const [editCustomer, setEditCustomer] = useState(
    {
      name: "",
      address: '',
      email: "",
      mobileNumber: "",
      image: null,
    }


  )


  const [editCustomerImagePreview, setEditCustomerImagePreview] = useState(null)
  const handleOpenAddModal = () => {
    setOpenAddModal(true)
  }


  useEffect(() => {
    dispatch(fetchCustomers())

  }, [dispatch])



  const handleCloseAddModal = () => setOpenAddModal(false)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const handleCloseEditModal = () => setOpenEditModal(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    email: "",
    mobilenumber: "",
    image: null
  })


  const handleAddCustomer = () => {
    // console.log(newCustomer)
    dispatch(addCustomer({ ...newCustomer }))
      .unwrap()
      .then(() => {

        handleCloseAddModal()
        setSnackbar({ open: true, message: " customer added successfully", severity: "success" })

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })

        console.log("error adding new customers", error)
      })



  }





  const handleFileChange = async (event, setter, previewSetter) => {
    const file = event.target.files[0]
    if (file) {

      const fileUrl = URL.createObjectURL(file)

      previewSetter(fileUrl)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_PRESET)

      try {

        const response = await fetch(CLOUDINARY_UPLOAD_URL, {


          method: 'POST',
          body: formData
        })


        const data = await response.json()

        console.log("image", data)
        const imageUrl = data?.secure_url

        setter((prev) => ({
          ...prev, image: imageUrl


        }))


        setSnackbar({ open: true, message: "image Uploaded successfully", severity: "success" })


      } catch (error) {

        setSnackbar({ open: true, message: `error  ${error}`, severity: "error" })

        console.log("erorr uploading image to the cloudinary", error)
      }




    }




  }


  // Function to handle the page change in the pagination controls.
  const handleChangePage = (event, newPage) => setPage(newPage);

  // Function to handle the change of rows per page in the pagination controls.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update the number of rows per page.
    setPage(0); // Reset the page number to the first page.
  };
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })


  const handleOpenDeleteModal = (customer) => {
    setSelectedCustomer(customer)
    setOpenDeleteModal(true);
  }




  const handleDeleteCustomer = () => {
    dispatch(deleteCustomer(selectedCustomer._id))
      .unwrap()
      .then(() => {
        handleCloseDeleteModal()
        setSnackbar({ open: true, message: "Customer deleted successfully", severity: "success" })

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })

      })



  }



  const handleOpenEditModal = (customer) => {
    setEditCustomer({ ...customer })
    setSelectedCustomer(customer)
    setEditCustomerImagePreview(customer.image)
    setOpenEditModal(true)
  }




  const handleEditCustomer = () => {

    dispatch(updateCustomer({ ...editCustomer }))
      .unwrap()

      .then(() => {
        dispatch(fetchCustomers())
        handleCloseEditModal()
        setSnackbar({ open: true, message: "Customer edited successfully", severity: "success" })

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })

      })

  }




   const  handleFilterChange=(e)=>{
    setFilter(e.target.value)
   }



 const filteredCustomers=customers.filter(customer => 
  customer.name.toLowerCase().includes(filter.toLowerCase())

)






  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}
        style={{
          fontSize: '3rem',
          color: 'blue',       // A nice blue color
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          padding: '10px',
          borderBottom: '2px solid #0073e6', // Underline effect
          letterSpacing: '1px',
        }}


      >
        Customers
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."

value={filter}
onChange={handleFilterChange}
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddModal}
            sx={{
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
              height: '100%',
            }}
          >
            Add Customer
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow style={{ borderBottom: "6px solid blue" }}>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>


          <TableBody>

            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                    <Typography sx={{ ml: 2 }}>Loading...</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>Error: {error}</TableCell>
              </TableRow>
            ) : (



                  filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                <TableRow key={customer._id} style={{ borderBottom: "2px solid blue" }}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.image && (
                      <img
                        src={customer.image}
                        alt={customer.name}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton

                      onClick={() => handleOpenEditModal(customer)}
                    >
                      <Edit
                        sx={{
                          color: 'blue',
                          ':hover': {
                            color: 'darkred',
                          },
                        }}


                      />
                    </IconButton>
                    <IconButton

                      onClick={() => handleOpenDeleteModal(customer)}

                    >
                      <Delete
                        sx={{
                          color: 'red',
                          ':hover': {
                            color: 'darkred',
                          },
                        }}

                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )))

            }
          </TableBody>



        </Table>




        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>




      {/*add customers
 modal  start */}

      <Modal
        sx={modalBackdropStyle}
        open={openAddModal}
        onClose={handleCloseAddModal}
      >
        <Box
          sx={modalStyle}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Customer
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Address"
            variant="outlined"
            margin="normal"


            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Email"
            variant="outlined"
            margin="normal"

            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}


            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            value={newCustomer.mobilenumber}
            onChange={(e) => setNewCustomer({ ...newCustomer, mobilenumber: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            variant="contained"
            component="label"

            sx={{ mt: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"

              onChange={(e) => handleFileChange(e, setNewCustomer, setNewCustomerImagePreview)}

            />

          </Button>

          {newCustomerImagePreview && (
            <img
              src={newCustomerImagePreview}
              alt="Preview"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
          <Button
            variant="contained"
            onClick={handleAddCustomer}

            sx={{ mt: 2, ml: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


          >
            Add
          </Button>



          <Button
            variant="contained"
            onClick={handleCloseAddModal}

            sx={{ mt: 2, ml: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


          >
            Cancel
          </Button>



        </Box>
      </Modal>

      {/* add  customers
 modal  end */}





      {/* edit  customers
 modal  start */}
      <Modal
        sx={modalBackdropStyle}
        open={openEditModal}
        onClose={handleCloseEditModal}

      >
        <Box
          sx={modalStyle}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Customer
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={editCustomer.name}

            onChnage={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Address"
            variant="outlined"
            margin="normal"
            value={editCustomer.address}
            onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Email"
            variant="outlined"
            margin="normal"

            value={editCustomer.email}
            onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            value={editCustomer.mobileNumber}
            onChange={(e) => setEditCustomer({ ...editCustomer, mobileNumber: e.target.value })}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              mt: 2,
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
            variant="contained"
            component="label"

            sx={{ mt: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


          >
            Upload Image


            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, setEditCustomer, setEditCustomerImagePreview)}

            />

          </Button>
          {editCustomerImagePreview && (
            <img
              src={editCustomerImagePreview}
              alt="Preview"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditCustomer}

            sx={{
              mt: 2,
              backgroundColor: 'blue',
              ':hover': { backgroundColor: 'blue' }
            }}

          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* edit  customers
 modal  end */}




      {/* delete  customers
 modal  start*/}

      <Modal
        sx={modalBackdropStyle}
        open={openDeleteModal}

        onClose={handleCloseDeleteModal}
      >
        <Box
          sx={modalStyle}
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to delete this customer?

            {selectedCustomer?.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={handleCloseDeleteModal}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: 'white',
                ':hover': {
                  backgroundColor: "red",

                },
              }}
              onClick={handleDeleteCustomer}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* delete  customers
 modal  end */}


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>



    </Box>
  );
};



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const modalBackdropStyle = {
  backdropFilter: 'blur(5px)',
};



export default CustomerTable;






