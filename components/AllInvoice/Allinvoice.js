"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";

import { Add, Delete } from "@mui/icons-material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "@/reduxslice/categorySlice";
import { fetchProducts } from "@/reduxslice/productSlice";
import { fetchCustomers } from "@/reduxslice/customerSlice";

import { addInvoice } from "@/reduxslice/invoiceSlice";

import InvoiceTable  from  "./invoiceTable"





const AddInvoice = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { categories: category } = useSelector((state) => state.categories);
  const { products: product } = useSelector((state) => state.products);
  const { customers: customer } = useSelector((state) => state.customers);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [stock, setStock] = useState("");

  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [status, setStatus] = useState("");
  const [partialAmount, setPartialAmount] = useState(0);
  const [description, setDescription] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState();
 const [snackbar,setSnackbar]=useState({
open:false,
message:"",
severity:"success"

 })
  const [newRowData, setNewRowData] = useState({
    quantity: "",
    unitPrice: "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const handleOpen = () => setOpen(true);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    const fetchProductsByCategory = async (productId) => {
      try {
        const response = await fetch(
          `${process.env.API}/user/productid/${productId}`
        );

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("  error fetching products", error);
      }
    };

    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setGrandTotal(calculateGrandTotal());
  }, [discount, rows]);

  const calculateGrandTotal = () => {
    const totalWithoutDiscout = rows.reduce(
      (total, row) => total + (parseFloat(row.totalPrice) || 0),
      0
    );

    const discountAmount = parseFloat(discount) || 0;

    const grandTotal = totalWithoutDiscout - discountAmount;
    return grandTotal > 0 ? grandTotal : 0;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductChange = async (e) => {
    setSelectedProduct(e.target.value);

    try {
      const response = await fetch(
        `${process.env.API}/user/productstack/${e.target.value}`
      );

      const data = await response.json();
      setStock(data?.quantity);
    } catch (error) {
      console.log("error fetching  ", error);
    }
  };
  const handleModalChange = (e) => {
    setNewRowData({ ...newRowData, [e.target.name]: e.target.value });
  };

  const handleChange = (e, id, field) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: e.target.value };
        if (field === "quantity" || field === "unitPrice") {
          const quantity = parseFloat(updatedRow.quantity) || 0;
          const unitPrice = parseFloat(updatedRow.unitPrice) || 0;

          updatedRow.totalPrice = quantity * unitPrice;
        }

        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      startn: startDate,
      category: selectedCategory,
      productName: selectedProduct,
      quantity: newRowData.quantity,
      unitPrice: newRowData.unitPrice,
      totalPrice:
        (parseFloat(newRowData.quantity) || 0) *
        (parseFloat(newRowData.unitPrice) || 0),
    };

    setRows((prevRows) => [...prevRows, newRow]);
    setNewRowData({
      quantity: "",
      unitPrice: "",
    });

    setSelectedCategory("");
    setSelectedProduct("");

    setStartDate("");

    handleCloseModal();
  };

  const handleDeleteRow = (id) => {
    setRowToDelete(id);
    setConfirmationOpen(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete));
    setConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setConfirmationOpen(false);
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);

    if (selectedStatus !== "partial_paid") {
      setPartialAmount("");
    }
  };

  const handlePartialAmountChange = (event) => {
    setPartialAmount(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
    if (event.target.value !== "new_customer") setName("");
    setEmail("");
    setPhone("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const purchaseData = rows.map((row) => ({
      id: row.id,
      selectedCategory: row.category,
      selectedProduct: row.productName,
      startDate: row.startn.toISOString(),
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      totalPrice: row.totalPrice,
    }));

    const hasEmptyFields = purchaseData.some(
      (data) =>
        !data.selectedCategory ||
        !data.selectedProduct ||
        !data.startDate ||
        !data.quantity ||
        !data.unitPrice ||
        !data.totalPrice
    );

    if (hasEmptyFields) {
      return;
    }

    const payload = {
      date: rows[0].startn.toISOString(),
      grandTotal,
      partialAmount,
      selectedCustomer,
      name,
      email,
      phone,
      discount,
      description,
      purchaseData,
      status,
    };

 dispatch(addInvoice(payload))
 .unwrap()
 .then(()=>{
setSnackbar({open:true, message:"invoice added successfully",severity:"success"})

   handleCloseModal()
 })
