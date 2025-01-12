
"use client";


import React, { useEffect, useState } from 'react';

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

import { useSelector, useDispatch } from 'react-redux';


import CircularProgress from '@mui/material/CircularProgress';

import { addCategory, fetchCategories, deleteCategory, updateCategory } from "@/reduxslice/categorySlice"


const CategoryTable = () => {

  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector((state) => state.categories)

  console.log("categories", categories)

  const [page, setPage] = useState(0);


  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [openAddModal, setOpenAddModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)

  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"


  })
 const [filter,setFlter]=useState("")


  const [editCategoryName, setEditCategoryName] = useState("")
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleCloseEditModal = () => setOpenEditModal(false)

  const handleOpenEditModal = (category) => {
    setOpenEditModal(true)
    setSelectedCategory(category)
    setEditCategoryName(category.name)
  }



  const handleEditCategory = () => {
    const updatedCategory = { ...selectedCategory, name: editCategoryName }
    dispatch(updateCategory(updatedCategory)).unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "category edited successfully", severity: "success" })

        handleCloseEditModal()
      })
      .catch((error) => {

        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })

      })


  }




  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const handleOpenAddModal = () => {

    setOpenAddModal(true)
  }


  const handleAddCategory = () => {
    const newCategory = { name: newCategoryName }
    dispatch(addCategory(newCategory)).unwrap()
      .then(() => {
        setSnackbar({ open: true, message: 'category added successfully', severity: 'success' })

        handleCloseAddModal()

      })
      .catch((error) => {

        setSnackbar({ open: true, message: `error ${error.err}`, severity: 'error' })

        console.log(error)
      })

  }


  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(selectedCategory?._id)).unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "caategory deledte successfully", severity: "success" })
        handleCloseDeleteModal()

      })
      .catch((error) => {
        setSnackbar({ open: true, message: `error :${error}`, severity: "error" })
      })


  }


  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category)
    setOpenDeleteModal(true)

  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }


  const filteredCategories = categories.filter((category)=>
  
  category?.name?.toLowerCase().includes(filter.toLowerCase())
  
  )


  const handleFilterChange=(event)=>{
    setFlter(event.target.value)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}
        style={{
          fontSize: '3rem',
          color: '#0073e6',       // A nice blue color
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          padding: '10px',
          borderBottom: '2px solid #0073e6', // Underline effect
          letterSpacing: '1px',
        }}

      >
        Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."

vaule={filter}
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
            Add Category
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category Name</TableCell>
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
                  filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton

                      onClick={() => handleOpenEditModal(category)}

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


                      onClick={() => handleOpenDeleteModal(category)}

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
              ))
            )}
          </TableBody>




        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "white"
        }}
      />





      {/* start Add Category Modal */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-category-modal"
        aria-describedby="add-category-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="add-category-modal" variant="h6" component="h2">
            Add Category
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Category Name"
            value={newCategoryName}

            onChange={(e) => setNewCategoryName(e.target.value)}



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
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCloseAddModal}

              sx={{ mr: 1 }}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              sx={{
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*end  Add Category Modal */}






      {/*start Edit Category Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-category-modal"
        aria-describedby="edit-category-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>

          <Typography id="edit-category-modal" variant="h6" component="h2">
            Edit Category
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Category Name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
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
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCloseEditModal}
              sx={{ mr: 1 }}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditCategory}
              sx={{
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      {/*end  Edit Category Modal */}






      {/*start Delete Category Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-category-modal"
        aria-describedby="delete-category-modal-description"
        sx={modalBackdropStyle}
      >
        <Box
          sx={modalStyle}

        >
          <Typography id="delete-category-modal" variant="h6" component="h2">
            Delete Category
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this category?

            {JSON.stringify(selectedCategory)}

          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button

              onClick={handleCloseDeleteModal}
              sx={{ mr: 1 }}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCategory}
              sx={{
                backgroundColor: 'red',
                ':hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* end Delete Category Modal */}




      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}

        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}>
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

export default CategoryTable;