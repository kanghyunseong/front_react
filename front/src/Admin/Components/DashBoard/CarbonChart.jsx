import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  PointElement, 
  LineElement, 
  Filler, 
  CategoryScale, 
  LinearScale, 
  Tooltip 
} from "chart.js";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

ChartJS.register(PointElement, LineElement, Filler, CategoryScale, LinearScale, Tooltip);

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  
  flex: 1; 
  min-width: 0; 

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const CarbonChart = () => {
  const { auth } = useContext(AuthContext);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchCarbonData = async () => {
      if (!auth || !auth.accessToken) return;
  
      try {
        const response = await axios.get(
          "http://localhost:8081/admin/api/settings/carbon", 
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        
        const data = response.data;   
  
        const labels = data.map(d => d.date);
        const values = data.map(d => d.savings);
  
        setChartData({ labels, values });
  
      } catch (err) {
        console.error("탄소 데이터 로딩 실패", err);
      }
    };
  
    fetchCarbonData();
  }, [auth]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "CO₂ Savings (kg)",
        data: chartData.values,
        borderColor: "#10B981", 
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)"); 
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.0)"); 
          return gradient;
        },
        tension: 0.4, 
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#10B981",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} kg 절감 (추정)`
        }
      }
    },
    scales: { 
      y: { 
        beginAtZero: true,
        grid: { borderDash: [5, 5], color: '#f0f0f0' },
        ticks: { font: { size: 10 }, color: '#999' }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: '#666' }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>Weekly Carbon Savings</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#10B981' }}>
            🌱 내연기관 대비 추정 절감량
          </p>
        </div>
        <div style={{ background: '#F0FDF4', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', color: '#15803D', fontWeight: 'bold' }}>
           Total: {chartData.values.reduce((a, b) => Number(a) + Number(b), 0).toFixed(0)} kg
        </div>
      </div>
      
      <div style={{ flex: 1, minHeight: "200px" }}>
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default CarbonChart;