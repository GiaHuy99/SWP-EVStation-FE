// src/features/station/components/StationDetail.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getStationById } from "../StationThunks";
import {
    Box,
    CircularProgress,
    Alert,
    Typography,
    Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import PublicIcon from "@mui/icons-material/Public";
import {
    DetailCard,
    DetailItem,
    DetailLabel,
    DetailValue,
    Title,
} from "../styles/CreateStationForm";

interface StationDetailProps {
    id: number;
}

const StationDetail: React.FC<StationDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedStation, loading, error } = useAppSelector(
        (state) => state.station
    );

    useEffect(() => {
        if (id) dispatch(getStationById(id));
    }, [id, dispatch]);

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                gap={2}
            >
                <CircularProgress size={48} thickness={4} />
                <Typography variant="body2" color="text.secondary">
                    Đang tải thông tin...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!selectedStation) {
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
                <Alert severity="info">
                    Không tìm thấy thông tin trạm. Vui lòng thử lại.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DetailCard>
                <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Title variant="h4" sx={{ mb: 3 }}>
                        {selectedStation.name}
                    </Title>

                    <Divider sx={{ mb: 3 }} />

                    {/* Location */}
                    <DetailItem>
                        <LocationOnIcon />
                        <Box>
                            <DetailLabel>Địa chỉ</DetailLabel>
                            <DetailValue>{selectedStation.location}</DetailValue>
                        </Box>
                    </DetailItem>

                    {/* Capacity + Phone */}
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        <DetailItem>
                            <InventoryIcon />
                            <Box>
                                <DetailLabel>Sức chứa</DetailLabel>
                                <DetailValue>{selectedStation.capacity} vị trí</DetailValue>
                            </Box>
                        </DetailItem>
                        <DetailItem>
                            <PhoneIcon />
                            <Box>
                                <DetailLabel>Số điện thoại</DetailLabel>
                                <DetailValue>{selectedStation.phone}</DetailValue>
                            </Box>
                        </DetailItem>
                    </Box>

                    {/* GPS Coordinates */}
                    <Box sx={{ mt: 3 }}>
                        <DetailItem>
                            <PublicIcon />
                            <Box>
                                <DetailLabel>Tọa độ GPS</DetailLabel>
                                <Box sx={{ display: "flex", gap: 2, mt: 0.5, flexWrap: "wrap" }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            bgcolor: "grey.100",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontFamily: "monospace",
                                        }}
                                    >
                                        Lat: {selectedStation.latitude.toFixed(6)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            bgcolor: "grey.100",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontFamily: "monospace",
                                        }}
                                    >
                                        Lng: {selectedStation.longitude.toFixed(6)}
                                    </Typography>
                                </Box>
                            </Box>
                        </DetailItem>
                    </Box>
                </Box>
            </DetailCard>
        </Box>
    );
};

export default StationDetail;