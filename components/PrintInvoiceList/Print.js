import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Modal,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";

import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const PurchaseTable = ({ search }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [invoice, setInvoice] = useState([]);

  const [invoiceDetails, setInvoiceDetails] = useState([]);

  const [payment, setPayment] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: " ",
    severity: "success",
  });

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/user/invoicedetails/${search}`
      );

      const details = await response.json();

      const { invoice, invoicedetails, payment, paymentDetails } = details;

      setInvoice(invoice);
      setInvoiceDetails(invoicedetails);
      setPayment(payment);
      setPaymentDetails(paymentDetails);
    } catch (error) {
      console.log("error fetching invoice", error);
    }
  };

  const subtotal =
    invoiceDetails &&
    invoiceDetails?.reduce((acc, item) => acc + item.selling_price, 0);




    
  const handleApprove = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/invoiceapprove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceDetails }),
      });

      const result = await response.json();

      if (result.success) {
        setSnackbar({
          open: true,
          message: "Invoice  approved successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: ` Error ${result.message}`,
          severity: "error",
        });
      }
    } catch (error) {
      console.log("error approving invoice", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
        style={{
          fontSize: "3rem",
          color: "#0073e6", // A nice blue color
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          padding: "10px",
          borderBottom: "2px solid #0073e6", // Underline effect
          letterSpacing: "1px",
        }}
      >
        Print Invoice List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              p: 1,
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

      <Box>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Invoice No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoice &&
                invoice
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
                        const matchingPayment = Array.isArray(payment)
                          ? payment.find(
                              (payment) =>
                                payment?.invoice_id?.toString() ===
                                invoice?._id?.toString()
                            )
                          : null;

                        console.log(
                          "Array.isArray(payments)",
                          Array.isArray(payment)
                        );
                        console.log("matchingPayment", matchingPayment);

                        return (
                          <>
                            <TableCell>
                              {matchingPayment
                                ? matchingPayment?.customer_id?.name
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              {matchingPayment
                                ? matchingPayment?.total_amount
                                : "N/A"}
                            </TableCell>
                          </>
                        );
                      })()}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer
          component={Paper}
          sx={{ overflowX: "auto", my: "25px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Current Stock</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceDetails &&
                invoiceDetails.map((details, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {details?.category_id?.name}
                    </TableCell>
                    <TableCell align="center">
                      {details?.product_id?.productName}
                    </TableCell>
                    <TableCell align="center">
                      {details?.product_id?.quantity}
                    </TableCell>
                    <TableCell align="center">{details?.selling_qty}</TableCell>
                    <TableCell align="center">{details?.unit_price}</TableCell>
                    <TableCell align="center">
                      {details?.selling_price}
                    </TableCell>
                  </TableRow>
                ))}

              {/* Subtotal row */}
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="right"
                  style={{ fontWeight: "bold" }}
                >
                  Subtotal
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  $ {subtotal}
                </TableCell>
              </TableRow>

              {payment &&
                payment.map((invoice) => (
                  <React.Fragment key={invoice._id}>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="right"
                        style={{ fontWeight: "bold" }}
                      >
                        Discount
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        ${invoice?.discount_amount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="right"
                        style={{ fontWeight: "bold" }}
                      >
                        Paid Amount
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        ${invoice?.paid_amount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="right"
                        style={{ fontWeight: "bold" }}
                      >
                        Due Amount
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        ${invoice?.due_amount}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="right"
                        style={{ fontWeight: "bold" }}
                      >
                        Grand Amount
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        ${invoice?.total_amount}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}

              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Button
                    onClick={handleApprove}
                    variant="contained"
                    color="primary"
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid blue",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const modalBackdropStyle = {
  backdropFilter: "blur(5px)", // For blurring the background
  WebkitBackdropFilter: "blur(5px)", // For Safari support
};

export default PurchaseTable;
