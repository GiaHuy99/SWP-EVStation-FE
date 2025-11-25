// src/features/staff-swap/components/PendingSwapList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchPendingSwaps, rejectSwap } from "../ConfirmThunks";
import { clearMessages } from "../ConfirmSlices";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress,
    Alert, Box, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Autocomplete, Stack
} from "@mui/material";
import { CheckCircleOutline as CheckIcon, Close as CloseIcon, Sync as SwapIcon } from "@mui/icons-material";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles";
import axiosInstance from "../../../shared/utils/AxiosInstance";

const PendingSwapList = () => {
    const dispatch = useAppDispatch();
    const { pendingList, loading, error, successMessage } = useAppSelector(state => state.confimSwap);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedSwap, setSelectedSwap] = useState<any>(null);
    const [selectedBattery, setSelectedBattery] = useState<any>(null);
    const [endPercent, setEndPercent] = useState<string>("0");
    const [confirming, setConfirming] = useState(false);

    useEffect(() => {
        dispatch(fetchPendingSwaps());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            setTimeout(() => dispatch(clearMessages()), 5000);
        }
    }, [successMessage, error, dispatch]);

    const handleOpenConfirm = (swap: any) => {
        setSelectedSwap(swap);
        setSelectedBattery(null);
        setEndPercent("0");
        setOpenConfirm(true);
    };

    const handleConfirmSwap = async () => {
        if (!selectedSwap || !selectedBattery) {
            alert("Vui lòng chọn pin mới!");
            return;
        }

        const percent = parseInt(endPercent);
        if (isNaN(percent) || percent < 0 || percent > 100) {
            alert("Phần trăm phải từ 0 - 100!");
            return;
        }

        setConfirming(true);
        try {
            const response = await axiosInstance.put(
                `/staff/swap/${selectedSwap.id}/confirm`, // ← ID của giao dịch pending
                {
                    endPercent: percent,
                    newBatterySerialId: selectedBattery.id // ← ID của pin được chọn (trong availableBatteries)
                }
            );

            alert(response.data?.message || "Đổi pin thành công!");
            dispatch(fetchPendingSwaps()); // Refresh danh sách
            setOpenConfirm(false);
        } catch (err: any) {
            alert(err.response?.data?.message || "Đổi pin thất bại!");
        } finally {
            setConfirming(false);
        }
    };

    return (
        <PageContainer maxWidth="lg">
            <ListCard>
                <Title>Duyệt Yêu Cầu Đổi Pin</Title>

                {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {loading ? (
                    <Box textAlign="center" py={8}><CircularProgress size={60} /></Box>
                ) : pendingList.length === 0 ? (
                    <Alert severity="info" sx={{ p: 4 }}>Không có yêu cầu nào đang chờ duyệt</Alert>
                ) : (
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                                    <TableCell><strong>Người dùng</strong></TableCell>
                                    <TableCell><strong>Pin cũ </strong></TableCell>
                                    <TableCell><strong>SoH cũ</strong></TableCell>
                                    <TableCell><strong>Trạm</strong></TableCell>
                                    <TableCell><strong>Thời gian</strong></TableCell>
                                    <TableCell align="center"><strong>Hành động</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingList.map((swap: any) => (
                                    <TableRow key={swap.id} hover>
                                        <TableCell><strong>{swap.username}</strong></TableCell>
                                        <TableCell>
                                            <code style={{ background: "#fee2e2", color: "#991b1b", px: 1, borderRadius: 4 }}>
                                                {swap.oldBatterySerialNumber}
                                            </code>

                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" color={swap.oldBatterySoH < 80 ? "#dc2626" : "#10b981"}>
                                                {swap.oldBatterySoH}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell><Chip label={swap.stationName} color="info" size="small" /></TableCell>
                                        <TableCell>{format(new Date(swap.timestamp), "dd/MM HH:mm", { locale: vi })}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                startIcon={<CheckIcon />}
                                                onClick={() => handleOpenConfirm(swap)}
                                            >
                                                Duyệt
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                startIcon={<CloseIcon />}
                                                onClick={() => dispatch(rejectSwap(swap.id))}
                                                sx={{ ml: 1 }}
                                            >
                                                Từ chối
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                )}
            </ListCard>

            {/* POPUP XÁC NHẬN – SIÊU CHUẨN */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#10b981", color: "white" }}>
                    Xác Nhận Đổi Pin - ID: {selectedSwap?.id}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <Alert severity="info">
                            <strong>{selectedSwap?.username}</strong> đang đổi pin tại <strong>{selectedSwap?.stationName}</strong>
                        </Alert>

                        <Autocomplete
                            options={selectedSwap?.availableBatteries || []}
                            getOptionLabel={(opt: any) => `${opt.serialNumber} | ${opt.batteryModel} | ${opt.chargePercent}% | SoH ${opt.stateOfHealth}%`}
                            value={selectedBattery}
                            onChange={(_, value) => setSelectedBattery(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Chọn pin mới để cấp" required />
                            )}
                        />

                        <TextField
                            label="Phần trăm pin cũ khi tháo ra (endPercent)"
                            type="number"
                            value={endPercent}
                            onChange={(e) => setEndPercent(e.target.value)}
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            helperText="Ví dụ: 15% → nhập 15"
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleConfirmSwap}
                        disabled={!selectedBattery || confirming}
                    >
                        {confirming ? <CircularProgress size={24} /> : "Xác Nhận Đổi Pin"}
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default PendingSwapList;