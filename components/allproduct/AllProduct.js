import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";

import { fetchUnits } from "@/reduxslice/unitSlice";
import { fetchCategories } from "@/reduxslice/categorySlice";

import { fetchSuppliers } from "@/reduxslice/supplierSlice";
import CircularProgress from "@mui/material/CircularProgress";
import {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "@/reduxslice/productSlice";
const ProductTable = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
 
 
 
  const { categories } = useSelector((state) => state.categories);
  const { units } = useSelector((state) => state.units);
  const { suppliers } = useSelector((state) => state.suppliers);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  console.log({ categories, units, suppliers });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",

    supplierNameId: "",
    unitNameId: "",
    categoryNameId: "",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({
    productName: "",

    supplierNameId: "",
    unitNameId: "",
    categoryNameId: "",
  });

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchProducts());
    dispatch(fetchSuppliers());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the current page state.
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update the rows per page state.
    setPage(0); // Reset to the first page.
  };
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const handleAddProduct = () => {
    console.log(newProduct);

    dispatch(addProduct({ ...newProduct }))
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Product added successfully",
          severity: "success",
        });

        handleCloseAddModal();
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `error ${error}`,
          severity: "error",
        });
      });
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(selectedProduct._id))
      .unwrap()
      .then(() => {
        handleCloseDeleteModal();

        dispatch(fetchProducts());

        setSnackbar({
          open: true,
          message: "Producted deleted successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `ERROR ${error}`,
          severity: "error",
        });
      });
  };

  const handleOpenEditModal = (product) => {
    setEditProduct({ ...product });
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };



   const  handleEditProduct=()=>{

dispatch(updateProduct({...editProduct}))
.unwrap()
.then(()=>{
  setSnackbar({open:true, message:"Producted edited successfully"   , severity:"success"})
  dispatch(fetchProducts());
  handleCloseEditModal()
})
.catch(()=>{ 

  setSnackbar({open:true, message:`Error  ${error}`   , severity:"error"})



})

   }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
        style={{
          fontSize: "3rem",
          color: "#0073e6",
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          borderBottom: "2px solid #0073e6",
          letterSpacing: "1px",
        }}
      >
        Products
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
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
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddModal}
            sx={{
              backgroundColor: "blue",
              ":hover": {
                backgroundColor: "blue",
              },
              height: "100%",
            }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow style={{ borderBottom: "6px solid blue" }}>
              <TableCell>S.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Unit Name</TableCell>
              <TableCell>Category Name</TableCell>
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
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow
                    key={product._id}
                    style={{ borderBottom: "3px solid blue" }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{product?.productName}</TableCell>
                    <TableCell>{product?.supplierNameId?.name}</TableCell>
                    <TableCell>{product?.unitNameId?.name}</TableCell>
                    <TableCell>{product?.categoryNameId?.name}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenEditModal(product)}
                        style={{ color: "blue" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(product)}
                        style={{ color: "blue" }}
                      >
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ backgroundColor: "white" }}
      /> */}

      {/*  start Add Product Modal */}
      <Modal
        sx={modalBackdropStyle}
        open={openAddModal}
        onClose={handleCloseAddModal}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Add Product
          </Typography>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Supplier Name</InputLabel>
            <Select
              value={newProduct.supplierNameId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, supplierNameId: e.target.value })
              }
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
              {suppliers &&
                suppliers?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Unit Name</InputLabel>
            <Select
              value={newProduct.unitNameId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unitNameId: e.target.value })
              }
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
              {units &&
                units?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category Name</InputLabel>
            <Select
              value={newProduct.categoryNameId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryNameId: e.target.value })
              }
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
              {categories &&
                categories?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddProduct}
            sx={{
              backgroundColor: "blue",
              ":hover": {
                backgroundColor: "blue",
              },
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>

      {/*  end  add Product Modal */}

      {/*  start Edit Product Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Edit Product
          </Typography>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={editProduct.productName}
            onChange={(e) =>
              setEditProduct({ ...editProduct, productName: e.target.value })
            }
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Supplier Name</InputLabel>
            <Select
              value={editProduct.supplierNameId._id}
              onChange={(e) => {
                const selectedSupplier = suppliers.find(
                  (supplier) => supplier._id === e.target.value
                );
                setEditProduct({
                  ...editProduct,
                  supplierNameId: selectedSupplier,
                });
              }}
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
                ".MuiSelect-select": {
                  color: "white", // Change the color of the selected value
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "black",
                    ".MuiMenuItem-root": {
                      color: "white",
                    },
                  },
                },
              }}
            >
              {suppliers &&
                suppliers?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Unit Name</InputLabel>
            <Select
              value={editProduct.unitNameId._id}
              onChange={(e) => {
                const selectedUnit = units.find(
                  (unit) => unit._id === e.target.value
                );
                setEditProduct({ ...editProduct, unitNameId: selectedUnit });
              }}
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
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "black",
                    ".MuiMenuItem-root": {
                      color: "white",
                    },
                  },
                },
              }}
            >
              {units &&
                units?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category Name</InputLabel>
            <Select
              value={editProduct.categoryNameId?._id}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (category) => category._id === e.target.value
                );
                setEditProduct({
                  ...editProduct,
                  categoryNameId: selectedCategory,
                });
              }}
              sx={{
                mt: 3,
                color: "white !important",
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
                  color: "white !important",
                },
              }}
            >
              {categories &&
                categories?.map((name, index) => (
                  <MenuItem key={index} value={name._id}>
                    {name.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "blue",
              ":hover": {
                backgroundColor: "blue",
              },
            }}
            onClick={handleEditProduct}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/*  end Edit Product Modal */}

      {/*start    Delete Product Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        sx={modalBackdropStyle}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Delete Product
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to delete{"  "}
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "red",
              ":hover": {
                color: "white",
                backgroundColor: "red",
              },
            }}
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </Box>
      </Modal>
      {/* end  Delete Product Modal */}

      {/* Snackbar for notifications */}

      <Snackbar
        autoHideDuration={6000}
        open={snackbar.open}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
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
export default ProductTable;
