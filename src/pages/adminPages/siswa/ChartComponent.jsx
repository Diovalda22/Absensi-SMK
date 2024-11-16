import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Box, Typography } from '@mui/material';

Chart.register(...registerables);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Label bulan dalam satu semester
          datasets: [{
            label: 'Hadir',
            data: [20, 25, 30, 15, 22, 28],
            backgroundColor: 'transparent',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0 // Garis tidak melengkung
          }, {
            label: 'Telat',
            data: [5, 10, 15, 8, 7, 9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0 // Garis tidak melengkung
          }, {
            label: 'Ijin/Sakit',
            data: [8, 5, 10, 7, 6, 9],
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0 // Garis tidak melengkung
          }, {
            label: 'Alpha',
            data: [3, 4, 2, 6, 5, 7],
            backgroundColor: 'transparent',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0 // Garis tidak melengkung
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to stretch to fill the container
          scales: {
            y: {
              beginAtZero: true,
              max: 40 // Set maximum value of y-axis to 40
            },
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Cleanup chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); 

  return (
    <Box sx={{ width: '100%', height: 700, position: 'relative', display: {lg: 'block', xs: 'none'}}}>
      <Box
        className="wrapper"
        sx={{
          mt: 8,
          width: 'full',
          height: 700,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ px: 10, pt: 5, width: '95%', height: '80%', borderRadius: 3, boxShadow: "0px 12px 30px 9px #DDE9F9", mt: 8, bgcolor:'white' }}>
            <Typography sx={{ fontSize: '1.9rem', fontWeight: 'bold', color: '#373D3F' }}>Bagan 1 Semester Presensi</Typography>
            <Box sx={{height:'90%'}}>
            <canvas ref={chartRef} style={{
                width: '100%',
                height: '70%', // Mengurangi tinggi chart menjadi 70% dari container-nya
            }} />
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartComponent;
