import React from 'react';
import { Box, Typography } from '@mui/material';
import SwapHourChart from '../components/SwapHourChart';
import StationSwapsChart from '../components/StationSwapsChart';
import BatteryStatusChart from '../components/BatteryStatusChart';
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
          Xem tổng quan thống kê hệ thống quản lý đổi pin
        </Typography>
      </Box>

      {/* Hour Chart */}
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

      {/* Station Swaps Chart */}
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
            Số Lần Đổi Pin Theo Trạm
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Thống kê lượng đổi pin tại mỗi trạm sạc
          </Typography>
        </Box>
        <StationSwapsChart />
      </ListCard>

      {/* Battery Status Distribution Chart */}
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
            Phân Bổ Trạng Thái Pin
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Tổng số pin theo từng trạng thái trong hệ thống
          </Typography>
        </Box>
        <BatteryStatusChart />
      </ListCard>
    </Box>
  );
};

export default AnalyticsDashboardPage;
