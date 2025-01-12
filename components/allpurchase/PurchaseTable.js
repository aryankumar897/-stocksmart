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
  TablePagination,
  Paper,
  Modal,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import CheckIcon from "@mui/icons-material/Check";

import { useSelector, useDispatch } from "react-redux";
// Import the CircularProgress component from Material-UI for showing a loading spinner.
import CircularProgress from "@mui/material/CircularProgress";

import { fetchPurchases, deletePurchase } from "@/reduxslice/purchaseSlice";

const PurchaseTable = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { purchases, loading, error } = useSelector((state) => state.purchases);
 
 
 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log(" purchases", purchases);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchPurchases());
  }, [dispatch]);

  const handleOpenDeleteModal = (purchase) => {
    setSelectedPurchase(purchase);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeletePurchase = () => {
    dispatch(deletePurchase(selectedPurchase._id))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "product delete successfully",
          severity: "success",
        });

        handleCloseDeleteModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: ` Error ${error}`,
          severity: "error",
        });

        console.log("error", error);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handletoggleStatus = async (purchase) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/purchases/${purchase?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedPurchases = await response.json();

      if (response.ok) {
        dispatch(fetchPurchases());
        setSnackbar({
          open: true,
          message: "updated successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: `Error ${updatedPurchases?.message}`,
          severity: "error",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
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
        Purchases
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            sx={{
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
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
              purchases
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((purchase, index) => (
                  <TableRow key={purchase._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{purchase?.purchase_no}</TableCell>
                    <TableCell>{purchase?.date}</TableCell>
                    <TableCell>{purchase?.supplier_id?.name}</TableCell>
                    <TableCell>{purchase?.category_id?.name}</TableCell>
                    <TableCell>{purchase?.buying_qty}</TableCell>
                    <TableCell>{purchase?.product_id?.productName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={purchase.status ? "success" : "warning"}
                        onClick={() => handletoggleStatus(purchase)}
                        style={{
                          borderRadius: "20px",
                          padding: "5px 10px",
                          minWidth: "auto",
                          fontSize: "0.8rem",
                        }}
                      >
                        {purchase.status ? "acitve" : "pending"}
                      </Button>
                    </TableCell>

                    <TableCell>
                      {purchase.status ? (
                        <>
                          {" "}
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckIcon />} // Adds the check icon at the start of the button
                            style={{
                              borderRadius: "20px",
                              padding: "8px 16px",
                              fontSize: "0.9rem",
                            }}
                          ></Button>{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleOpenDeleteModal(purchase)}
                            style={{
                              borderRadius: "20px",
                              padding: "5px 10px",
                              minWidth: "auto",
                              fontSize: "0.8rem",
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPurchases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>
      {/* Delete Purchase Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-purchase-modal"
        aria-describedby="delete-purchase-modal-description"
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography id="delete-purchase-modal" variant="h6" component="h2">
            Delete Purchase
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this purchase?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseDeleteModal} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                ":hover": {
                  backgroundColor: "red",
                },
              }}
              variant="contained"
              onClick={handleDeletePurchase}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
          severity={snackbar.severity}
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
