import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const ChartWidget = ({ type, data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Data',
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  switch (type) {
    case 'Bar Chart':
      return <Bar data={chartData} options={options} />;
    case 'Line Chart':
      return <Line data={chartData} options={options} />;
    case 'Pie Chart':
      return <Pie data={chartData} options={options} />;
    default:
      return <p>Unsupported chart type</p>;
  }
};

export default ChartWidget;
