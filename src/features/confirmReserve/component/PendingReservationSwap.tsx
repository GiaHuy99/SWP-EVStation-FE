import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchPendingReservations,
    confirmReservationSwap,
    rejectReservationSwap,
} from "../ConfirmReserveThunks";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Autocomplete,
    Alert,
    Box,
    Stack,
    Typography,
    Chip,
} from "@mui/material";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles"; // giống ConfirmSwap
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function PendingReservationSwap() {
    const dispatch = useAppDispatch();
    const { reservations = [], loading, actionLoading = {} } = useAppSelector(
        (s) => s.reservationSwap
    );

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [selectedBattery, setSelectedBattery] = useState<any>(null);
    const [endPercent, setEndPercent] = useState("0");

    useEffect(() => {
        dispatch(fetchPendingReservations());
    }, [dispatch]);

    const handleOpenConfirm = (item: any) => {
        setSelectedItem(item);
        setSelectedBattery(null);
        setEndPercent("0");
        setOpenConfirm(true);
    };

    const handleCloseDialog = () => {
        setOpenConfirm(false);
        setSelectedItem(null);
        setSelectedBattery(null);
        setEndPercent("0");
    };

    const handleConfirm = () => {
        if (!selectedItem || !selectedBattery) return;
        dispatch(
            confirmReservationSwap({
                transactionId: selectedItem.id,
                newBatterySerialId: selectedBattery.batterySerialId,
                endPercent: parseInt(endPercent) || 0,
            })
        );
        handleCloseDialog();
    };

    const safeReservations = Array.isArray(reservations) ? reservations : [];

    if (loading) return <CircularProgress />;
    if (safeReservations.length === 0) return <Alert severity="info">Không có yêu cầu đang chờ xử lý</Alert>;

    return (
        <PageContainer maxWidth="lg">
            <ListCard>
                <Title>Pending Reservation Swap</Title>

                <TableWrapper>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f0fdf4" }}>
                            <TableRow>
                                <TableCell><strong>Người dùng</strong></TableCell>
                                <TableCell><strong>Pin cũ</strong></TableCell>
                                <TableCell><strong>SoH</strong></TableCell>
                                <TableCell><strong>Trạm</strong></TableCell>
                                <TableCell><strong>Thời gian</strong></TableCell>
                                <TableCell align="center"><strong>Hành động</strong></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {safeReservations.map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>
                                        <code style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 8px", borderRadius: 4 }}>
                                            {item.oldBatterySerialNumber || "-"}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" color={(item.oldBatterySoH ?? 100) < 80 ? "#dc2626" : "#10b981"}>
                                            {item.oldBatterySoH ?? "-"}%
                                        </Typography>
                                    </TableCell>
                                    <TableCell><Chip label={item.stationName} color="info" size="small" /></TableCell>
                                    <TableCell>
                                        {format(new Date(item.timestamp || Date.now()), "dd/MM HH:mm", { locale: vi })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            onClick={() => handleOpenConfirm(item)}
                                            disabled={actionLoading[item.id]}
                                        >
                                            {actionLoading[item.id] ? <CircularProgress size={20} /> : "Duyệt"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            sx={{ ml: 1 }}
                                            onClick={() => dispatch(rejectReservationSwap(item.id))}
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

                {/* Dialog confirm */}
                <Dialog open={openConfirm} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ bgcolor: "#10b981", color: "white" }}>
                        Xác nhận đổi pin - ID: {selectedItem?.id}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Alert severity="info">
                                <strong>{selectedItem?.username}</strong> đang đổi pin tại <strong>{selectedItem?.stationName}</strong>
                            </Alert>

                            <Autocomplete
                                options={Array.isArray(selectedItem?.reservation?.batteries) ? selectedItem.reservation.batteries : []}
                                getOptionLabel={(opt: any) =>
                                    `${opt.serialNumber} | ${opt.chargePercent || 0}% | SoH ${opt.stateOfHealth || 0}%`
                                }
                                value={selectedBattery}
                                onChange={(_, val) => setSelectedBattery(val)}
                                noOptionsText="Không có pin phù hợp"
                                renderInput={(params) => (
                                    <TextField {...params} label="Chọn pin cấp cho khách" helperText="Chọn pin khách muốn swap" />
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
                            {actionLoading[selectedItem?.id!] ? <CircularProgress size={24} /> : "Xác nhận"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
}
