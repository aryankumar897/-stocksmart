// pages/report.js
import { useState, useEffect,useRef } from 'react';
import {
  Grid, Select, FormControl,
  RadioGroup, FormControlLabel, Radio,
  Button,


  MenuItem, InputLabel,


} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import {
  Box, 
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';

import SnapPOS from "@/components/nav/SnapPOS"

export default function ReportPage() {
  const [selectedReport, setSelectedReport] = useState('supplier');
  const [supplierName, setSupplierName] = useState('');
  const [productName, setProductName] = useState('');
  const [data, setData] = useState(null);

  const tableRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);



  const [category, setCategory] = useState([])
  const [supplier, setSupplier] = useState([])
  useEffect(() => {
    fetchReport()

  }, []);



  const fetchReport = async () => {

    try {
      const response = await fetch(`${process.env.API}/user/sipplierproductwisereport`, {
        method: 'GET',

      });



      const report = await response.json();
      console.log("report", report.supplier);
      setCategory(report?.category)
      setSupplier(report?.supplier)

    } catch (error) {
      console.error('Error:', error);
    }

  };









  const handleReportChange = (event) => {

    console.log("handleReportChange", event.target.value)
    setSelectedReport(event.target.value);
    setData(null); // Reset data when report type changes
  };

  const handleSubmit = async () => {
    try {

      console.log({
        reportType: selectedReport,
        name: selectedReport === 'supplier' ? supplierName : productName,
      })

      const response = await fetch(`${process.env.API}/user/getReportData`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'

        },
        body: JSON.stringify({
          reportType: selectedReport,
          name: selectedReport === 'supplier' ? supplierName : productName,
        })
      });

       const data=await response.json()
      setData(data); // Display data received from server
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };





  const printTable = () => {
    const printContent = tableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();

    document.body.innerHTML = originalContent;
  };



 

  return (
    <>
      <h2
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

      >Supplier and Product Wise Report</h2>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={selectedReport}
          onChange={handleReportChange}
          name="reportType"
        >
          <FormControlLabel value="supplier" control={<Radio

            sx={{
              color: 'green',
              '&.Mui-checked': {
                color: 'green', // Change color when checked
              },
            }}

          />} label="Supplier Wise Report" />
          <FormControlLabel value="product" control={<Radio
            sx={{
              color: 'green',
              '&.Mui-checked': {
                color: 'green', // Change color when checked
              },
            }}
          />} label="Product Wise Report" />
        </RadioGroup>
      </FormControl>

      {selectedReport === 'supplier' && (


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Supplier Name</InputLabel>
            <Select
              label="Supplier Name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              fullWidth
              select
              margin="normal"
              sx={{
                mt: 3,
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
            >
              {supplier.map(supplier => (
                <MenuItem key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </MenuItem>
              ))}



            </Select>
          </FormControl>
        </Grid>







      )}

      {selectedReport === 'product' && (

        <>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">

              <InputLabel>Category Name</InputLabel>
              <Select
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}

                fullWidth
                select
                margin="normal"
                sx={{
                  mt: 3,
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'blue',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'blue',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'blue',
                  },
                  '.MuiSvgIcon-root ': {
                    fill: "white !important",
                  }
                }}
              >

                {category && category?.map((c) => (
                  <MenuItem


                    key={c._id} value={c._id}>
                    {c?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>




        </>
      )}


      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12}>

          <Button variant="contained"
            sx={{
              width: "100%",
              p: 3,
              backgroundColor: 'blue',
              ':hover': {
                backgroundColor: 'blue',
              },
              height: '100%',
            }}
            onClick={handleSubmit}>
            Search
          </Button>
        </Grid></Grid>
      {data && (
        <div ref={tableRef}    >
          <h2
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

          >Supplier and Product Wise Report</h2>

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



                data &&data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
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
          {

            data && <Grid container spacing={2} sx={{ mt: 2 }}>
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
               thanks
                </Button>
              </Grid>
            </Grid>
          }

        </div>
      )}




      {

        data && <Grid container spacing={2} sx={{ mt: 2 }}>
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
      }

    </>
  );
}