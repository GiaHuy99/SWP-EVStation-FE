import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsService } from '../services/AnalyticsService';
import { BatteryStatusData } from '../types/AnalyticsTypes';

const COLORS: { [key: string]: string } = {
  AVAILABLE: '#22C55E',
  IN_USE: '#F59E0B',
  CHARGING: '#3B82F6',
  DAMAGED: '#EF4444',
};

const STATUS_LABELS: { [key: string]: string } = {
  AVAILABLE: 'Sẵn sàng',
  IN_USE: 'Đang sử dụng',
  CHARGING: 'Đang sạc',
  DAMAGED: 'Hỏng',
};

interface PieChartData extends BatteryStatusData {
  name: string;
}

const BatteryStatusChart: React.FC = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AnalyticsService.getBatteryStatusDistribution();
        // Transform data for pie chart with Vietnamese labels
        const transformedData: PieChartData[] = result.map((item) => ({
          ...item,
          name: STATUS_LABELS[item.status] || item.status,
        }));
        setData(transformedData);
      } catch {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry: any) => `${entry.name}: ${entry.count}`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.status] || '#8884D8'} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value} pin`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BatteryStatusChart;
