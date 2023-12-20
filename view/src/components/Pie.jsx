import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the components
ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const options = {
    plugins: {
        datalabels: {
            color: '#fff',
            formatter: (value, context) => {
                return value + ` %`;
            },
            // Additional styling or configuration...
        }
    },
    // ... other options
};

const TimePieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.categoryName),
        datasets: [{
            data: data.map(item => item.percentage),
            backgroundColor: [
                '#FF6384', // Red
                '#36A2EB', // Blue
                '#FFCE56', // Yellow
                // Add more colors if you have more categories
            ],
        }]
    };

    return <Pie data={chartData} options={options} />;
}

export default TimePieChart;
