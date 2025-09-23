import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getBatteryById } from "../BatteryThunk";
import {
    PageContainer,
    DetailCard,
    Title,
    DetailItem,
    DetailValue,
    DetailLabel,
} from "../styles/CreateBatteryForm";
import { CircularProgress, Alert } from "@mui/material";

interface BatteryDetailProps {
    id: number;
}

const BatteryDetail: React.FC<BatteryDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedBattery, loading, error } = useAppSelector(
        (state) => state.battery
    );

    useEffect(() => {
        if (id) {
            dispatch(getBatteryById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedBattery) {
        return <div>Không có dữ liệu chi tiết cho battery này.</div>;
    }

    return (
        <PageContainer>
            <DetailCard>
                <Title variant="h5">Battery Detail</Title>
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
                    <DetailValue>{selectedBattery.status}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Swap Count:</DetailLabel>
                    <DetailValue>{selectedBattery.swapCount}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Station ID:</DetailLabel>
                    <DetailValue>{selectedBattery.stationId}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Station Name:</DetailLabel>
                    <DetailValue>{selectedBattery.stationName}</DetailValue>
                </DetailItem>
            </DetailCard>
        </PageContainer>
    );
};

export default BatteryDetail;
