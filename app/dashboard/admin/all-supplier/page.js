"use client"


import CircularProgress from '@mui/material/CircularProgress';


import React, { useState, useEffect } from 'react';


import {
  Box,
 
 
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

} from '@mui/material';



import { useDispatch, useSelector } from 'react-redux';


import {
  fetchSuppliers,

} from '@/reduxslice/admibsupplierSlice';




const SupplierTable = () => {

  
  const dispatch = useDispatch();

 
 const { suppliers, loading, error } = useSelector(state => state.adminsuppliers)

 
  const [page, setPage] = useState(0);

 
  const [rowsPerPage, setRowsPerPage] = useState(5);

 
  useEffect(()=>{   

dispatch(fetchSuppliers())
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
        Suppliers
      </Typography>



      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            
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


                suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
                  <TableRow key={supplier._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                 
                  </TableRow>
                ))



              )


            }





          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={suppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
 
    </Box>
  );
};

export default SupplierTable;
