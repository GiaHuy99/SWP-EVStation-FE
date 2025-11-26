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

import  axiosInstance  from '../../../shared/utils/AxiosInstance'; // thêm để lấy điểm uy tín

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    LinearProgress,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import Battery90Icon from '@mui/icons-material/Battery90';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery30Icon from '@mui/icons-material/Battery30';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ReputationResponse {
    currentReputation: number;
    maxReputation: number;
    cancelledCount: number;
    canReserve: boolean;
    message: string;
}

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
        error,
    } = useSelector((state: RootState) => state.reservation);

    const [reputation, setReputation] = React.useState<ReputationResponse | null>(null);
    const [loadingRep, setLoadingRep] = React.useState(true);

    // Load dữ liệu cơ bản
    useEffect(() => {
        dispatch(loadStations());
        dispatch(loadBatterySerials());
        dispatch(loadUserVehicles());
    }, [dispatch]);

    // Load điểm uy tín
    useEffect(() => {
        const fetchRep = async () => {
            try {
                const res = await axiosInstance.get('/api/user/reputation');
                setReputation(res.data);
            } catch (err) {
                console.error('Lỗi load uy tín');
            } finally {
                setLoadingRep(false);
            }
        };
        fetchRep();
    }, []);

    // Countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => dispatch(decrementCountdown()), 60000);
            return () => clearInterval(timer);
        }
    }, [countdown, dispatch]);

    const batteriesAtStation = useMemo(() => {
        if (!selectedStationId) return [];
        return availableBatteries
            .filter(b => b.stationId === selectedStationId && b.status === 'AVAILABLE')
            .sort((a, b) => b.chargePercent - a.chargePercent); // ưu tiên pin đầy trước
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

    const getBatteryIcon = (percent: number) => {
        if (percent >= 90) return <BatteryFullIcon sx={{ color: '#22c55e' }} />;
        if (percent >= 60) return <Battery90Icon sx={{ color: '#22c55e' }} />;
        if (percent >= 30) return <Battery60Icon sx={{ color: '#f59e0b' }} />;
        return <Battery30Icon sx={{ color: '#ef4444' }} />;
    };

    // Loading ban đầu
    if (loading || loadingRep) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" py={10}>
                <CircularProgress size={60} thickness={5} color="success" />
                <Typography variant="h6" mt={3} color="text.secondary">
                    Đang tải trạm và pin...
                </Typography>
            </Box>
        );
    }

    // Thành công
    if (reservation) {
        return (
            <Box textAlign="center" py={10} px={3}>
                <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#22c55e' }} />
                <Typography variant="h4" fontWeight="bold" mt={4}>
                    Đặt pin thành công!
                </Typography>
                <Typography variant="h1" fontWeight={800} color="#dc2626" mt={3}>
                    {countdown} phút
                </Typography>
                <Typography variant="h6" mt={2}>
                    Mã đặt pin: <strong>#{reservation.reservationId}</strong>
                </Typography>
                <Typography variant="body1" mt={3} color="text.secondary">
                    Vui lòng đến trạm <strong>{reservation.station.name}</strong> trong vòng 60 phút
                </Typography>
            </Box>
        );
    }

    return (
        <Box maxWidth="lg" mx="auto" px={2} py={4}>
            {/* Điểm uy tín */}
            {reputation && (
                <Card sx={{ mb: 4, bgcolor: reputation.currentReputation < 4 ? '#fef2f2' : '#f0fdf4', border: '1px solid', borderColor: reputation.currentReputation < 4 ? '#fecaca' : '#bbf7d0' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            {reputation.currentReputation < 4 ? <WarningAmberIcon color="error" /> : <ElectricBoltIcon color="success" />}
                            <div>
                                <Typography fontWeight="bold">Điểm uy tín: {reputation.currentReputation}/{reputation.maxReputation}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {reputation.message || 'Hãy giữ lịch đúng giờ để tăng điểm!'}
                                </Typography>
                            </div>
                        </Box>
                        {!reputation.canReserve && (
                            <Chip label="Không thể đặt pin" color="error" />
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Form chính */}
            <Card elevation={3}>
                <CardContent sx={{ pt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
                        <ElectricBoltIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#22c55e' }} />
                        Đặt Pin Trước
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

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
                        <InputLabel>Trạm đổi pin</InputLabel>
                        <Select
                            value={selectedStationId || ''}
                            onChange={(e) => dispatch(setSelectedStation(e.target.value as number || null))}
                            label="Trạm đổi pin"
                        >
                            {stations.map(st => (
                                <MenuItem key={st.id} value={st.id}>
                                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: '#22c55e' }} />
                                    {st.name} • {batteriesAtStation.length} pin sẵn sàng
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Số lượng */}
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel>Số lượng pin</InputLabel>
                        <Select value={quantity} onChange={(e) => dispatch(setQuantity(e.target.value as number))} label="Số lượng pin">
                            {[1, 2, 3].map(n => <MenuItem key={n} value={n}>{n} pin</MenuItem>)}
                        </Select>
                    </FormControl>

                    {/* Danh sách pin */}
                    {selectedStationId && batteriesAtStation.length > 0 && (
                        <Box mb={4}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                                Chọn {quantity} pin • Đã chọn: {selectedBatteryIds.length}/{quantity}
                            </Typography>
                            <Grid container spacing={2}>
                                {batteriesAtStation.map(bat => {
                                    const selected = selectedBatteryIds.includes(bat.id);
                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={bat.id}>
                                            <Card
                                                onClick={() => dispatch(toggleBatterySelection(bat.id))}
                                                sx={{
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s',
                                                    border: selected ? '3px solid #22c55e' : '1px solid #e5e7eb',
                                                    bgcolor: selected ? '#ecfdf5' : '#fff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                                    {getBatteryIcon(bat.chargePercent)}
                                                    <Typography fontWeight="bold" fontSize="0.9rem" mt={1}>
                                                        {bat.serialNumber}
                                                    </Typography>
                                                    <Typography variant="h6" color="#22c55e" fontWeight="bold">
                                                        {bat.chargePercent}%
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        SOH: {bat.stateOfHealth}%
                                                    </Typography>
                                                    {selected && <Chip label="ĐÃ CHỌN" color="success" size="small" sx={{ mt: 1 }} />}
                                                </CardContent>
                                                {bat.chargePercent < 50 && (
                                                    <LinearProgress variant="determinate" value={bat.chargePercent} color="warning" />
                                                )}
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )}

                    {/* Nút đặt */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleReserve}
                        disabled={loading || !selectedStationId || selectedBatteryIds.length !== quantity || reputation?.canReserve === false}
                        sx={{
                            py: 2.5,
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            '&:hover': { background: 'linear-gradient(135deg, #16a34a, #15803d)' },
                            '&:disabled': { bgcolor: '#9ca3af' },
                        }}
                    >
                        {loading ? 'Đang đặt pin...' : 'ĐẶT PIN NGAY!'}
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PreReserveBattery;