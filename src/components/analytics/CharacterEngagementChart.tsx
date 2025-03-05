
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CharacterEngagement } from "@/hooks/use-analytics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface CharacterEngagementChartProps {
  data: CharacterEngagement[];
  isLoading: boolean;
  error: string | null;
}

export const CharacterEngagementChart = ({ 
  data, 
  isLoading, 
  error 
}: CharacterEngagementChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const preparedData = data.map(char => ({
        name: char.name,
        generations: char.totalGenerations,
        unlocks: char.totalUnlocks
      }));
      setChartData(preparedData);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading chart data
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={60} 
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="generations" name="Total Generations" fill="#553D8A" />
        <Bar dataKey="unlocks" name="Total Unlocks" fill="#E879F9" />
      </BarChart>
    </ResponsiveContainer>
  );
};
