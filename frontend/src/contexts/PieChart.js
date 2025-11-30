import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, type }) => {
    const chartRef = useRef(null);
    useEffect(() => {
        if (data) {
            const { count, approved, not_approved, fulfilled, unfulfilled, partially_fulfilled } = data;
            let chartData;
            let chartLabels;
            let backgroundColor;
            let borderColor;

            if (type === 'Vendors') {
                chartData = [approved, not_approved];
                chartLabels = ['Approved', 'Not Approved'];
                backgroundColor = ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'];
            } else if (type === 'Products') {
                chartData = [approved, not_approved];
                chartLabels = ['Approved', 'Not Approved'];
                backgroundColor = ['rgba(251, 113, 133, 0.6)', 'rgb(167 139 250)'];
            } else if (type === 'Orders') {
                chartData = [fulfilled, unfulfilled, partially_fulfilled];
                chartLabels = ['Fulfilled', 'Unfulfilled', 'Partially Fulfilled'];
                backgroundColor = ['rgb(247, 165, 29,0.6)', 'rgb(221, 195, 110,0.6)', 'rgba(54, 162, 235,0.6)'];
                borderColor = ['rgb(247, 165, 29)', 'rgb(221, 195, 110)', 'rgba(54, 162, 235)']
            }
            // Check if all values in chartData are zero
            const allZero = chartData.every(value => value === 0);

            if (allZero || data == 'null') {
                chartData = [1e-10];
                // chartData = [1, 0, 0];
                backgroundColor = ['rgba(128, 128, 128, 0.6)'];
            }

            const chartConfig = {
                type: 'pie',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartData,
                            backgroundColor,
                            borderColor,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '',
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
    }, [data, type]);

    return <canvas ref={chartRef} width='100%' />;
};

export default PieChart;
