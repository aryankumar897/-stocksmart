"use client"

import DailyReport from '@/components/dailypurchasereport/DailyReport';


export default function Home() {
  return (
    <div>
      <h1
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
      >
        Daily Purchase Report
      </h1>

      <DailyReport/>
    </div>
  );
}