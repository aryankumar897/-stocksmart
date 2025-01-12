
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
import { addUnit, fetchUnits, deleteUnit, updateUnit } from "@/reduxslice/unitSlice"

const UnitTable = () => {
  const dispatch = useDispatch()
  const [newUnitName, setNewUnitName] = useState("")
  const [openAddModal, setOpenAddModal] = useState(false)
  const { units, loading, error } = useSelector((state) => state.units)
  // useState hook to manage the current page number in the pagination component.
  const [page, setPage] = useState(0);

  // useState hook to manage the number of rows displayed per page in the table.
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)
 const [openEditModal,setOpenEditModal]=useState(false)

  const [filter,setFilter] = useState("")
  const handleCloseAddModal = () => setOpenAddModal(false)
  const handleOpenAddModal = () => setOpenAddModal(true)

  // Function to change the page in the pagination component.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);  // Update the current page number.
  };

  // Function to change the number of rows per page in the pagination component.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));  // Update the number of rows per page.
    setPage(0);  // Reset the page number to 0 when changing rows per page.
  };


  useEffect(() => {
    dispatch(fetchUnits())
  }, [dispatch])

  console.log("unit", units)



  const handleAddUnit = () => {
    dispatch(addUnit({ name: newUnitName }))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "unit added successfully", severity: "success" })

        handleCloseAddModal()

      })
      .catch((error) => {

        setSnackbar({ open: true, message: `error ${error}`, severity: "error" })

        console.log("error: " + error)
      })

  }



  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const handleOpenDeleteModal = (unit) => {
    setSelectedUnit(unit)
    setOpenDeleteModal(true)
  }



  const handleDeleteUnit = () => {

    if (selectedUnit) {

      dispatch(deleteUnit(selectedUnit._id))
        .unwrap()
        .then(() => {
          setSnackbar({ open: true, message: "unit deleted successfully", severity: 'success' })

          handleCloseDeleteModal()
        })
        .catch((error) => {

          console.log("failed to delete unit ", error)
          setSnackbar({ open: true, message: `error ${error}`, severity: 'error' })

        })


    }



  }



  const handleCloseEditModal=()=>setOpenEditModal(false)
  const handleOpenEditModal=(unit)=>{
    setSelectedUnit(unit)
    setOpenEditModal(true)
  }





  const handleEditUnit=()=>{

if(selectedUnit){
dispatch(updateUnit({...selectedUnit,name:newUnitName}))
.unwrap()
.then(()=>{
  setSnackbar({open:true, message:"unit  edited successfullt",severity:"success"  })

  handleCloseEditModal()

})
.catch((error)=>{
  setSnackbar({ open: true, message: `error ${error}`, severity: "error" })


})


}


  }


  const handleFilterChange=(e)=>{
setFilter(e.target.value)
  }
   
  const filterdUnits=units.filter((unit)=>
  
  unit.name.toLowerCase().includes(filter.toLowerCase())
  
  )


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
        Units
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
            Add Unit
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Unit Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterdUnits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((unit, index) => (
              <TableRow key={unit._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>
                  <IconButton color="primary"
onClick={()=>handleOpenEditModal(unit)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteModal(unit)}

                  >
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUnits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>


      {/*start Add Unit Modal */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-unit-modal"
        aria-describedby="add-unit-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="add-unit-modal" variant="h6" component="h2">
            Add Unit
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Unit Name"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
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
              sx={{
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
              }}
              variant="contained"
              onClick={handleAddUnit}
            >Add</Button>
          </Box>
        </Box>
      </Modal>

      {/*end  Add Unit Modal */}




      {/* start Edit Unit Modal */}


      <Modal
open={openEditModal}
onClose={handleCloseEditModal}
        aria-labelledby="edit-unit-modal"
        aria-describedby="edit-unit-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="edit-unit-modal" variant="h6" component="h2">
            Edit Unit
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Unit Name"
defaultValue={selectedUnit?.name}

onChange={(e)=>setNewUnitName(e.target.value ) }
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
              sx={{
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
              }}
              variant="contained"
onClick={handleEditUnit}
            >Save</Button>
          </Box>
        </Box>
      </Modal>

      {/* end Edit Unit Modal */}

      {/*start  Delete Unit Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}

        aria-labelledby="delete-unit-modal"
        aria-describedby="delete-unit-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="delete-unit-modal" variant="h6" component="h2">
            Delete Unit

          </Typography>
          <Typography id="delete-unit-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the unit
            "jump"
            ?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCloseDeleteModal}
              sx={{ mr: 1 }}>Cancel</Button>
            <Button
              onClick={handleDeleteUnit}
              sx={{
                backgroundColor: 'red',
                ':hover': {
                  backgroundColor: 'red',
                },
              }}
              variant="contained"
              color="secondary"

            >Delete</Button>
          </Box>
        </Box>
      </Modal>


      {/*end Delete Unit Modal */}






      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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
  backgroundColor: 'black',
  p: 4,
  borderRadius: 2,
  boxShadow: 130,
  width: '90%',
  maxWidth: '600px',
};
const modalBackdropStyle = {
  backdropFilter: 'blur(8px)',
};

export default UnitTable;