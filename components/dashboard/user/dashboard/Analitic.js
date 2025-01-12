"use client";

import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CircularProgress,
  CardActionArea,
  CardContent,
  Switch,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Dashboard,
  Inventory,
  Add,
  ListAlt,
  Assessment,
  ShoppingCart,
  People,
  Settings,
  BarChart,
} from "@mui/icons-material";

import { motion } from "framer-motion";

// Background and styling
const BackgroundBox = styled(Box)({
  backgroundImage: 'url("/images/pos1.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  padding: "4rem 2rem",
  textAlign: "center",
  color: "#fff",
  overflow: "hidden",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  zIndex: 1,
});

const ContentBox = styled(Box)({
  position: "relative",
  zIndex: 2,
});

const Home = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API}/user/home`);

        const result = await response.json();

        setData(result);

        setLoading(false);
      } catch (error) {
        console.log(" failed to fetch data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pages = [
    { name: "Categories", icon: <Dashboard />, count: data?.categorycount },
    { name: "Customers", icon: <Inventory />, count: data?.customercount },
    { name: "Invoices", icon: <Add />, count: data?.invoicecount },
    {
      name: "Invoice Details",
      icon: <ListAlt />,
      count: data?.invoicedetailscount,
    },
    { name: "Payments", icon: <ShoppingCart />, count: data?.paymentcount },
    {
      name: "Payment Details",
      icon: <Assessment />,
      count: data?.paymentdetailscount,
    },
    { name: "Products", icon: <People />, count: data?.productcount },
    { name: "Purchases", icon: <Settings />, count: data?.purchasescount },
    {
      name: "Subscriptions",
      icon: <BarChart />,
      count: data?.subscriptioncount,
    },

    { name: "Suppliers", icon: <People />, count: data?.suppliercount },
    { name: "Units", icon: <Settings />, count: data?.unitcount },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Failed to load data
      </Typography>
    );
  }

  return (
    <BackgroundBox>
      <Overlay />
      <ContentBox>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Welcome to the Product Inventory System
              </Typography>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Typography
                variant="h6"
                color="inherit"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: "#d1d1d1",
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Manage your products, inventory, and orders efficiently with our
                intuitive dashboard.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        {/* Responsive Navigation Cards */}
        <Grid container spacing={4} justifyContent="center">
          {pages &&
            pages.map((page, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card
                    sx={{
                      minHeight: 180,
                      boxShadow: 5,
                      borderRadius: 2,
                      backgroundColor: "#000",
                      color: "#fff",
                      transition:
                        "transform 0.3s, background-color 0.3s, color 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        backgroundColor: "blue",
                        color: "#fff",
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{ textAlign: "center", padding: "1rem" }}
                      >
                        <Box sx={{ fontSize: 98, color: "greenyellow" }}>
                          {page.icon}
                        </Box>

                        <Box sx={{ fontSize: 30, color: "greenyellow" }}>
                          {`${page.count} `}
                        </Box>

                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {page.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </ContentBox>
    </BackgroundBox>
  );
};

export default Home;
