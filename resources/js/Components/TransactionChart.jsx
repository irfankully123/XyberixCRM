import { useEffect, useRef, useState } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

const TransactionChart = () => {

  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  const months = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const [chartData, setChartData] = useState({
    labels: months,
    datasets: [
      {
        label: 'Transaction Data',
        data: [500, 750, 900, 1100, 950, 1200, 1400, 1600, 1800, 2000, 1700, 1500],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: 12,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        beginAtZero: true,
        max: 2000,
      },
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    renderChart(ctx);
    // Update data every 3 seconds (adjust the interval as needed)
    // setInterval(() => {
    //     generateData();
    //     updateChart();
    // }, 3000);
  }, []);

  const generateData = () => {
    const labels = [];
    const data = [];

    for (let i = 1; i <= 12; i++) {
      labels.push(months[i - 1]);
      data.push(getRandomSalesValue());
    }

    setChartData({
      ...chartData,
      labels: labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: data,
        },
      ],
    });
  };

  const getRandomSalesValue = () => {
    return Math.floor(Math.random() * 2000) + 500;
  };

  const renderChart = (ctx) => {
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
    const newChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
    setChart(newChart);
  };

  const updateChart = () => {
    if (chart) {
      chart.data = chartData;
      chart.update();
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <canvas id="transaction" ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionChart;
