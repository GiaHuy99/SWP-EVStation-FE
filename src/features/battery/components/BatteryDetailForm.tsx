import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getBatteryById } from "../BatteryThunk";
import {
    PageContainer,
    FormCard, // Thêm để wrap với border pastel
    Title,
    DetailItem,
    DetailValue,
    DetailLabel,
    DetailCard,
} from "../styles/CreateBatteryForm"; // Import đúng từ file styled chung
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
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Wrap DetailCard với viền xanh pastel */}
                <DetailCard> {/* Giữ DetailCard cho padding và shadow nội bộ */}
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
            </FormCard>
        </PageContainer>
    );
};

export default BatteryDetail;