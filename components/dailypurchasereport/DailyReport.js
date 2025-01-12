// components/DailyInvoiceReport.js

import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PrintIcon from '@mui/icons-material/Print';
import {
  Box, Button,
  Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid
} from '@mui/material';
import SnapPOS from "@/components/nav/SnapPOS"
import FindInPageIcon from '@mui/icons-material/FindInPage';

const DailyPurchaseReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daily, setDaily] = useState(null);

 
  const tableRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Send dates to the server
    const response = await fetch(`${process.env.API}/user/dailypurchasereport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    });

    const data = await response.json();
    setDaily(data)

    console.log("Invoice data:", data); // Handle data on the frontend
  };




  // Function to print the table
  const printTable = () => {
    const printContent = tableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // Replace body content with the table content for printing
    document.body.innerHTML = printContent;
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContent;
  };





  return (

    <>

      <Box display="flex" alignItems="center" gap={2}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="MM/dd/yyyy"
          customInput={<input style={customInputStyle} />}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="MM/dd/yyyy"
          customInput={<input style={customInputStyle} />}
        />

        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} sm={8}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FindInPageIcon/>}
              onClick={handleSearch}
              sx={{
                p: 2,
                mt: 1,
                height: '100%',
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

    {

daily && (  
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
                Daily Purchase Report
              </h1>
              <SnapPOS />




              <Table





                hover style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',       // Optional: rounded corners for a softer look
                  overflow: 'hidden',        // Optional: in case of rounded corners, this keeps content within bounds
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
                }}  >
                <TableHead>
                  <TableRow>

                    <TableCell>S.No</TableCell>
                    <TableCell>Purchase No</TableCell>
                    <TableCell>Supplier Name</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Buying Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>

                    <TableCell>Buying Price</TableCell>




                  </TableRow>
                </TableHead>



                <TableBody>



                  {



                    daily && daily.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((purchase, index) => (
                      <TableRow key={purchase?._id}>

                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{purchase?.purchase_no}

                        </TableCell>
                        <TableCell>{purchase?.supplier_id?.name}</TableCell>
                        <TableCell>{purchase?.product_id?.productName}</TableCell>

                        <TableCell>{purchase?.buying_qty}</TableCell>
                        <TableCell>{purchase?.unit_price}</TableCell>
                        <TableCell>{purchase?.buying_price}</TableCell>


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



 )

    }

    </>


  );
};


const customInputStyle = {
  minWidth: '430px',
  height: '60px',
  borderColor: 'blue', // Border color
  borderWidth: '2px',
  borderStyle: 'solid',
  backgroundColor: 'black', // Background color
  color: 'white', // Text color
  padding: '5px', // Padding to ensure text doesn’t touch the borders
  outline: 'none'
};

export default DailyPurchaseReport;