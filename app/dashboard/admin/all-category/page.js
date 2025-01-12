"use client";

import React, { useEffect, useState } from "react";

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
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { fetchCategories } from "@/reduxslice/admincategorySlice";

import CircularProgress from "@mui/material/CircularProgress";

const CategoryTable = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.admincategories
  );

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        Categories
      </Typography>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Category Name</TableCell>
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
                categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "white",
        }}
      />
    </Box>
  );
};

export default CategoryTable;
