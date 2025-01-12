import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Modal, Snackbar, Alert, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
// Import the CircularProgress component from Material-UI for showing a loading spinner.
import CircularProgress from '@mui/material/CircularProgress';


import {fetchInvoices   ,deleteInovice} from "@/reduxslice/invoiceSlice"
import { useRouter } from 'next/navigation'
const PurchaseTable = () => {
  const dispatch = useDispatch();


  const router = useRouter()

 const  {invoices,loading,error}= useSelector((state)=>state.invoices)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
   const [filter,setFilter]=useState("")
 const [payments,setPayments]=useState([])
 const [openDeleteModal,setOpenDeleteModal]=useState(false)
 const [snackbar,setSnackbar]=useState({    
open:false,
message:""
,
severity:"success"

  })
 const [selectedInvoice,setSelectedInvoice]=useState(null)

 useEffect(()=>{
dispatch(fetchInvoices())

 },[dispatch])
 

  console.log("invoices",invoices)

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



 useEffect(()=>{
  fetchpayment()

 },[invoices])


 const fetchpayment=async ()=>{



 try {
  

 const  response=await fetch(`${process.env.API}/user/payment`)

 const  allpayment=await  response.json()
  setPayments(allpayment)


 } catch (error) {
   console.log("error", error)
 }

 }


 const handleOpenDeleteModal=(invoice)=>{
  console.log("deleting invoice data",invoice)
 setSelectedInvoice(invoice)
setOpenDeleteModal(true)

 }


 const handleCloseDeleteModal=()=>setOpenDeleteModal(false)

 const  handleDeleteInvoice=()=>{

 dispatch(deleteInovice(selectedInvoice?._id))
 . unwrap()
 .then(()=>{

setSnackbar({open:true  , message:"Inovice Delete SuccessFully", severity:"success"})

   handleCloseDeleteModal()
 })

 .catch(( error)=>{
  setSnackbar({open:true  , message:`eror ${error}`, severity:"error"})

   console.log("error", error)
 })

 }




 const handleCloseSnackbar=()=>{
  setSnackbar({...snackbar, open: false})
 }


 const filteredInvoice=invoices.filter((invoice ) =>   
 invoice?.invoice_no?.toLowerCase().includes(filter.toLowerCase())

)



 const handleFilterChange=(e)=>{

  setFilter(e.target.value)
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
        Approval-invoice


      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"

            startIcon={<Add />}
          onClick={()=> router.push(`/dashboard/user/all-invoice`)}
           
            sx={{
              p: 1,
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
              height: '100%',
            }}
          >
            Add Invoice
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
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
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>

              <TableCell>S.No</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>

          
              <TableCell>Status</TableCell>
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




              filteredInvoice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => (
                <TableRow key={invoice?._id}>

                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                   { invoice?.invoice_no}

                  </TableCell>
                  <TableCell>
                   { new Date(invoice?.date).toLocaleDateString()}
                    </TableCell>
                  <TableCell>
                    { invoice?.description}
                     </TableCell>


 {/* find  the matching payment for  this invoice */}

               


   {(() => {
                    const matchingPayment = Array.isArray(payments)
                      ? payments.find(payment => payment?.invoice_id?.toString() === invoice?._id?.toString())
                      : null;

                       console.log("Array.isArray(payments)",Array.isArray(payments))
                       console.log("matchingPayment",matchingPayment)
                 
                    return (
                      <>
                        <TableCell>{matchingPayment ? matchingPayment?.customer_id?.name : "N/A"}</TableCell>
                        <TableCell>{matchingPayment ? matchingPayment?.total_amount : "N/A"}</TableCell>
                      </>
                    );
                  })()}

                 





       <TableCell>


          <Button
                      variant="contained"
 color={invoice?.status ? "success":"warning"}
                    
                   
                      style={{
                        borderRadius: '20px',
                        padding: '5px 10px',
                        minWidth: 'auto',
                        fontSize: '0.8rem',
                      }}
                    >

              {invoice?.status ?"active" :"pending"}
                    </Button>
                  </TableCell>

 

                  <TableCell>



              

                    


                    <Button
                      variant="outlined"
                    
                      startIcon={<AddTaskIcon />}

                 onClick={()=> router.push(`/dashboard/user/print-invoice-list?invoiceid=${invoice?._id}`)}
                      style={{
                        m:5,
                        borderRadius: '20px',
                        padding: '5px 10px',
                        minWidth: 'auto',
                        fontSize: '0.8rem',
                      }}
                    >
                    
                    </Button>



                      
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                       
                       onClick={()=>handleOpenDeleteModal(invoice)}
                        style={{
                          borderRadius: '20px',
                          padding: '5px 10px',
                          minWidth: 'auto',
                          fontSize: '0.8rem',
                        }}
                      >
                        Delete
                      </Button>
                      
                   
                  
                   



                  </TableCell>

                </TableRow>


              ))

            )}





          </TableBody> 


        </Table>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredInvoice.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> 
      </TableContainer>
      {/* Delete invoice Modal */}


            
      <Modal
     open={openDeleteModal}
     onClose={handleCloseDeleteModal}
        aria-labelledby="delete-purchase-modal"
        aria-describedby="delete-purchase-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="delete-purchase-modal" 
          variant="h6" component="h2">
            Delete Purchase
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this purchase?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
           
          onClick={handleCloseDeleteModal}
             sx={{ mr: 1 }}>Cancel</Button>
            <Button
onClick={handleDeleteInvoice}


              sx={{
                backgroundColor: 'red',
                ':hover': {
                  backgroundColor: 'red',
                },
              }}
              variant="contained"
             
            >Delete</Button>
          </Box>
        </Box>
      </Modal>



      <Snackbar 
     open={snackbar.open}
     onClose={handleCloseSnackbar}
      autoHideDuration={6000}
      
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
  width: 400,
  bgcolor: 'black',
  border: '2px solid blue',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

const modalBackdropStyle = {
  backdropFilter: 'blur(5px)', // For blurring the background
  WebkitBackdropFilter: 'blur(5px)' // For Safari support
};

export default PurchaseTable;
