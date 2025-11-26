// ⛔ VERSION ĐÃ XOÁ HẾT RESERVED FLOW
// -------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchPendingSwaps,
    rejectSwap,
    confirmSwap,
    fetchBatteriesAtStation,
} from "../ConfirmThunks";
import { clearMessages } from "../ConfirmSlices";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Alert,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Autocomplete,
    Stack,
    Typography,
} from "@mui/material";
import { CheckCircleOutline as CheckIcon, Close as CloseIcon, Lock as LockIcon } from "@mui/icons-material";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles";

interface ListItem {
    id: number;
    username: string;
    oldBatterySerialNumber?: string;
    oldBatterySoH?: number;
    stationName: string;
    timestamp?: string;
}

const PendingSwapList = () => {
    const dispatch = useAppDispatch();

    const {
        pendingList = [],
        batteriesAtStation = [],
        loading = false,
        batteriesLoading = false,
        actionLoading = {},
        error,
        successMessage,
    } = useAppSelector((state) => state.staffSwap);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const [selectedBattery, setSelectedBattery] = useState<any>(null);
    const [endPercent, setEndPercent] = useState<string>("0");

    // Load pending swaps once
    useEffect(() => {
        dispatch(fetchPendingSwaps());
    }, [dispatch]);

    // Auto-clear messages
    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleOpenConfirm = (item: ListItem) => {
        setSelectedItem(item);
        setSelectedBattery(null);
        setEndPercent("0");
        setOpenConfirm(true);

        // Fetch batteries for this station
        dispatch(fetchBatteriesAtStation(item.stationName));
    };

    const handleCloseDialog = () => {
        setOpenConfirm(false);
        setSelectedItem(null);
        setSelectedBattery(null);
        setEndPercent("0");
    };

    const handleConfirm = async () => {
        if (!selectedItem || !selectedBattery) {
            alert("Vui lòng chọn pin hợp lệ!");
            return;
        }

        const newBatteryId = selectedBattery.id || selectedBattery.batterySerialId;
        const percent = parseInt(endPercent);

        if (!newBatteryId || isNaN(newBatteryId)) return alert("ID pin không hợp lệ!");
        if (isNaN(percent) || percent < 0 || percent > 100)
            return alert("Phần trăm pin cũ phải từ 0 - 100!");

        try {
            const result = await dispatch(
                confirmSwap({
                    requestId: selectedItem.id,
                    newBatteryId,
                    endPercent: percent,
                })
            );

            if (confirmSwap.fulfilled.match(result)) {
                alert("Đổi pin thành công!");
                handleCloseDialog();
            } else {
                throw new Error((result.payload as string) || "Thao tác thất bại");
            }
        } catch (err: any) {
            alert(err.message || "Có lỗi xảy ra!");
        }
    };

    const pendingItems = Array.isArray(pendingList) ? pendingList : [];

    return (
        <PageContainer maxWidth="lg">
            <ListCard>
                <Title>Duyệt Yêu Cầu Đổi Pin</Title>

                {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {loading ? (
                    <Box textAlign="center" py={8}>
                        <CircularProgress size={60} />
                    </Box>
                ) : pendingItems.length === 0 ? (
                    <Alert severity="info" sx={{ p: 4 }}>
                        Không có yêu cầu nào đang chờ xử lý
                    </Alert>
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
                                    <TableCell align="center"><strong>Hành động</strong></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pendingItems.map((item) => (
                                    <TableRow key={item.id} hover>

                                        <TableCell><strong>{item.username}</strong></TableCell>

                                        <TableCell>
                                            <code
                                                style={{
                                                    background: "#fee2e2",
                                                    color: "#991b1b",
                                                    padding: "4px 8px",
                                                    borderRadius: 4,
                                                }}
                                            >
                                                {item.oldBatterySerialNumber}
                                            </code>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                fontWeight="bold"
                                                color={(item.oldBatterySoH ?? 100) < 80 ? "#dc2626" : "#10b981"}
                                            >
                                                {(item.oldBatterySoH ?? 100)}%
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Chip label={item.stationName} color="info" size="small" />
                                        </TableCell>

                                        <TableCell>
                                            {format(new Date(item.timestamp || Date.now()), "dd/MM HH:mm", { locale: vi })}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                startIcon={<CheckIcon />}
                                                onClick={() => handleOpenConfirm(item)}
                                                disabled={actionLoading[item.id]}
                                            >
                                                {actionLoading[item.id] ? <CircularProgress size={20} /> : "Duyệt"}
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
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                )}
            </ListCard>

            {/* ---- Dialog Confirm ---- */}
            <Dialog open={openConfirm} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#10b981", color: "white" }}>
                    Xác Nhận Đổi Pin - ID: {selectedItem?.id}
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <Alert severity="info">
                            <strong>{selectedItem?.username}</strong> đang đổi pin tại{" "}
                            <strong>{selectedItem?.stationName}</strong>
                        </Alert>

                        <Autocomplete
                            options={batteriesAtStation}
                            getOptionLabel={(opt: any) =>
                                `${opt.serialNumber} | ${opt.batteryModel || opt.model} | ${opt.currentCharge || opt.chargePercent || 0}% | SoH ${opt.soh || opt.stateOfHealth || 0}%`
                            }
                            value={selectedBattery}
                            onChange={(_, val) => setSelectedBattery(val)}
                            loading={batteriesLoading}
                            noOptionsText="Không có pin phù hợp"
                            filterOptions={(options) =>
                                options.filter((opt: any) => !(opt.status === "RESERVED" || opt.reserved))
                            }
                            renderOption={(props, option) => {
                                const isReserved = option.status === "RESERVED" || option.reserved === true;
                                return (
                                    <li {...props} style={{ opacity: isReserved ? 0.5 : 1 }}>
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography variant="body1">
                                                    {option.serialNumber}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {(option.batteryModel || option.model)} • {(option.currentCharge || option.chargePercent || 0)}% • SoH {(option.soh || option.stateOfHealth || 0)}%
                                                </Typography>
                                            </Box>

                                            <Chip
                                                icon={isReserved ? <LockIcon /> : undefined}
                                                label={isReserved ? "ĐÃ ĐẶT" : "SẴN SÀNG"}
                                                size="small"
                                                color={isReserved ? "warning" : "success"}
                                            />
                                        </Box>
                                    </li>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn pin cấp cho khách"
                                    helperText="Pin màu cam là pin đã được khách khác đặt trước → không được chọn!"
                                />
                            )}
                        />

                        <TextField
                            label="Phần trăm pin cũ khi tháo ra"
                            type="number"
                            value={endPercent}
                            onChange={(e) => setEndPercent(e.target.value)}
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            helperText="Ví dụ: 15"
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

