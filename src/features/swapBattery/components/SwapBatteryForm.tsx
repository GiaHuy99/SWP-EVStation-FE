// src/features/swapBattery/components/SwapBatteryForm.tsx
import React, { useEffect, useState } from "react";
import {
    CircularProgress,
    Alert,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    swapBattery,
    getAllVehicles,
    getAllStations,
} from "../SwapThunks";
import { clearSwapResult } from "../SwapSlice";

import { RootState } from "../../../app/Store";
import { VehicleDetail, StationDetail, Battery } from "../types/SwapBatteryType";

import {
    PageContainer,
    FormCard,
    Title,
    FormBox,
    FullWidthBox,
} from "../Style/Styles"; // Hoặc đường dẫn của bạn

const SwapBatteryForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        swapLoading: loading,
        swapResult: result,
        swapError: error,
        vehicles,
        vehiclesLoading,
        stations,
        stationsLoading,
    } = useAppSelector((state: RootState) => state.swapBattery);

    // Form state - chỉ còn 3 trường theo API mới
    const [form, setForm] = useState({
        vehicleId: "",
        batterySerialId: "",
        stationId: "",
    });

    // Danh sách pin của xe được chọn
    const [selectedVehicleBatteries, setSelectedVehicleBatteries] = useState<Battery[]>([]);

    // Tải dữ liệu khi mount
    useEffect(() => {
        dispatch(getAllVehicles());
        dispatch(getAllStations());
    }, [dispatch]);

    // Dọn dẹp khi rời trang
    useEffect(() => {
        return () => {
            dispatch(clearSwapResult());
        };
    }, [dispatch]);

    // Xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        if (!name) return;

        setForm(prev => ({ ...prev, [name]: value as string }));

        // Khi chọn xe → load pin của xe đó
        if (name === "vehicleId" && value) {
            const selectedVehicle = vehicles.find(v => v.id === Number(value));
            setSelectedVehicleBatteries(selectedVehicle?.batteries || []);
            setForm(prev => ({ ...prev, batterySerialId: "" })); // Reset pin
        }
    };

    // Submit đổi pin
    const handleSubmit = () => {
        const { vehicleId, batterySerialId, stationId } = form;

        if (!vehicleId || !batterySerialId || !stationId) {
            return;
        }

        const payload = {
            vehicleId: Number(vehicleId),
            batterySerialId: Number(batterySerialId),
            stationId: Number(stationId),
        };

        dispatch(swapBattery(payload));
    };

    const isFormValid = form.vehicleId && form.batterySerialId && form.stationId;

    return (
        <PageContainer>
            <FormCard>
                <Title>
                    <CheckCircleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Thực Hiện Đổi Pin
                </Title>

                <FormBox gap={3}>

                    {/* 1. Chọn Xe */}
                    <FormControl fullWidth>
                        <InputLabel>Chọn Xe Cần Đổi Pin</InputLabel>
                        <Select
                            name="vehicleId"
                            value={form.vehicleId}
                            label="Chọn Xe Cần Đổi Pin"
                            onChange={handleChange}
                            disabled={vehiclesLoading}
                        >
                            {vehiclesLoading && (
                                <MenuItem disabled><em>Đang tải xe...</em></MenuItem>
                            )}
                            {vehicles.map((vehicle: VehicleDetail) => (
                                <MenuItem key={vehicle.id} value={vehicle.id}>
                                    {vehicle.vehicleName}
                                    {vehicle.currentPlan && ` (Gói: ${vehicle.currentPlan})`}
                                </MenuItem>
                            ))}
                        </Select>
                        {vehicles.length === 0 && !vehiclesLoading && (
                            <FormHelperText color="warning">
                                Không có xe nào trong hệ thống
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* 2. Chọn Pin Cần Đổi */}
                    <FormControl fullWidth disabled={!form.vehicleId || selectedVehicleBatteries.length === 0}>
                        <InputLabel>Pin Cần Thay</InputLabel>
                        <Select
                            name="batterySerialId"
                            value={form.batterySerialId}
                            label="Pin Cần Thay"
                            onChange={handleChange}
                        >
                            {selectedVehicleBatteries.map((battery: Battery) => (
                                <MenuItem key={battery.id} value={battery.id}>
                                    {battery.serialNumber}
                                    {battery.soH ? ` (SoH: ${battery.soH}%)` : ""}
                                </MenuItem>
                            ))}
                        </Select>
                        {form.vehicleId && selectedVehicleBatteries.length === 0 && (
                            <FormHelperText>Xe này chưa gắn pin nào</FormHelperText>
                        )}
                    </FormControl>

                    {/* 3. Chọn Trạm Swap */}
                    <FormControl fullWidth>
                        <InputLabel>Trạm Đổi Pin</InputLabel>
                        <Select
                            name="stationId"
                            value={form.stationId}
                            label="Trạm Đổi Pin"
                            onChange={handleChange}
                            disabled={stationsLoading}
                        >
                            {stationsLoading && (
                                <MenuItem disabled><em>Đang tải trạm...</em></MenuItem>
                            )}
                            {stations.map((station: StationDetail) => (
                                <MenuItem key={station.id} value={station.id}>
                                    {station.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Nút Xác Nhận */}
                    <FullWidthBox>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={!isFormValid || loading}
                            sx={{
                                py: 2,
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #15803D 0%, #16A34A 100%)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={28} color="inherit" />
                            ) : (
                                "XÁC NHẬN ĐỔI PIN"
                            )}
                        </Button>
                    </FullWidthBox>

                    {/* Kết quả thành công */}
                    {result && (
                        <Alert severity="success" sx={{ borderRadius: "12px", fontSize: "1.1rem" }}>
                            <Typography fontWeight={600} gutterBottom>
                                Đổi pin thành công!
                            </Typography>
                            <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                <li>Pin cũ: <strong>{result.oldSerialNumber}</strong></li>
                                <li>Pin mới: <strong>{result.newSerialNumber}</strong></li>
                                <li>Chi phí: <strong>{result.cost.toLocaleString()} ₫</strong></li>
                                <li>Trạng thái: <strong>{result.status}</strong></li>
                            </Box>
                        </Alert>
                    )}

                    {/* Lỗi */}
                    {error && (
                        <Alert severity="error" sx={{ borderRadius: "12px" }}>
                            {error}
                        </Alert>
                    )}
                </FormBox>
            </FormCard>
        </PageContainer>
    );
};

export default SwapBatteryForm;