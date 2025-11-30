import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ salesData, ordersData }) => {
    const chartRef = useRef(null);
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"];
    const currentMonth = new Date(Date.now()).getMonth();
    useEffect(() => {
        if (salesData && ordersData) {
            const chartConfig = {
                type: 'line',
                data: {
                    labels: months.filter((ele, index) => index - currentMonth < 3), // Replace with your actual data labels
                    datasets: [
                        {
                            label: 'Sales',
                            data: salesData, // Replace with your actual sales data
                            borderColor: 'rgb(189, 126, 190)', // Customize the line color
                            backgroundColor: 'rgb(189, 126, 190, 0.6)', // Customize the fill color
                            tension: 0.4, // Adjust the curve of the line
                        },
                        {
                            label: 'Orders',
                            data: ordersData, // Replace with your actual orders data
                            borderColor: 'rgb(255, 181, 90)', // Customize the line color
                            backgroundColor: 'rgb(255, 181, 90, 0.6)', // Customize the fill color
                            tension: 0.4, // Adjust the curve of the line
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio:false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Sales and Orders', // Replace with your chart title
                        },
                    },
                },
            };

            const chart = new Chart(chartRef.current, chartConfig);

            return () => {
                // Cleanup the chart instance
                chart.destroy();
            };
        }
    }, [salesData, ordersData]);

    return <canvas ref={chartRef}  width={'100%'}/>;
};


export default LineChart;