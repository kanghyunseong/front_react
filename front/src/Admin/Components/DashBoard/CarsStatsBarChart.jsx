import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { ChartContainer, ChartTitle } from "./CarsStatsBarChart.styles";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CarsStatsBarChart = () => {
  const { auth } = useContext(AuthContext);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth || !auth.accessToken) return;
      try {
        const response = await axios.get(
          "http://localhost:8081/admin/api/settings/daily-stats", 
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        
        const data = response.data; 

        if (!data || data.length === 0) {
           setChartData({ labels: ["데이터 없음"], datasets: [] });
           return;
        }

        setChartData({
          labels: data.map(d => d.date),
          datasets: [
            {
              label: "예약 건수",
              data: data.map(d => d.count),
              backgroundColor: data.map((_, i) => 
                i === data.length - 1 ? "#6B4CE6" : "rgba(107, 76, 230, 0.5)"
              ),
              borderRadius: 4,
              barThickness: 20, // 막대 두께도 조금 줄임 (공간 확보)
            },
          ],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🚀 이게 있어야 부모 div 높이에 딱 맞춤
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { size: 10 } }, // 글자 크기도 살짝 줄임
        grid: { borderDash: [5, 5], display: true } 
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  if (loading) return <div style={{padding:'20px', fontSize:'12px'}}>Loading...</div>;

  return (
    <ChartContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <ChartTitle style={{ fontSize: '16px', margin: 0 }}>📊 최근 7일 예약</ChartTitle>
      </div>
      
      <div style={{ height: "180px", width: "100%" }}>
        <Bar options={options} data={chartData} />
      </div>
    </ChartContainer>
  );
};

export default CarsStatsBarChart;