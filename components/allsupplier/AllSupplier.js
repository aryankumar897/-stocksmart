
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState, useEffect } from 'react';

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

import { addSupplier, fetchSuppliers, deleteSupplier, updateSupplier } from "@/reduxslice/supplierSlice"
import { useDispatch, useSelector } from 'react-redux';


import RefreshIcon from '@mui/icons-material/Refresh';



const SupplierTable = () => {

  const dispatch = useDispatch()

  const { suppliers, loading, error } = useSelector(state => state.suppliers)

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
const  [filter,setFilter]=useState("")
  const [snackbar, setSnackbar] = useState({

    open: false,
    message: "",
    severity: 'success'

  })



  const [form, setForm] = useState({


    name: "",
    email: "",
    phone: "",
    address: ""
  })





  useEffect(() => {
    dispatch(fetchSuppliers())
  }, [dispatch])


  console.log("suppliers", suppliers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  }



   const  handleFilterChange=(e)=>{

  setFilter(e.target.value)

   }
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }



  const handleAddSupplier = () => {
    dispatch(addSupplier(form))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "supplier added successfully", severity: "success" })
        handleCloseAddModal()

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })
        console.log("error adding supplier", error)
      })

  }




  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }



  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }


  const handleOpenDeleteMpdal = (supplier) => {
    setSelectedSupplier(supplier)
    setOpenDeleteModal(true)
  }



  const handleDeleteSupplier = (supplierId) => {

    dispatch(deleteSupplier(supplierId))
      .unwrap()

      .then(() => {

        setSnackbar({ open: true, message: "supplier deleted successfully", severity: 'success' })
        handleCloseDeleteModal()

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error ${error}`, severity: 'error' })
        console.log("error deleting supplier  ", error)
      })


  }

  const handleOpenEditModal = (supplier) => {
    setSelectedSupplier(supplier)

    setForm(supplier)
    setOpenEditModal(true)

  }


  const handleEditSupplier = () => {

    dispatch(updateSupplier(form))
      .unwrap()
    .then(() => {
      setSnackbar({ open: true, message: "supplier edited successfully", severity: 'success' })

      handleCloseEditModal()
      dispatch(fetchSuppliers())


    })
      .catch((error) => {
        setSnackbar({ open: true, message: error || "supplier edited successfully", severity: 'error' })

      })



  }





   const filteredSuppliers=suppliers.filter((supplier )=> 
  
  supplier?.name?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}
        style={{
          fontSize: '3rem',
          color: '#0073e6',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          padding: '10px',
          borderBottom: '2px solid #0073e6',
          letterSpacing: '1px',
        }}
      >
        Suppliers
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={() => window.location.reload()}

        sx={{
          backgroundColor: 'blue',
          ':hover': {
            backgroundColor: 'blue',
          },
          height: '100%',
        }}
      >
        Reload
      </Button>


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
            Add Supplier
          </Button>
        </Grid>




      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {

              loading ? (
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
                  <TableCell
                    colSpan={3}
                    sx={{ color: 'red', fontWeight: 'bold' }}
                  >
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : (


                    filteredSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
                  <TableRow key={supplier._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>
                      <IconButton color="primary"
                        onClick={() => handleOpenEditModal(supplier)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton

                        onClick={() => handleOpenDeleteMpdal(supplier)}
                      >
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))



              )


            }





          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSuppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>








      {/* start Add Supplier Modal */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-supplier-modal"
        aria-describedby="add-supplier-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="add-supplier-modal" variant="h6" component="h2">
            Add Supplier
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
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
            required
            variant="outlined"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
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
            type="number"
            required
            fullWidth
            variant="outlined"
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleFormChange}
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
            required
            variant="outlined"
            label="Address"
            name="address"
            value={form.address}
            onChange={handleFormChange}
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
            sx={{
              mt: 2,
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
            }}
            onClick={handleAddSupplier}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              ml: 2,
              color: 'white',
              borderColor: 'blue',
              ':hover': {
                borderColor: 'blue',
              },
            }}
            onClick={handleCloseAddModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>


      {/*end Add Supplier Modal */}






      {/*start  Edit Supplier Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-supplier-modal"
        aria-describedby="edit-supplier-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="edit-supplier-modal" variant="h6" component="h2">
            Edit Supplier
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleFormChange}
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
            variant="outlined"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
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
            variant="outlined"
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleFormChange}
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
            variant="outlined"
            label="Address"
            name="address"
            value={form.address}
            onChange={handleFormChange}
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


            onClick={handleEditSupplier}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
            }}

          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              ml: 2,
              color: 'white',
              borderColor: 'blue',
              ':hover': {
                borderColor: 'blue',
              },
            }}
            onClick={handleCloseEditModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>





      {/*end  Edit Supplier Modal */}

      {/*  start  Delete Supplier Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-supplier-modal"
        aria-describedby="delete-supplier-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="delete-supplier-modal" variant="h6" component="h2">
            Delete Supplier
          </Typography>
          <Typography id="delete-supplier-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete
            {" "} {selectedSupplier?.name}
            ?

          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'red',
              ':hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={() => handleDeleteSupplier(selectedSupplier?._id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              ml: 2,
              color: 'white',
              borderColor: 'blue',
              ':hover': {
                borderColor: 'blue',
              },
            }}
            onClick={handleCloseDeleteModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/*  end Delete Supplier Modal */}

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

export default SupplierTable;