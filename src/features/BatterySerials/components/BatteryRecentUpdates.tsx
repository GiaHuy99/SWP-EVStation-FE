// src/features/admin-battery/components/BatteryRecentUpdates.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchRecentBatteryUpdates } from "../BatterySerialThunk";
import {
    Box,
    Typography,
    Paper,
    Chip,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Stack,
} from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { PageContainer, ListCard, Title } from "../../../styles/AdminDashboardStyles";

const getStatusChip = (status: string) => {
    switch (status) {
        case "AVAILABLE": return <Chip label="Sẵn sàng" color="success" size="small" icon={<BatteryFullIcon />} />;
        case "IN_USE": return <Chip label="Đang dùng" color="primary" size="small" />;
        case "MAINTENANCE": return <Chip label="Bảo trì" color="warning" size="small" />;
        case "DAMAGED": return <Chip label="Hỏng" color="error" size="small" />;
        default: return <Chip label={status} size="small" variant="outlined" />;
    }
};

const getSoHColor = (soh: number): string => {
    if (soh >= 90) return "#059669";
    if (soh >= 80) return "#d97706";
    return "#dc2626";
};

const BatteryRecentUpdates: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        recentUpdates: updates,           // ← đổi tên khi lấy ra
        recentUpdatesLoading: loading,
        recentUpdatesError: error
    } = useAppSelector((state) => state.batterySerials);
    useEffect(() => {
        dispatch(fetchRecentBatteryUpdates());
    }, [dispatch]);

    if (loading) {
        return (
            <PageContainer>
                <ListCard>
                    <Box textAlign="center" py={10}>
                        <CircularProgress size={70} thickness={5} />
                        <Typography variant="h6" mt={3} color="text.secondary">
                            Đang tải lịch sử cập nhật...
                        </Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <ListCard>
                    <Alert severity="error" sx={{ m: 4 }}>
                        {error}
                    </Alert>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    <Title>
                        <AccessTimeIcon sx={{ mr: 2, fontSize: 36, color: "#1e40af" }} />
                        Lịch Sử Cập Nhật Pin Gần Đây
                    </Title>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Hiển thị tất cả pin vừa được cập nhật (SoH, trạng thái, dung lượng...) trong hệ thống
                    </Typography>

                    {updates.length === 0 ? (
                        <Alert severity="info">Chưa có cập nhật nào gần đây.</Alert>
                    ) : (
                        <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#eef2ff" }}>
                                        <TableCell><strong>Thời gian</strong></TableCell>
                                        <TableCell><strong>Số Seri</strong></TableCell>
                                        <TableCell><strong>Model</strong></TableCell>
                                        <TableCell><strong>Trạm</strong></TableCell>
                                        <TableCell align="center"><strong>Trạng thái</strong></TableCell>
                                        <TableCell align="center"><strong>Dung lượng</strong></TableCell>
                                        <TableCell align="center"><strong>SoH</strong></TableCell>
                                        <TableCell align="center"><strong>Chu kỳ</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {updates.map((battery) => (
                                        <TableRow key={battery.id} hover sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                                            <TableCell>
                                                <Stack direction="column">
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {format(new Date(battery.updatedAt), "HH:mm dd/MM/yyyy", { locale: vi })}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {formatDistanceToNow(new Date(battery.updatedAt), { addSuffix: true, locale: vi })}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontFamily="monospace" fontWeight={700} color="#1e40af">
                                                    {battery.serialNumber}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={battery.batteryName} size="small" color="info" variant="outlined" />
                                            </TableCell>
                                            <TableCell>{battery.stationName}</TableCell>
                                            <TableCell align="center">{getStatusChip(battery.status)}</TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight={700} color="#059669">
                                                    {battery.chargePercent.toFixed(0)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    fontWeight={800}
                                                    color={getSoHColor(battery.stateOfHealth)}
                                                    sx={{ fontSize: "1.1rem" }}
                                                >
                                                    {battery.stateOfHealth.toFixed(1)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">{battery.totalCycleCount.toFixed(0)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </ListCard>
        </PageContainer>
    );
};

export default BatteryRecentUpdates;