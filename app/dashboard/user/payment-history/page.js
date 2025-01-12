
"use client"
import React, { useEffect, useState } from 'react';

const Orders = () => {
 const  [orders,setOrders]=useState([])

 const [loading,setLoading]=useState(true)

 const [error,setError]=useState(null)



 useEffect(()=>{

 fetchOrders()


 },[])





 const   fetchOrders=async()=>{


 try {
    
 const  response= await  fetch(`${process.env.API}/user/orders`)

 if(!response.ok){

 setLoading(false)
     throw new Error("error fetching orders")


 }
 const  data= await  response.json()
  setOrders(data)
  setLoading(false)

 } catch (error) {
    console.log(error) 
    setLoading(false)
    setError(error)
 }




 }






  if (loading) {
    return (
      <p
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2196F3', // Blue color for loading
          textAlign: 'center',
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#e3f2fd', // Light blue background for loading
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        LOADING orders ...
      </p>
    );
  }

  if (error) {
    return (
      <p
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#d32f2f', // Red color for error
          textAlign: 'center',
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#ffebee', // Light red background for error
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        ERROR: {error}
      </p>
    );
  }




  return (
    <div style={{ padding: '10px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
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
      
      >Your Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>No orders found.</p>
      ) : (
        // Add responsive container with horizontal scrollbar
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: 'blue', color: '#fff' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Order ID</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Payment Method</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Payment Status</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Transaction ID</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Total Price</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '16px', whiteSpace: 'nowrap' }}>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders&&   orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.3s ease', cursor: 'pointer' }}>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap',color:"black" }}>{order._id}</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>{order.orderStatus}</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>{order.paymentMethod}</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>{order.paymentStatus}</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>{order.transactionId.substring(0, 10)}...</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>${order.totalPrice}</td>
                  <td style={{ padding: '20px', fontSize: '14px', whiteSpace: 'nowrap', color: "black" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>





  );
};

export default Orders;