// components/DailyInvoiceReport.js

import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
const DailyInvoiceReport = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [daily, setDaily] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tableRef = useRef();
  const [payments, setPayments] = useState([]);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.API}/user/dailyinvoicereport`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            startDate,
            endDate,
          }),
        }
      );

      const data = await response.json();

      setDaily(data);
    } catch (error) {
      console.log("error  feting  invoice report", error);
    }
  };

  useEffect(() => {
    fetchpayment();
  }, [daily]);

  const fetchpayment = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/payment`);

      const allpayment = await response.json();

      console.log("allpayment fetching error", allpayment);
      setPayments(allpayment);
    } catch (error) {
      console.log("error fetching payment", error);
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
              startIcon={<ContentPasteSearchIcon />}
              onClick={handleSearch}
              sx={{
                p: 2,
                mt: 1,
                height: "100%",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box ref={tableRef}>
        <Table
          style={{
            backgroundColor: "white",
            borderRadius: "8px", // Optional: rounded corners for a softer look
            overflow: "hidden", // Optional: in case of rounded corners, this keeps content within bounds
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow for depth
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Purchase No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {daily &&
              daily
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice, index) => (
                  <TableRow key={invoice?._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{invoice?.invoice_no}</TableCell>
                    <TableCell>
                      {new Date(invoice?.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{invoice?.description}</TableCell>

                    {/* Find the matching payment for this invoice */}
                    {(() => {
                      const matchingPayment = Array.isArray(payments)
                        ? payments.find(
                            (payment) =>
                              payment?.invoice_id?.toString() ===
                              invoice?._id?.toString()
                          )
                        : null;

                      return (
                        <>
                          <TableCell>
                            {matchingPayment
                              ? matchingPayment?.customer_id?.name
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            $
                            {matchingPayment
                              ? matchingPayment?.total_amount
                              : "N/A"}
                          </TableCell>
                        </>
                      );
                    })()}

                    <TableCell></TableCell>
                  </TableRow>
                ))}
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
                backgroundColor: "blue",
                ":hover": {
                  backgroundColor: "blue",
                },
                height: "100%",
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
              backgroundColor: "blue",
              ":hover": {
                backgroundColor: "blue",
              },
              height: "100%",
            }}
          >
            Print
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const customInputStyle = {
  minWidth: "430px",
  height: "60px",
  borderColor: "blue", // Border color
  borderWidth: "2px",
  borderStyle: "solid",
  backgroundColor: "black", // Background color
  color: "white", // Text color
  padding: "5px", // Padding to ensure text doesn’t touch the borders
  outline: "none",
};

export default DailyInvoiceReport;
