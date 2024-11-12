import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DoanhThu = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const data = {
    labels: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 
      'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 
      'Tháng 11', 'Tháng 12'
    ],
    datasets: [
      {
        label: 'Doanh thu',
        data: [3000, 2000, 4000, 5000, 6000, 7000, 8000, 7500, 9000, 10000, 11000, 12000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ Doanh thu theo Tháng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Button color="secondary" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Quay lại
      </Button>
      <h2>Doanh Thu</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DoanhThu;
