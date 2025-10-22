import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getVehicleById } from "../VehicleMockThunks";
import { Vehicle, VehicleState } from "../types/VehicleMockType";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    CircularProgress,
    Alert,
    styled
} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import PaletteIcon from '@mui/icons-material/Palette';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
}));

const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
    },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => ({
    fontWeight: 'bold',
    backgroundColor: status === 'ACTIVE' ? '#E8F5E9' : '#FFEBEE',
    color: status === 'ACTIVE' ? '#2E7D32' : '#C62828',
}));

const BatteryIndicator = styled(Box)<{ percentage: number }>(({ percentage }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .MuiTypography-root': {
        color: percentage > 20 ? '#2E7D32' : '#C62828',
        fontWeight: 'bold',
    },
    '& .MuiSvgIcon-root': {
        color: percentage > 20 ? '#2E7D32' : '#C62828',
    },
}));

interface VehicleDetailProps {
    id: number;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { loading, error, selectedVehicle: vehicle } = useAppSelector((state: { vehicle: VehicleState }) => state.vehicle);

    useEffect(() => {
        if (id) {
            dispatch(getVehicleById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!vehicle) return <div>Không tìm thấy thông tin phương tiện</div>;

    return (
        <Box sx={{ p: 3 }}>
            <StyledCard>
                <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4">
                            {vehicle.manufacturer} {vehicle.model}
                        </Typography>
                        <StatusChip
                            label={vehicle.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                            status={vehicle.status}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <DetailItem>
                            <BadgeIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Biển số xe
                                </Typography>
                                <Typography variant="h6">
                                    {vehicle.licensePlate}
                                </Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <BatteryChargingFullIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Trạng thái pin
                                </Typography>
                                <BatteryIndicator percentage={vehicle.batteryPercentage}>
                                    <Typography variant="h6">
                                        {vehicle.batteryPercentage}%
                                    </Typography>
                                </BatteryIndicator>
                            </Box>
                        </DetailItem>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                                <DetailItem>
                                    <DirectionsCarIcon />
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            Thông tin xe
                                        </Typography>
                                        <Typography variant="body1">
                                            {vehicle.manufacturer} - {vehicle.model}
                                        </Typography>
                                    </Box>
                                </DetailItem>
                            </Box>

                            <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                                <DetailItem>
                                    <CalendarTodayIcon />
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            Năm sản xuất
                                        </Typography>
                                        <Typography variant="body1">
                                            {vehicle.year}
                                        </Typography>
                                    </Box>
                                </DetailItem>
                            </Box>

                            <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                                <DetailItem>
                                    <PaletteIcon />
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            Màu sắc
                                        </Typography>
                                        <Typography variant="body1">
                                            {vehicle.color}
                                        </Typography>
                                    </Box>
                                </DetailItem>
                            </Box>

                            <Box sx={{ flex: '1 1 45%', minWidth: '250px' }}>
                                <DetailItem>
                                    <SpeedIcon />
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            Số km đã chạy
                                        </Typography>
                                        <Typography variant="body1">
                                            {vehicle.mileage.toLocaleString()} km
                                        </Typography>
                                    </Box>
                                </DetailItem>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default VehicleDetail;