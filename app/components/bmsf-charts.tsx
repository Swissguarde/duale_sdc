import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpanCriticalPoints } from "../utils/criticalBMSF";

interface BMSFChartsProps {
  criticalPoints: SpanCriticalPoints[];
}

export default function BMSFCharts({ criticalPoints }: BMSFChartsProps) {
  // Combine all critical points from all spans
  const allPoints = criticalPoints.flatMap((span) => span.criticalPoints);

  // Sort points by position to ensure correct order
  const sortedPoints = allPoints.sort((a, b) => a.position - b.position);

  // Transform data for Recharts
  const chartData = sortedPoints.map((point) => ({
    position: point.position,
    shearForce: point.shearForce,
    bendingMoment: point.bendingMoment,
  }));

  // Extract unique positions for XAxis ticks
  const uniquePositions = Array.from(
    new Set(chartData.map((item) => item.position))
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Shear Force Diagram</h3>
        <div className="bg-secondary p-4 rounded-lg h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="position"
                type="number"
                ticks={uniquePositions}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: "Position (m)",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Force (kN)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -45,
                }}
              />
              <Tooltip />
              <Area
                type="linear"
                dataKey="shearForce"
                stroke="rgb(53, 162, 235)"
                fill="rgba(53, 162, 235, 0.5)"
                fillOpacity={0.5}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Bending Moment Diagram</h3>
        <div className="bg-secondary p-4 rounded-lg h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="position"
                type="number"
                ticks={uniquePositions}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: "Position (m)",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Moment (kNm)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -45,
                }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bendingMoment"
                stroke="rgb(255, 99, 132)"
                fill="rgba(255, 99, 132, 0.5)"
                fillOpacity={0.5}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
