// src/features/swapBattery/components/SwapHistoryList.tsx

import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    TablePagination, // ← Đúng component của MUI
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { setPage } from "../SwapHistorySlice";
import { fetchSwapHistory } from "../SwapThunks";
import {
    PageContainer,
    ListCard,
    Title,
} from "../../../styles/AdminDashboardStyles";

const SwapHistoryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        history = [],
        loading = false,
        error = null,
        total = 0,
        currentPage = 1,
        pageSize = 20,
    } = useAppSelector((state) => state.swapHistory); // ← Đã bỏ any, an toàn

    useEffect(() => {
        dispatch(fetchSwapHistory({ page: currentPage, pageSize }));
    }, [dispatch, currentPage, pageSize]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED": return "success";
            case "PENDING": return "warning";
            case "FAILED": return "error";
            case "CANCELLED": return "default";
            default: return "info";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "COMPLETED": return "Hoàn thành";
            case "PENDING": return "Đang xử lý";
            case "FAILED": return "Thất bại";
            case "CANCELLED": return "Đã hủy";
            default: return status || "—";
        }
    };

    const formatPrice = (amount: number | null | undefined) => {
        if (amount === null || amount === undefined || amount <= 0) {
            return "Miễn phí";
        }
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const safeFixed = (value: number | null | undefined, digits: number) => {
        return value != null ? Number(value).toFixed(digits) : "0";
    };

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    <Title variant="h4" fontWeight={700} mb={4}>
                        Lịch Sử Đổi Pin (Swap History)
                    </Title>

                    {/* Loading trạng thái đầu tiên */}
                    {loading && history.length === 0 && (
                        <Box textAlign="center" py={10}>
                            <CircularProgress size={70} thickness={5} />
                            <Typography variant="h6" mt={3} color="text.secondary">
                                Đang tải lịch sử đổi pin...
                            </Typography>
                        </Box>
                    )}

                    {/* Lỗi */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Có dữ liệu */}
                    {!loading && history.length > 0 && (
                        <>
                            <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#eef2ff" }}>
                                            <TableCell><strong>Thời gian</strong></TableCell>
                                            <TableCell><strong>Trạm</strong></TableCell>
                                            <TableCell><strong>Pin cũ → Pin mới</strong></TableCell>
                                            <TableCell align="center"><strong>Năng lượng</strong></TableCell>
                                            <TableCell align="center"><strong>Quãng đường</strong></TableCell>
                                            <TableCell align="right"><strong>Chi phí</strong></TableCell>
                                            <TableCell align="center"><strong>Trạng thái</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {history.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                hover
                                                sx={{
                                                    "&:hover": { bgcolor: "#f8fafc" },
                                                    transition: "background-color 0.2s",
                                                }}
                                            >
                                                {/* Thời gian */}
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {item.timestamp
                                                            ? format(new Date(item.timestamp), "dd/MM/yyyy HH:mm", { locale: vi })
                                                            : "—"}
                                                    </Typography>
                                                    {item.confirmedAt && (
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            Xác nhận: {format(new Date(item.confirmedAt), "HH:mm")}
                                                        </Typography>
                                                    )}
                                                </TableCell>

                                                {/* Trạm */}
                                                <TableCell>
                                                    <strong>{item.stationName || "—"}</strong>
                                                </TableCell>

                                                {/* Pin cũ → mới */}
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Chip label={item.oldBatterySerial || "—"} color="error" size="small" />
                                                        <Typography sx={{ fontWeight: 700 }}>→</Typography>
                                                        <Chip label={item.newBatterySerial || "—"} color="success" size="small" />
                                                    </Box>
                                                </TableCell>

                                                {/* Năng lượng */}
                                                <TableCell align="center">
                                                    <Typography fontWeight={600} color="primary">
                                                        {safeFixed(item.energyUsed, 2)} kWh
                                                    </Typography>
                                                </TableCell>

                                                {/* Quãng đường */}
                                                <TableCell align="center">
                                                    <Typography fontWeight={600} color="info.main">
                                                        {safeFixed(item.distance, 1)} km
                                                    </Typography>
                                                </TableCell>

                                                {/* Chi phí */}
                                                <TableCell align="right">
                                                    <Typography
                                                        fontWeight={700}
                                                        color={item.cost > 0 ? "error.main" : "success.main"}
                                                    >
                                                        {formatPrice(item.cost)}
                                                    </Typography>
                                                </TableCell>

                                                {/* Trạng thái */}
                                                <TableCell align="center">
                                                    <Chip
                                                        label={getStatusLabel(item.status)}
                                                        color={getStatusColor(item.status)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* PHÂN TRANG CHUẨN MUI */}
                            <TablePagination
                                component="div"
                                count={total}
                                page={currentPage - 1}                    // MUI dùng page bắt đầu từ 0
                                rowsPerPage={pageSize}
                                labelRowsPerPage="Số dòng mỗi trang:"
                                labelDisplayedRows={({ from, to, count }) =>
                                    `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
                                }
                                onPageChange={(_, newPage) => {
                                    dispatch(setPage(newPage + 1));   // chuyển lại về index 1
                                }}
                                onRowsPerPageChange={() => {
                                    // Nếu muốn hỗ trợ đổi pageSize thì thêm sau
                                }}
                            />
                        </>
                    )}

                    {/* Không có dữ liệu */}
                    {!loading && history.length === 0 && !error && (
                        <Alert severity="info" sx={{ mt: 4 }}>
                            Chưa có lịch sử đổi pin nào.
                        </Alert>
                    )}
                </Box>
            </ListCard>
        </PageContainer>
    );
};

export default SwapHistoryList;