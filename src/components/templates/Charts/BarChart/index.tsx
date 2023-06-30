import React, { ComponentProps } from "react";
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
import { useHooks } from "./hooks";
import { formatToPhp } from "@/lib/formatToPhp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type BarProps = ComponentProps<typeof Bar>;

export type BarChartProps = {
  data: number[];
  labels: string[];
};

export const BarChart = ({ data, labels }: BarChartProps) => {
  const { theme } = useHooks();

  const options: BarProps["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const dataOption: BarProps["data"] = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: data,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  return <Bar options={options} data={dataOption} />;
};
