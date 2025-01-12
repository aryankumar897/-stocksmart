"use client"


// components/LatestTransactions.js
import React from 'react';
import { Table, TableBody, TableCell,
   TableContainer, TableHead, TableRow,
    Paper, Box, Typography,
     useMediaQuery } from '@mui/material';
import { green, orange } from '@mui/material/colors';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';

const transactions = [
  { name: 'Charles Casey', position: 'Web Developer', status: 'Active', age: 23, startDate: '04 Apr, 2021', salary: '$42,450', statusColor: green[500] },
  { name: 'Alex Adams', position: 'Python Developer', status: 'Deactivate', age: 28, startDate: '01 Aug, 2021', salary: '$25,060', statusColor: orange[500] },
  { name: 'Prezy Kelsey', position: 'Senior Javascript Developer', status: 'Active', age: 35, startDate: '15 Jun, 2021', salary: '$59,350', statusColor: green[500] },
  { name: 'Ruhi Fancher', position: 'React Developer', status: 'Active', age: 25, startDate: '01 March, 2021', salary: '$23,700', statusColor: green[500] },
];

const LatestTransactions = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', mb: 2 }}>
      <Table sx={{ minWidth: 250 }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
            {!isSmallScreen && <TableCell><Typography variant="subtitle1" fontWeight="bold">Position</Typography></TableCell>}
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Status</Typography></TableCell>
            {!isSmallScreen && <TableCell><Typography variant="subtitle1" fontWeight="bold">Age</Typography></TableCell>}
            {!isSmallScreen && <TableCell><Typography variant="subtitle1" fontWeight="bold">Start date</Typography></TableCell>}
            <TableCell><Typography variant="subtitle1" fontWeight="bold">Salary</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions&& transactions.map((transaction, index) => (
            <TableRow
              key={index}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">{transaction.name}</Typography>
                </Box>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2">{transaction.position}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CircleIcon style={{ color: transaction.statusColor, marginRight: 8 }} />
                  <Typography variant="body2">{transaction.status}</Typography>
                </Box>
              </TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2">{transaction.age}</Typography>
                </TableCell>
              )}
              {!isSmallScreen && (
                <TableCell>
                  <Typography variant="body2">{transaction.startDate}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="body2">{transaction.salary}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestTransactions;
