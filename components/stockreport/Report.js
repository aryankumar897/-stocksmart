// components/DailyInvoiceReport.js

import { useState, useEffect, useRef } from 'react';


import PrintIcon from '@mui/icons-material/Print';
import {
  Box, Button,
 Table, TableBody, TableCell, TableHead, TableRow, Grid
} from '@mui/material';

import SnapPOS from "@/components/nav/SnapPOS"

const DailyInvoiceReport = () => {

  const [stockreport, setStockReport] = useState([]);

  const tableRef=useRef()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 





  useEffect(() => {
    fetchReport()

  }, [stockreport]);



  const fetchReport = async () => {



    try {
      const response = await fetch(`${process.env.API}/user/stockreport`, {
        method: 'GET',

      });



      const stockreport = await response.json();
      console.log("stockreport", stockreport);
      setStockReport(stockreport);


    } catch (error) {
      console.error('Error:', error);
    }

  };



 const  printTable=()=>{
     const printContent=tableRef.current.innerHTML


   const originalContent= document.body.innerHTML

   document.body.innerHTML=printContent
    window.print()
      document.body.innerHTML=originalContent


 }




  return (

    <>

   
      <Box

        ref={tableRef}
      >
        <h1
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
          Stock Report
        </h1>

        <SnapPOS />
        <Table





          style={{
            backgroundColor: 'white',
            borderRadius: '8px',       // Optional: rounded corners for a softer look
            overflow: 'hidden',        // Optional: in case of rounded corners, this keeps content within bounds
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
          }}  >
          <TableHead>
            <TableRow>

              <TableCell>S.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Stock</TableCell>
           
        






            </TableRow>
          </TableHead>



          <TableBody>



            {



              stockreport && stockreport.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={product?._id}>

                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product?.productName}

                  </TableCell>
                  <TableCell>{product?.categoryNameId?.name}</TableCell>
                  <TableCell>{product?.quantity}</TableCell>















                  <TableCell>















                  </TableCell>

                </TableRow>


              ))

            }





          </TableBody>


        </Table>



        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PrintIcon />}

              sx={{
                p: 3,
                backgroundColor: 'blue',
                ':hover': {
                  backgroundColor: 'blue',
                },
                height: '100%',
              }}
            >
              Thyanks
            </Button>
          </Grid>
        </Grid>

      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PrintIcon />}
       onClick={printTable}
            sx={{
              p: 3,
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
              height: '100%',
            }}
          >
            Print
          </Button>
        </Grid>
      </Grid>

    </>


  );
};




export default DailyInvoiceReport;