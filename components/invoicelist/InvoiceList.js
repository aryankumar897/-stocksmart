import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Modal, Snackbar, Alert, Grid
} from '@mui/material';

import PrintIcon from '@mui/icons-material/Print';

import { Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';


import CircularProgress from '@mui/material/CircularProgress';

import {

  fetchInvoices,

  deleteInvoice

} from '@/reduxslice/invoiceSlice';

import { useRouter } from 'next/navigation'

const PurchaseTable = () => {
  const dispatch = useDispatch();
 

 const  router=useRouter()

  const {invoices,loading, error}=useSelector((state)=>state.invoices)

 const [payments,setPayments]=useState([])
 const  [filter,setFilter]=useState("")



 useEffect(()=>{
 dispatch(fetchInvoices())

 },[dispatch])



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  



 useEffect(()=>{
 fetchPayment()
 },[invoices])




   const  fetchPayment=async()=>{

 try {
    
 const  response=await  fetch(`${process.env.API}/user/payment`)

 const  allpayment=await response.json()
 setPayments(allpayment)


 } catch (error) {
     console.log("error",  error)
 }




   }


 const handleFilterChange=(e)=>{
    setFilter(e.target.value)
 }



  const  filteredInvoice=invoices.filter((invoice)=>invoice?.invoice_no?.toLowerCase().includes(filter.toLowerCase()))


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
        Invoice-List


      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
        
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
              <TableCell>Purchase No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>


             
              <TableCell>Print</TableCell>


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
                  <TableCell>{invoice?.invoice_no}

                  </TableCell>
                  <TableCell>{new Date(invoice?.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice?.description}</TableCell>



                  {/* Find the matching payment for this invoice */}
              
                  
                  
                  {(() => {
                    const matchingPayment = Array.isArray(payments)
                      ? payments.find(payment => payment?.invoice_id?.toString() === invoice?._id?.toString())
                      : null;

                    return (
                      <>
                        <TableCell>{matchingPayment ? matchingPayment?.customer_id?.name : "N/A"}</TableCell>
                        <TableCell>${matchingPayment ? matchingPayment?.total_amount : "N/A"}</TableCell>
                      </>
                    );
                  })()}   
                     
                     
                  









         



                  <TableCell>






                    {/* /dashboard/admin/print-invoice-list */}

                    <Button
                      variant="outlined"

                      startIcon={<PrintIcon/>}
                      onClick={()=> router.push(`/dashboard/user/invoice-list-pdf?invoiceid=${invoice?._id}`)}

                      style={{
                        m: 5,
                        borderRadius: '20px',
                        padding: '5px 10px',
                        minWidth: 'auto',
                        fontSize: '0.8rem',
                      }}
                    >

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
   

      <Snackbar
     
       autoHideDuration={6000} 
       
       >
        <Alert 
        
         sx={{ width: '100%' }}
         >
 message
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
