// src/features/staff-swap/components/PendingSwapList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchPendingSwaps, confirmSwap, rejectSwap } from "../ConfirmThunks";
import { clearMessages } from "../ConfirmSlices";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress,
    Alert, Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip, Stack, Divider, Paper
} from "@mui/material";
import {
    Close as CloseIcon,
    CheckCircleOutline as CheckIcon,
    Visibility as VisibilityIcon,
    TwoWheeler as BikeIcon,
    Sync as SwapIcon
} from "@mui/icons-material";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles";
import axiosInstance from "../../../shared/utils/AxiosInstance"; // Đảm bảo có axios

const PendingSwapList = () => {
    const dispatch = useAppDispatch();
    const { pendingList, loading, actionLoading, error, successMessage } = useAppSelector(state => state.confimSwap);

    const [openDetail, setOpenDetail] = useState(false);
    const [selectedSwap, setSelectedSwap] = useState<any>(null);

    // TỰ ĐỘNG LẤY VIN TỪ API /user/vehicles
    const [vehicleMap, setVehicleMap] = useState<Map<number, { vin: string; model?: string }>>(new Map());
    const [vehiclesLoading, setVehiclesLoading] = useState(true);

    // GỌI API LẤY TẤT CẢ XE → MAP THEO vehicleId
    useEffect(() => {
        const fetchAllVehicles = async () => {
            try {
                setVehiclesLoading(true);
                const res = await axiosInstance.get("/user/vehicles");
                const vehicles = res.data;

                const map = new Map<number, { vin: string; model?: string }>();
                vehicles.forEach((v: any) => {
                    map.set(v.vehicleId, {
                        vin: v.vin || "Không có VIN",
                        model: v.model || v.vehicleModel || ""
                    });
                });

                setVehicleMap(map);
            } catch (err) {
                console.error("Lỗi lấy danh sách xe:", err);
            } finally {
                setVehiclesLoading(false);
            }
        };

        fetchAllVehicles();
    }, []);

    useEffect(() => {
        dispatch(fetchPendingSwaps());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 4000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleConfirm = (id: number) => dispatch(confirmSwap(id));
    const handleReject = (id: number) => dispatch(rejectSwap(id));
    const handleViewDetail = (swap: any) => {
        setSelectedSwap(swap);
        setOpenDetail(true);
    };

    const getVin = (vehicleId: number) => {
        const info = vehicleMap.get(vehicleId);
        return info?.vin || (vehiclesLoading ? "Đang tải..." : "Không tìm thấy");
    };

    const getModel = (vehicleId: number) => {
        const info = vehicleMap.get(vehicleId);
        return info?.model || "";
    };

    return (
        <PageContainer maxWidth="lg">
            <ListCard elevation={0}>
                <Title> Duyệt Yêu Cầu Đổi Pin </Title>

                {successMessage && <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>{successMessage}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>{error}</Alert>}

                {loading || vehiclesLoading ? (
                    <Box textAlign="center" py={8}>
                        <CircularProgress size={60} />
                        <Typography sx={{ mt: 2 }}>Đang tải dữ liệu...</Typography>
                    </Box>
                ) : pendingList.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        Không có yêu cầu nào đang chờ duyệt
                    </Alert>
                ) : (
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Người dùng</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Xe (VIN)</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Trạm</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Pin cũ → Pin mới</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>SoH cũ</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Thời gian</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 600, color: "#4C428C" }}>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingList.map((swap) => (
                                    <TableRow key={swap.id} hover sx={{ "&:hover": { backgroundColor: "rgba(4, 196, 217, 0.05)" } }}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography fontWeight={600}>{swap.username}</Typography>
                                                <IconButton size="small" onClick={() => handleViewDetail(swap)}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <BikeIcon color="primary" fontSize="small" />
                                                <Box>
                                                    <Typography fontWeight={700} color="#1e40af">
                                                        {getVin(swap.vehicleId)}
                                                    </Typography>
                                                    {getModel(swap.vehicleId) && (
                                                        <Typography variant="caption" color="text.secondary">
                                                            {getModel(swap.vehicleId)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={swap.stationName} size="small" color="info" />
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <code style={{ background: "#fee2e2", color: "#991b1b", px: 1, borderRadius: 4, fontSize: "0.8rem" }}>
                                                    {swap.oldBatterySerialNumber}
                                                </code>
                                                <SwapIcon sx={{ mx: 1, fontSize: 16, color: "#64748b" }} />
                                                <code style={{ background: "#d1fae5", color: "#065f46", px: 1, borderRadius: 4, fontSize: "0.8rem" }}>
                                                    {swap.batterySerialNumber}
                                                </code>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight={700} color={swap.oldBatterySoH < 80 ? "#dc2626" : "#059669"}>
                                                {swap.oldBatterySoH}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(swap.timestamp), "PPPp", { locale: vi })}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<CheckIcon />}
                                                onClick={() => handleConfirm(swap.id)}
                                                disabled={!!actionLoading[swap.id]}
                                                sx={{ mr: 1, background: "linear-gradient(135deg, #10b981, #059669)", minWidth: 90 }}
                                            >
                                                {actionLoading[swap.id] ? <CircularProgress size={18} /> : "Duyệt"}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<CloseIcon />}
                                                onClick={() => handleReject(swap.id)}
                                                disabled={!!actionLoading[swap.id]}
                                                sx={{ borderColor: "#ef4444", color: "#ef4444", minWidth: 90 }}
                                            >
                                                {actionLoading[swap.id] ? <CircularProgress size={18} /> : "Từ chối"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                )}
            </ListCard>
        </PageContainer>
    );
};

export default PendingSwapList;