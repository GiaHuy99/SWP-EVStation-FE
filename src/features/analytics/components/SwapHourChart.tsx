import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { AnalyticsService } from '../services/AnalyticsService';
import { SwapHourData } from '../types/AnalyticsTypes';

const SwapHourChart: React.FC = () => {
  const [data, setData] = useState<SwapHourData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AnalyticsService.getMostFrequentSwapHour();
        // Format data to ensure hour is displayed as "Giờ X"
        const formattedData = (response || []).map((item: SwapHourData) => ({
          ...item,
          hourLabel: `${String(item.hour).padStart(2, '0')}:00`,
        }));
        setData(formattedData);
        setError(null);
      } catch (err) {
        setError('Không thể tải dữ liệu thống kê');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress sx={{ color: '#4C428C' }} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data || data.length === 0) {
    return <Alert severity="info">Chưa có dữ liệu thống kê</Alert>;
  }

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hourLabel" 
            label={{ value: 'Giờ trong ngày', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis 
            label={{ value: 'Số lần đổi pin', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}
            formatter={(value: any) => [value, 'Số lần đổi']}
            labelFormatter={(label: string | number) => `${label}`}
            />
          <Legend />
          <Bar dataKey="count" name="Số lần đổi pin" fill="#4C428C" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SwapHourChart;
