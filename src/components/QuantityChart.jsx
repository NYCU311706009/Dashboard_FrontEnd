import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


function QuantityChart({ machines }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

  function getTotalQtyByDate(machines){
    
    const totalQtyByDate = {};
    machines.forEach(machine => {
        machine.records.forEach(record => {
            
            const {id, record_date, quantity} = record;
            if (totalQtyByDate[record_date]){
                totalQtyByDate[record_date] += quantity;
            } else{
                totalQtyByDate[record_date] = quantity;
            }

        })
    });
    
    // 轉換格式 從 {date: qty} => [date, qty] => {date: date, qty: qty}
    return Object.entries(totalQtyByDate).map(([record_date, quantity])=>({record_date, quantity}));
  }

  const totalQtyByDate = getTotalQtyByDate(machines);
//   console.log(totalQtyByDate);
  const data = {
    labels: totalQtyByDate.map((record) => record.record_date), // X 軸上的日期
    datasets: [
      {
        label: "Total Daily Production",
        data: totalQtyByDate.map((record) => record.quantity), // Y 軸上的每日總產量
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        
      },
    ],
  };

  const options = {
    maintainAspectRatio:false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    //   position: 'top'
    },
    title: {
      display: true,
      text: 'Daily Total Production for 100 Machines'
    },
    datalabels: {
        display: false
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 7, // 限制顯示date的數量不要太多
        autoSkip: true,    
        maxRotation: 45,   
        minRotation: 45    
      }
    },
    
  }
};



  return (
    <div style={{height:'300px',width:'300px'}}>
      <Line data={data} options={options} />
    </div>
  );
}
export default QuantityChart;
