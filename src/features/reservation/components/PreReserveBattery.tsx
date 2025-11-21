// features/reservation/components/PreReserveBattery.tsx
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';
import {
    loadStations,
    loadBatterySerials,
    loadUserVehicles,
    submitReservation,
} from '../reservationThunk';
import {
    setSelectedStation,
    setSelectedVehicle,
    setQuantity,
    toggleBatterySelection,
    decrementCountdown,
} from '../reservationSlice';

import {
    PageContainer,
    FormCard,
    Title,
    FormRow,
    SingleRow,
    StyledTextField,
} from '../../link-subcription/styles/LinkVehicleFormStyles'; // adjust path theo bạn

import {
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PreReserveBattery = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        stations,
        availableBatteries,
        vehicles,
        selectedStationId,
        selectedVehicle,
        quantity,
        selectedBatteryIds,
        reservation,
        countdown,
        loading,
        loadingStations,
        loadingBatteries,
        loadingVehicles,
        error,
    } = useSelector((state: RootState) => state.reservation);

    useEffect(() => {
        dispatch(loadStations());
        dispatch(loadBatterySerials());
        dispatch(loadUserVehicles());
    }, [dispatch]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => dispatch(decrementCountdown()), 60000);
            return () => clearInterval(timer);
        }
    }, [countdown, dispatch]);

    const batteriesAtStation = useMemo(() => {
        if (!selectedStationId) return [];
        return availableBatteries.filter(b => b.stationId === selectedStationId);
    }, [availableBatteries, selectedStationId]);

    const handleReserve = () => {
        if (!selectedVehicle || !selectedStationId || selectedBatteryIds.length !== quantity) {
            alert('Vui lòng chọn đủ thông tin!');
            return;
        }
        dispatch(submitReservation({
            vehicleId: selectedVehicle.vehicleId,
            stationId: selectedStationId,
            quantity,
            batteryIds: selectedBatteryIds,
        }));
    };

    // Loading state
    if (loadingStations || loadingBatteries || loadingVehicles) {
        return (
            <PageContainer>
                <FormCard>
                    <Box display="flex" flexDirection="column" alignItems="center" py={8}>
                        <CircularProgress size={60} thickness={5} color="success" />
                        <Typography variant="h6" mt={3} color="text.secondary">
                            Đang tải trạm và pin...
                        </Typography>
                    </Box>
                </FormCard>
            </PageContainer>
        );
    }

    // Thành công
    if (reservation) {
        return (
            <PageContainer>
                <FormCard>
                    <Box textAlign="center" py={10}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#22c55e' }} />
                        <Title variant="h4" mt={4}>Đặt pin thành công!</Title>
                        <Typography variant="h1" fontWeight={800} color="#dc2626" mt={2}>
                            {countdown} phút
                        </Typography>
                        <Typography variant="h6" mt={2} color="text.secondary">
                            Mã đặt pin: <strong>#{reservation.reservationId}</strong>
                        </Typography>
                        <Typography variant="body1" mt={3} color="text.secondary">
                            Vui lòng đến trạm trong vòng 60 phút để đổi pin
                        </Typography>
                    </Box>
                </FormCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <FormCard>
                <Title variant="h4">
                    <ElectricBoltIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#22c55e' }} />
                    Đặt Pin Trước
                </Title>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Chọn xe */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Xe của bạn</InputLabel>
                    <Select
                        value={selectedVehicle?.vehicleId || ''}
                        onChange={(e) => {
                            const v = vehicles.find(v => v.vehicleId === e.target.value);
                            dispatch(setSelectedVehicle(v || null));
                        }}
                        label="Xe của bạn"
                    >
                        {vehicles.map(v => (
                            <MenuItem key={v.vehicleId} value={v.vehicleId}>
                                {v.vehicle} ({v.currentPlan})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Chọn trạm */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Chọn trạm đổi pin</InputLabel>
                    <Select
                        value={selectedStationId || ''}
                        onChange={(e) => dispatch(setSelectedStation(e.target.value as number || null))}
                        label="Chọn trạm đổi pin"
                    >
                        {stations.map(station => (
                            <MenuItem key={station.id} value={station.id}>
                                <LocationOnIcon fontSize="small" sx={{ mr: 1, color: '#22c55e' }} />
                                {station.name} ({availableBatteries.filter(b => b.stationId === station.id).length} pin)
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Số lượng pin */}
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel>Số lượng pin cần đặt</InputLabel>
                    <Select
                        value={quantity}
                        onChange={(e) => dispatch(setQuantity(e.target.value as number))}
                        label="Số lượng pin cần đặt"
                    >
                        {[1, 2, 3].map(n => (
                            <MenuItem key={n} value={n}>{n} pin</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Danh sách pin tại trạm */}
                {selectedStationId && batteriesAtStation.length > 0 && (
                    <Box mb={4}>
                        <Typography variant="subtitle1" fontWeight={600} mb={2}>
                            Chọn {quantity} pin • Đã chọn: {selectedBatteryIds.length}/{quantity}
                        </Typography>
                        <Grid container spacing={2}>
                            {batteriesAtStation.map(bat => (
                                <Grid item xs={6} sm={4} md={3} key={bat.id}>
                                    <Card
                                        onClick={() => dispatch(toggleBatterySelection(bat.id))}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            border: selectedBatteryIds.includes(bat.id)
                                                ? '3px solid #22c55e'
                                                : '2px solid #e5e7eb',
                                            bgcolor: selectedBatteryIds.includes(bat.id) ? '#ecfdf5' : '#fff',
                                            boxShadow: selectedBatteryIds.includes(bat.id) ? '0 4px 20px rgba(34,197,94,0.2)' : 'none',
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                            <Typography fontFamily="monospace" fontWeight="bold" fontSize="0.9rem">
                                                {bat.serialNumber}
                                            </Typography>
                                            <Typography variant="h5" color="#22c55e" fontWeight={800} mt={1}>
                                                100%
                                            </Typography>
                                            {bat.batteryName && (
                                                <Typography variant="caption">
                                            {bat.batteryName}
                                                </Typography>
                                                )}
                                            {selectedBatteryIds.includes(bat.id) && (
                                                <Chip label="ĐÃ CHỌN" color="success" size="small" sx={{ mt: 1 }} />
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                ))}
                        </Grid>
                    </Box>
                    )}

                {/* Nút đặt pin */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleReserve}
                    disabled={loading || !selectedStationId || selectedBatteryIds.length !== quantity}
                    sx={{
                        py: 2,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        '&:hover': { background: 'linear-gradient(135deg, #16a34a, #15803d)' },
                        '&:disabled': { bgcolor: '#9ca3af' },
                    }}
                >
                    {loading ? 'Đang đặt pin...' : 'ĐẶT PIN TRƯỚC NGAY!'}
                </Button>
            </FormCard>
        </PageContainer>
    );
};

export default PreReserveBattery;