import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';

// ✨ 1. Import các actions và thunks từ feature `Battery`
import { getBatteryById } from '../BatteryThunk';
import { clearSelectedBattery } from '../BatterySlice';

// ✨ 2. Import các styled components đã được đồng bộ
import {
    DetailCard,
    Title,
    DetailItem,
    DetailValue,
    DetailLabel,
    StatusChip, // Import StatusChip để hiển thị trạng thái
} from '../styles/batteryStyles'; // <-- Đảm bảo đường dẫn này đúng

// ✨ 3. Định nghĩa props cho component
interface BatteryDetailProps {
    id: number;
}

// ✨ 4. Component nhận `id` qua props, theo đúng form mẫu
const BatteryDetail: React.FC<BatteryDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();

    // Lấy state từ slice `battery`
    const { selectedBattery, loading, error } = useAppSelector(
        (state) => state.battery
    );

    // useEffect để fetch dữ liệu và cleanup, giữ nguyên logic
    useEffect(() => {
        if (id) {
            dispatch(getBatteryById(id));
        }
        return () => {
            dispatch(clearSelectedBattery());
        };
    }, [id, dispatch]);

    // Xử lý trạng thái loading
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Xử lý trạng thái error
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    // Xử lý khi không có dữ liệu
    if (!selectedBattery) {
        return <Typography sx={{ p: 2 }}>Không tìm thấy dữ liệu.</Typography>;
    }

    return (
        // ✨ 5. Render dữ liệu của `Battery` sử dụng các styled components
        // Nằm trong Dialog nên không cần PageContainer
        <DetailCard sx={{ boxShadow: 'none', border: 'none', p: 0, maxWidth: '100%' }}>
            <Title variant="h5">Battery Details</Title>

            <DetailItem>
                <DetailLabel>ID:</DetailLabel>
                <DetailValue>{selectedBattery.id}</DetailValue>
            </DetailItem>

            <DetailItem>
                <DetailLabel>Serial Number:</DetailLabel>
                <DetailValue>{selectedBattery.serialNumber}</DetailValue>
            </DetailItem>

            <DetailItem>
                <DetailLabel>Status:</DetailLabel>
                <StatusChip status={selectedBattery.status} label={selectedBattery.status} />
            </DetailItem>

            <DetailItem>
                <DetailLabel>Station:</DetailLabel>
                <DetailValue>{selectedBattery.stationName || 'N/A'}</DetailValue>
            </DetailItem>

            <DetailItem>
                <DetailLabel>Battery Model:</DetailLabel>
                <DetailValue>{selectedBattery.batteryName}</DetailValue>
            </DetailItem>

            <DetailItem>
                <DetailLabel>Current Capacity:</DetailLabel>
                <DetailValue>{selectedBattery.currentCapacity.toFixed(2)} Ah</DetailValue>
            </DetailItem>

            <DetailItem>
                <DetailLabel>State of Health:</DetailLabel>
                <DetailValue>{selectedBattery.stateOfHealth.toFixed(1)} %</DetailValue>
            </DetailItem>
        </DetailCard>
    );
};

export default BatteryDetail;