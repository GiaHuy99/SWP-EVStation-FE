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
    Alert, TablePagination,
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
    const swapHistoryState = useAppSelector((state: any) => state.swapHistory || {});
    const {
        history = [],
        loading = false,
        error = null,
        total = 0,
        currentPage = 1,
        pageSize = 20,
    } = swapHistoryState;

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

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    <Title variant="h4" fontWeight={700} mb={4}>
                        Lịch Sử Đổi Pin (Swap History)
                    </Title>

                    {loading && history.length === 0 && (
                        <Box textAlign="center" py={8}>
                            <CircularProgress size={60} />
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {!loading && history.length > 0 && (
                        <>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f8fafc" }}>
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
                                                    "&:hover": { backgroundColor: "#f0fdf4" },
                                                    transition: "0.2s",
                                                }}
                                            >
                                                <TableCell>
                                                    <Typography fontWeight={600}>
                                                        {format(new Date(item.timestamp), "dd/MM/yyyy HH:mm", { locale: vi })}
                                                    </Typography>
                                                    {item.confirmedAt && (
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            Xác nhận: {format(new Date(item.confirmedAt), "HH:mm")}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <strong>{item.stationName}</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Chip label={item.oldBatterySerial} color="error" size="small" sx={{ mr: 1 }} />
                                                        →
                                                        <Chip label={item.newBatterySerial} color="success" size="small" sx={{ ml: 1 }} />
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography fontWeight={600} color="primary">
                                                        {item.energyUsed.toFixed(2)} kWh
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography fontWeight={600} color="info.main">
                                                        {item.distance.toFixed(1)} km
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        fontWeight={700}
                                                        color={item.cost > 0 ? "error" : "success.main"}
                                                    >
                                                        {item.cost > 0 ? formatPrice(item.cost) : "Miễn phí"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={
                                                            item.status === "COMPLETED" ? "Hoàn thành" :
                                                                item.status === "PENDING" ? "Đang xử lý" :
                                                                    item.status === "FAILED" ? "Thất bại" : "Hủy"
                                                        }
                                                        color={getStatusColor(item.status)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box mt={4}>
                                <TablePagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(total / pageSize)}
                                    onPageChange={(page) => dispatch(setPage(page))}
                                    totalItems={total}
                                    itemsPerPage={pageSize}
                                />
                            </Box>
                        </>
                    )}

                    {!loading && history.length === 0 && (
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