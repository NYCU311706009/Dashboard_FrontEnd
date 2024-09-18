import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

function DistributionChart({ raw_data }) {
  function getDistributionByArea() {
    // arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)

    return raw_data.reduce((accumulator, { currentArea }) => {
      // curr 是accumulator裡iter的
      const existingArea = accumulator.find(
        (curr) => curr.currentArea === currentArea
      );
      if (existingArea) {
        existingArea.totalNum += 1;
      } else {
        accumulator.push({ currentArea, totalNum: 1 });
      }
      return accumulator;
    }, []);
  }

  const distribution = getDistributionByArea().sort((a, b) => {
    if (a.currentArea < b.currentArea) return -1;
    if (a.currentArea > b.currentArea) return 1;
    return 0;
  });

  // console.log(distribution)

  ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);
  const data = {
    labels: distribution.map((item) => item.currentArea),
    // labels: datasets.currentArea,
    datasets: [
      {
        label: "各區域人數",
        data: distribution.map((item) => item.totalNum),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "black",
        formatter: (value, context) => {
          return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
        },
        font: {
          weight: "bold",
          size: 14,
        },
        // center, start, end
        anchor: "end",
        // center, start, end,top, bottom
        align: "start",
        offset: 5,
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}
export default DistributionChart;
