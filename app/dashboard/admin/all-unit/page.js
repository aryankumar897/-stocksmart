
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



import { fetchUnits, } from '@/reduxslice/adminunitSlice';





const UnitTable = () => {



  
  const dispatch = useDispatch();

  
  const { units, loading, error } = useSelector((state) => state.units);

 
  const [page, setPage] = useState(0);

  
  const [rowsPerPage, setRowsPerPage] = useState(5);

  

  useEffect(()=>{

    dispatch(fetchUnits())
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
     
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Unit Name</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {units.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((unit, index) => (
              <TableRow key={unit._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{unit.name}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={units.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
   
    </Box>
  );
};


export default UnitTable;