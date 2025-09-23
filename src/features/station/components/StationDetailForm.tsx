import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getStationById } from "../StationThunks";
import {
    PageContainer,
    DetailCard,
    Title,
    DetailItem, DetailValue,DetailLabel,
} from "../styles/CreateStationForm";
import { CircularProgress, Alert } from "@mui/material";

interface StationDetailProps {
    id: number;
}

const StationDetail: React.FC<StationDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedStation, loading, error } = useAppSelector(
        (state) => state.station
    );

    useEffect(() => {
        if (id) {
            dispatch(getStationById(id));
        }
    }, [id, dispatch]);
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    if (!selectedStation) {
        return <div>Không có dữ liệu chi tiết cho station này.</div>;
    }

    return (
        <PageContainer>
            <DetailCard>
                <Title variant="h5">{selectedStation.name}</Title>
                <DetailItem>
                    <DetailLabel>Location:</DetailLabel>
                    <DetailValue>{selectedStation.location}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Status:</DetailLabel>
                    <DetailValue>{selectedStation.status}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Capacity:</DetailLabel>
                    <DetailValue>{selectedStation.capacity}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>{selectedStation.phone}</DetailValue>
                </DetailItem>
            </DetailCard>
        </PageContainer>
    );
};

export default StationDetail;