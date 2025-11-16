import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SwapHourChart from '../components/SwapHourChart';
import { ListCard } from '../../../styles/AdminDashboardStyles';

const AnalyticsDashboardPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Title */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Bảng Thống Kê Phân Tích
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
          Xem thống kê giờ đổi pin nhiều nhất trong ngày
        </Typography>
      </Box>

      {/* Chart Card */}
      <ListCard>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#4C428C',
              fontSize: '1.125rem',
            }}
          >
            Giờ Đổi Pin Nhiều Nhất
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Thống kê số lần đổi pin theo từng giờ trong ngày
          </Typography>
        </Box>
        <SwapHourChart />
      </ListCard>
    </Box>
  );
};

export default AnalyticsDashboardPage;
