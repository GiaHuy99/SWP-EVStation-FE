// File: src/features/batteryType/components/BatteryTypeDetail.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { Box, CircularProgress, Alert, Typography } from '@mui/material'; // Thêm Typography

// ✨ 1. Xóa `useNavigate` và `useParams`
// import { useNavigate, useParams } from 'react-router-dom';

import { getBatteryTypeById } from '../BatteryThunkType';
import { clearSelectedBatteryType } from '../BatterySliceType';

import {
    DetailCard,
    Title,
    DetailItem,
    DetailValue,
    DetailLabel,
} from '../styles/CreateBatteryForm';

// ✨ 2. Định nghĩa props cho component
interface BatteryTypeDetailProps {
    id: number;
}

// ✨ 3. Component nhận `id` qua props
const BatteryTypeDetail: React.FC<BatteryTypeDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    // const { id } = useParams<{ id: string }>(); // <-- Bỏ dòng này

    const { selectedBatteryType, loading, error } = useAppSelector(
        (state) => state.batteryType // <-- Đổi tên state cho đúng
    );

    useEffect(() => {
        if (id) {
            dispatch(getBatteryTypeById(id)); // <-- Dùng id từ props
        }
        return () => {
            dispatch(clearSelectedBatteryType());
        };
    }, [id, dispatch]); // <-- Phụ thuộc vào id từ props

    // ... (phần code hiển thị loading, error, và JSX giữ nguyên)
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!selectedBatteryType) {
        return <Typography>Không tìm thấy dữ liệu.</Typography>;
    }

    // Hàm định dạng ngày tháng (nếu cần)
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        // Không cần PageContainer vì đã nằm trong Dialog
        <DetailCard sx={{ boxShadow: 'none', border: 'none', p: 0 }}> {/* Bỏ style thừa */}
            <Title variant="h5">Battery Type Detail</Title>
            <DetailItem>
                <DetailLabel>ID:</DetailLabel>
                <DetailValue>{selectedBatteryType.id}</DetailValue>
            </DetailItem>
            <DetailItem>
                <DetailLabel>Model Name:</DetailLabel>
                <DetailValue>{selectedBatteryType.name}</DetailValue>
            </DetailItem>
            <DetailItem>
                <DetailLabel>Vehicle Type:</DetailLabel>
                <DetailValue>{selectedBatteryType.type}</DetailValue>
            </DetailItem>
            <DetailItem>
                <DetailLabel>Design Capacity:</DetailLabel>
                <DetailValue>{selectedBatteryType.designCapacity} Ah</DetailValue>
            </DetailItem>
            <DetailItem>
                <DetailLabel>Description:</DetailLabel>
                <DetailValue>{selectedBatteryType.description || 'N/A'}</DetailValue>
            </DetailItem>
            <DetailItem>
                <DetailLabel>Created At:</DetailLabel>
                <DetailValue>{formatDate(selectedBatteryType.createdAt)}</DetailValue>
            </DetailItem>
        </DetailCard>
    );
};

export default BatteryTypeDetail;