import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SpanCriticalPoints } from "../utils/criticalBMSF";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BMSFChartsProps {
  criticalPoints: SpanCriticalPoints[];
}

export default function BMSFCharts({ criticalPoints }: BMSFChartsProps) {
  // Combine all critical points from all spans
  const allPoints = criticalPoints.flatMap((span) => span.criticalPoints);

  // Sort points by position to ensure correct order
  const sortedPoints = allPoints.sort((a, b) => a.position - b.position);

  const chartData = {
    labels: sortedPoints.map((point) => point.position.toFixed(2)),
    datasets: [
      {
        label: "Shear Force (kN)",
        data: sortedPoints.map((point) => point.shearForce),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const bmChartData = {
    labels: sortedPoints.map((point) => point.position.toFixed(2)),
    datasets: [
      {
        label: "Bending Moment (kNm)",
        data: sortedPoints.map((point) => point.bendingMoment),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Position (m)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Force (kN)",
        },
      },
    },
  };

  const bmOptions = {
    ...options,
    scales: {
      ...options.scales,
      y: {
        title: {
          display: true,
          text: "Moment (kNm)",
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Shear Force Diagram</h3>
        <div className="bg-secondary p-4 rounded-lg">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Bending Moment Diagram</h3>
        <div className="bg-secondary p-4 rounded-lg">
          <Line data={bmChartData} options={bmOptions} />
        </div>
      </div>
    </div>
  );
}