.catch((error)=>{
  setSnackbar({open:true, message:`error ${error}`,severity:"error"})

 console.log("error", error)

})


  };



   const handleCloseSnackbar=()=>{

    setSnackbar({...snackbar,open:false})
   }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h5"
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
        Add Invoice
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{
              p: 1,
              backgroundColor: "blue",
              ":hover": {
                backgroundColor: "blue",
              },
              height: "100%",
            }}
          >
            Add More
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Product Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                PSC/KG
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Unit Price
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Total Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={
                      category &&
                      category.find((cat) => cat?._id === row.category)?.name
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={
                      product &&
                      product.find((cat) => cat?._id === row.productName)
                        ?.productName
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={row.quantity}
                    onChange={(e) => handleChange(e, row.id, "quantity")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={row.unitPrice}
                    onChange={() => handleChange(e, row.id, "unitPrice")}
                  />
                </TableCell>

                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(row.id)}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="h6">Discount</Typography>
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  type="number"
                  sx={{ mr: 2 }}
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="h6">Grand Total:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{grandTotal.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Grid container spacing={2} item xs={12} sm={6} sx={{ my: 5, m: 1 }}>
          <TextField
            fullWidth
            label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Box sx={{ m: 1 }}>
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: 300 }}>
            <InputLabel id="paid-status-label">Paid Status</InputLabel>
            <Select
              labelId="paid-status-label"
              id="paid_status"
              label="Paid Status"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="full_paid">Full Paid</MenuItem>
              <MenuItem value="full_due">Full Due</MenuItem>
              <MenuItem value="partial_paid">Partial Paid</MenuItem>
            </Select>
          </FormControl>

          {/* start Conditionally render input field when 'Partial Paid' is selected */}

          {status === "partial_paid" && (
            <TextField
              fullWidth
              variant="outlined"
              label="Enter Partial Payment Amount"
              value={partialAmount}
              onChange={handlePartialAmountChange}
              sx={{ maxWidth: 300, ml: 1 }}
            />
          )}
          {/*end Conditionally render input field when 'Partial Paid' is selected */}
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "raw", alignItems: "center" }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ maxWidth: 500, m: 1 }}
          >
            <InputLabel id="customer-label">Customer Name</InputLabel>
            <Select
              labelId="customer-label"
              id="customer"
              label="Customer Name"
              value={selectedCustomer}
              onChange={handleCustomerChange}
            >
              <MenuItem value="">Select Customer</MenuItem>

              {customer.map((cust) => (
                <MenuItem key={cust._id} value={cust._id}>
                  {cust.name}
                </MenuItem>
              ))}

              <MenuItem value="new_customer">New Customer</MenuItem>
            </Select>
          </FormControl>

          {/*start Conditionally render new customer form when "New Customer" is selected */}

          {selectedCustomer === "new_customer" && (
            <Box component="form" sx={{ maxWidth: 500, width: "100%", mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                New Customer Information
              </Typography>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          )}

          {/* end  Conditionally render new customer form when "New Customer" is selected */}
        </Box>
      </TableContainer>
      <Button
        fullWidth
        variant="contained"
        onClick={handleFormSubmit}
        sx={{
          p: 1,
          backgroundColor: "blue",
          ":hover": {
            backgroundColor: "darkblue",
          },
        }}
      >
        Invoice Store
      </Button>

<InvoiceTable/>
      {/* Modal for adding new row */}
      <Modal open={open} onClose={handleCloseModal} sx={modalBackdropStyle}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Row
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                  sx={{
                    mt: 3,
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                >
                  {category.map((c) => (
                    <MenuItem key={c?._id} value={c?._id}>
                      {c?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Product Name</InputLabel>
                <Select
                  name="productName"
                  label="Product Name"
                  value={selectedProduct}
                  onChange={handleProductChange}
                  sx={{
                    mt: 3,
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "blue",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                >
                  {products.map((p) => (
                    <MenuItem key={p._id} value={p._id}>
                      {p.productName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="stock"
                name="quantity"
                value={stock}
                type="number"
                InputLabelProps={{
                  style: { color: "white" },
                }}
                sx={{
                  mt: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Unit Price"
                name="unitPrice"
                type="number"
                value={newRowData.unitPrice}
                onChange={handleModalChange}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                sx={{
                  mt: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Select Date:</label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                customInput={<input style={customInputStyle} />}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleCloseModal}
              sx={{
                mr: 2,
                backgroundColor: "red",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "blue",
                ":hover": { backgroundColor: "blue" },
              }}
              onClick={handleAddRow}
            >
              Add Row
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for confirming deletion */}
      <Modal
        open={confirmationOpen}
        onClose={cancelDelete}
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Confirm Deletion
          </Typography>
          <Typography>Are you sure you want to delete this item?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button sx={{ mr: 2 }} onClick={cancelDelete}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar


open={snackbar.open}

onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        sx={{ width: "100%" }}>
        
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
  width: 800,
  bgcolor: "#000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const modalBackdropStyle = {
  backdropFilter: "blur(3px)",
};
// Inline styles
const customInputStyle = {
  minWidth: "730px",
  height: "60px",
  borderColor: "blue", // Border color
  borderWidth: "2px",
  borderStyle: "solid",
  backgroundColor: "black", // Background color
  color: "white", // Text color
  padding: "5px", // Padding to ensure text doesn’t touch the borders
  outline: "none",
};

export default AddInvoice;
