
"use client"
import React, { useState, useEffect } from 'react';
import {
  Box, Button,  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Modal, Snackbar, Alert, Grid
} from '@mui/material';


import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import {

  fetchPurchases,



} from '@/reduxslice/adminpurchaseSlice';


const PurchaseTable = () => {
  const dispatch = useDispatch();

  const { purchases, loading, error } = useSelector((state) => state.adminpruchases);
 


 useEffect(()=>{
 dispatch(fetchPurchases())
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
        Purchases

      </Typography>
     
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>

              <TableCell>S.No</TableCell>
              <TableCell>Purchase No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Status</TableCell>
           
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




                purchases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((purchase, index) => (


                <TableRow key={purchase._id}>


                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{purchase?.purchase_no}

                  </TableCell>
                  <TableCell>{purchase?.date}</TableCell>
                  <TableCell>{purchase?.supplier_id?.name}</TableCell>
                  <TableCell>{purchase?.category_id?.name}</TableCell>
                  <TableCell>{purchase?.buying_qty}</TableCell>
                  <TableCell>{purchase?.product_id?.productName}</TableCell>
                  <TableCell>








                    <Button
                      variant="contained"
                      color={purchase.status ? "success" : "warning"}
                   
                      style={{
                        borderRadius: '20px',
                        padding: '5px 10px',
                        minWidth: 'auto',
                        fontSize: '0.8rem',
                      }}
                    >

                      {purchase.status ? "acitve" : "pending"}
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
          count={purchases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
 
    
    </Box>
  );
};

export default PurchaseTable;
