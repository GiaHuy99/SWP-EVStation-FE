import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { getBatteryById } from '../BatteryThunk';
import { clearSelectedBattery } from '../BatterySlice';
import {
    DetailCard,
    Title,
    DetailItem,
    DetailValue,
    DetailLabel,
    StatusChip,
} from '../styles/batteryStyles';

import   {Battery}  from '../types/Battery';

interface BatteryDetailProps {
    id: number;
}

const BatteryDetail: React.FC<BatteryDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedBattery, loading, error } = useAppSelector(
        (state) => state.battery
    );

    useEffect(() => {
        if (id) dispatch(getBatteryById(id));
        return () => {
            dispatch(clearSelectedBattery());
        };
    }, [id, dispatch]);

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );

    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedBattery) return <Typography sx={{ p: 2 }}>Không tìm thấy dữ liệu.</Typography>;

    return (
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

            {/*<DetailItem>*/}
            {/*    <DetailLabel>Battery Model:</DetailLabel>*/}
            {/*    <DetailValue>{selectedBattery.batteryName}</DetailValue>*/}
            {/*</DetailItem>*/}

            {/*<DetailItem>*/}
            {/*    <DetailLabel>Current Capacity:</DetailLabel>*/}
            {/*    <DetailValue>{selectedBattery.currentCapacity.toFixed(2)} Ah</DetailValue>*/}
            {/*</DetailItem>*/}

            {/*<DetailItem>*/}
            {/*    <DetailLabel>State of Health:</DetailLabel>*/}
            {/*    <DetailValue>{selectedBattery.stateOfHealth.toFixed(1)} %</DetailValue>*/}
            {/*</DetailItem>*/}
        </DetailCard>
    );
};

export default BatteryDetail;
