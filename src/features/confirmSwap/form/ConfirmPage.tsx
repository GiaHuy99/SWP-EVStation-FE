// src/features/staff-swap/components/PendingSwapList.tsx

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchPendingSwaps,
    rejectSwap,
    fetchReservationSwaps,
    fetchReservationBattery,
    confirmSwap, // ← DÙNG CHÍNH CÁI NÀY
} from "../ConfirmThunks";
import { clearReservedDetail } from "../ConfirmSlices";
import { clearMessages } from "../ConfirmSlices";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, CircularProgress, Alert, Box, Chip,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Autocomplete, Stack, Typography,
} from "@mui/material";
import { CheckCircleOutline as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles";

type ItemType = "SWAP" | "RESERVED";

interface ListItem {
    id: number;
    username: string;
    oldBatterySerialNumber?: string;
    oldBatterySoH?: number;
    stationName: string;
    timestamp?: string;
    reservedAt?: string;
    remainingMinutes?: number;
    type: ItemType;
}

const PendingSwapList = () => {
    const dispatch = useAppDispatch();
    const {
        pendingList = [],
        reservedList = [],
        reservedDetail,
        loading = false,
        loadingReserved = false,
        loadingDetail = false,
        actionLoading = {},
        error,
        successMessage,
    } = useAppSelector((state) => state.staffSwap);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const [selectedBattery, setSelectedBattery] = useState<any>(null);
    const [endPercent, setEndPercent] = useState<string>("0");

    useEffect(() => {
        dispatch(fetchPendingSwaps());
        dispatch(fetchReservationSwaps());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleOpenConfirm = async (item: ListItem) => {
        setSelectedItem(item);
        setSelectedBattery(null);
        setEndPercent(item.type === "RESERVED" ? "100" : "0");
        setOpenConfirm(true);

        if (item.type === "RESERVED") {
            dispatch(fetchReservationBattery(item.id));
        }
    };

    const handleCloseDialog = () => {
        setOpenConfirm(false);
        setSelectedItem(null);
        setSelectedBattery(null);
        dispatch(clearReservedDetail());
    };

    // CHỖ QUAN TRỌNG NHẤT – DÙNG CHÍNH confirmSwap CỦA BẠN
    const handleConfirm = async () => {
        if (!selectedItem || !selectedBattery) {
            alert("Vui lòng chọn pin để cấp!");
            return;
        }

        const percent = parseInt(endPercent);
        if (isNaN(percent) || percent < 0 || percent > 100) {
            alert("Phần trăm phải từ 0 - 100!");
            return;
        }

        try {
            const result = await dispatch(
                confirmSwap({
                    requestId: selectedItem.id,           // ← Đây là ID của yêu cầu (swap/reservation)
                    newBatteryId: selectedBattery.id,     // ← ID của pin mới (từ availableBatteries)
                    endPercent: percent,
                })
            );

            if (confirmSwap.fulfilled.match(result)) {
                alert(
                    selectedItem.type === "RESERVED"
                        ? "Cấp pin đặt trước thành công!"
                        : "Đổi pin thành công!"
                );
                handleCloseDialog();
            } else {
                throw new Error(result.payload as string);
            }
        } catch (err: any) {
            alert(err.message || "Thao tác thất bại!");
        }
    };

    const allItems = [
        ...pendingList.map((i: any) => ({ ...i, type: "SWAP" as const })),
        ...reservedList.map((i: any) => ({ ...i, type: "RESERVED" as const })),
    ];

    return (
        <PageContainer maxWidth="lg">
            <ListCard>
                <Title>Duyệt Yêu Cầu Đổi Pin & Cấp Pin Đặt Trước</Title>

                {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {(loading || loadingReserved) ? (
                    <Box textAlign="center" py={8}><CircularProgress size={60} /></Box>
                ) : allItems.length === 0 ? (
                    <Alert severity="info" sx={{ p: 4 }}>Không có yêu cầu nào đang chờ xử lý</Alert>
                ) : (
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                                    <TableCell><strong>Người dùng</strong></TableCell>
                                    <TableCell><strong>Pin cũ</strong></TableCell>
                                    <TableCell><strong>SoH</strong></TableCell>
                                    <TableCell><strong>Trạm</strong></TableCell>
                                    <TableCell><strong>Thời gian</strong></TableCell>
                                    <TableCell><strong>Còn lại</strong></TableCell>
                                    <TableCell><strong>Loại</strong></TableCell>
                                    <TableCell align="center"><strong>Hành động</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allItems.map((item) => (
                                    <TableRow key={item.id} hover>
                                        <TableCell><strong>{item.username}</strong></TableCell>
                                        <TableCell>
                                            <code style={{
                                                background: item.type === "RESERVED" ? "#ecfccb" : "#fee2e2",
                                                color: item.type === "RESERVED" ? "#365314" : "#991b1b",
                                                padding: "4px 8px",
                                                borderRadius: 4,
                                            }}>
                                                {item.oldBatterySerialNumber || "Đặt trước"}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" color={(item.oldBatterySoH ?? 100) < 80 ? "#dc2626" : "#10b981"}>
                                                {(item.oldBatterySoH ?? 100)}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell><Chip label={item.stationName} color={item.type === "RESERVED" ? "warning" : "info"} size="small" /></TableCell>
                                        <TableCell>{format(new Date(item.timestamp || item.reservedAt || Date.now()), "dd/MM HH:mm", { locale: vi })}</TableCell>
                                        <TableCell>
                                            {item.type === "RESERVED" && item.remainingMinutes != null ? (
                                                <Chip label={`${item.remainingMinutes} phút`} color="error" size="small" />
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={item.type === "RESERVED" ? "ĐẶT TRƯỚC" : "ĐỔI PIN"} color={item.type === "RESERVED" ? "warning" : "primary"} size="small" />
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.type === "RESERVED" ? (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="success"
                                                    startIcon={<CheckIcon />}
                                                    onClick={() => handleOpenConfirm(item)}
                                                    disabled={actionLoading[item.id]}
                                                >
                                                    {actionLoading[item.id] ? <CircularProgress size={20} /> : "Cấp Pin"}
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="success"
                                                        startIcon={<CheckIcon />}
                                                        onClick={() => handleOpenConfirm(item)}
                                                        disabled={actionLoading[item.id]}
                                                    >
                                                        Duyệt
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="error"
                                                        startIcon={<CloseIcon />}
                                                        onClick={() => dispatch(rejectSwap(item.id))}
                                                        sx={{ ml: 1 }}
                                                        disabled={actionLoading[item.id]}
                                                    >
                                                        Từ chối
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                )}
            </ListCard>

            {/* Dialog xác nhận */}
            <Dialog open={openConfirm} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#10b981", color: "white" }}>
                    {selectedItem?.type === "RESERVED" ? "Cấp Pin Đặt Trước" : "Xác Nhận Đổi Pin"} - ID: {selectedItem?.id}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <Alert severity="info">
                            <strong>{selectedItem?.username}</strong> đang {selectedItem?.type === "RESERVED" ? "nhận pin đặt trước" : "đổi pin"} tại <strong>{selectedItem?.stationName}</strong>
                        </Alert>

                        <Autocomplete
                            options={
                                selectedItem?.type === "RESERVED"
                                    ? reservedDetail?.availableBatteries || []
                                    : selectedItem?.availableBatteries || []
                            }
                            getOptionLabel={(opt: any) =>
                                `${opt.serialNumber} | ${opt.batteryModel} | ${opt.chargePercent}% | SoH ${opt.stateOfHealth}%`
                            }
                            loading={loadingDetail}
                            value={selectedBattery}
                            onChange={(_, val) => setSelectedBattery(val)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={selectedItem?.type === "RESERVED" ? "Chọn pin đã đặt trước" : "Chọn pin mới"}
                                    required
                                />
                            )}
                        />

                        <TextField
                            label="Phần trăm pin cũ khi tháo ra"
                            type="number"
                            value={endPercent}
                            onChange={(e) => setEndPercent(e.target.value)}
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            helperText={selectedItem?.type === "RESERVED" ? "Thường để 100%" : "Ví dụ: 15"}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleConfirm}
                        disabled={!selectedBattery || actionLoading[selectedItem?.id!]}
                    >
                        {actionLoading[selectedItem?.id!] ? <CircularProgress size={24} /> : "Xác Nhận"}
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default PendingSwapList;