"use client"


import React, { useState, useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';


import {
  Box,


  Typography,

 
  Table,
 
  TableBody,
 
  TableCell,
  
  TableContainer,

  TableHead,

  TableRow,

  TablePagination,

  Paper,
 

} from '@mui/material';



import { fetchProducts } from '@/reduxslice/adminproductSlice';



import CircularProgress from '@mui/material/CircularProgress';

const ProductTable = () => {





  
  const dispatch = useDispatch();

 const { products, loading, error } = useSelector((state) => state.adminproducts);
 

  const [page, setPage] = useState(0);

  
  const [rowsPerPage, setRowsPerPage] = useState(5);

 useEffect(()=>{


 dispatch(fetchProducts())

 },[dispatch])


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
        Products
      </Typography>
     
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow style={{ borderBottom: "6px solid blue" }}>
              <TableCell>S.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Unit Name</TableCell>
              <TableCell>Category Name</TableCell>
          
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


                products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={product._id} style={{ borderBottom: "3px solid blue" }}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>{product?.supplierNameId?.name}</TableCell>
                  <TableCell>{product?.unitNameId?.name}</TableCell>
                  <TableCell>{product?.categoryNameId?.name}</TableCell>
               
                </TableRow>
              ))

            )}


          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ backgroundColor: "white" }}
      />

     
   
    </Box>
  );
};






export default ProductTable;
