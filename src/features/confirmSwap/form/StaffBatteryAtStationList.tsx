// src/features/staff-battery/components/StaffBatteryAtStationList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchBatteriesAtStation } from "../ConfirmThunks";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table, TableBody, TableCell, TableHead, TableRow, CircularProgress,
    Box, Typography, Chip, Alert, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, IconButton, Grid, Paper
} from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../../shared/utils/AxiosInstance";
import {
    PageContainer, ListCard, Title, TableWrapper
} from "../../../styles/AdminDashboardStyles";

interface BatteryDetail {
    id: number;
    serialNumber: string;
    status: string;
    stateOfHealth: number;
    chargePercent: number;
    currentCapacity: number;
    initialCapacity: number;
    totalCycleCount: number;
    swapCount: number | null;
    stationName: string;
    batteryName: string;
    updatedAt: string | null;
}

const StaffBatteryAtStationList: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        batteries = [],
        batteriesLoading = false,
        batteriesError,
    } = useAppSelector(state => state.confimSwap);

    // STATE CHO POPUP CHI TIẾT
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedBattery, setSelectedBattery] = useState<BatteryDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchBatteriesAtStation());
    }, [dispatch]);

    // MỞ CHI TIẾT PIN
    const handleViewDetail = async (batteryId: number) => {
        setDetailLoading(true);
        setOpenDetail(true);
        try {
            const res = await axiosInstance.get(`/staff/batteries/${batteryId}`);
            setSelectedBattery(res.data);
        } catch (err) {
            console.error("Lỗi lấy chi tiết pin:", err);
            setSelectedBattery(null);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleClose = () => {
        setOpenDetail(false);
        setSelectedBattery(null);
    };

    const stationName = batteries.length > 0 ? batteries[0].stationName : "Trạm hiện tại";

    const getStatusChip = (status: string) => {
        switch (status) {
            case "AVAILABLE": return <Chip label="SẴN SÀNG" color="success" size="small" icon={<BatteryFullIcon />} />;
            case "IN_USE": return <Chip label="ĐANG DÙNG" color="primary" size="small" icon={<BatteryChargingFullIcon />} />;
            case "MAINTENANCE": return <Chip label="BẢO TRÌ" color="warning" size="small" />;
            case "DAMAGED": return <Chip label="HỎNG" color="error" size="small" icon={<BatteryAlertIcon />} />;
            default: return <Chip label={status} size="small" variant="outlined" />;
        }
    };

    const getSoHColor = (soh: number) => {
        if (soh >= 90) return "#059669";
        if (soh >= 85) return "#d97706";
        return "#dc2626";
    };

    if (batteriesLoading) {
        return (
            <PageContainer>
                <ListCard>
                    <Box display="flex" flexDirection="column" alignItems="center" p={8} gap={3}>
                        <CircularProgress size={70} thickness={6} />
                        <Typography variant="h6" color="primary">
                            Đang tải danh sách pin tại trạm...
                        </Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    if (batteriesError) {
        return (
            <PageContainer>
                <ListCard>
                    <Alert severity="error" sx={{ m: 4 }}>
                        Không thể tải danh sách pin: {batteriesError}
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
                        <BatteryFullIcon sx={{ mr: 2, fontSize: 36, color: "#10b981" }} />
                        Danh Sách Pin Tại Trạm
                    </Title>

                    <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
                        {stationName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Tổng cộng: <strong>{batteries.length}</strong> pin
                    </Typography>

                    {batteries.length === 0 ? (
                        <Alert severity="info" sx={{ mt: 4, borderRadius: 3 }}>
                            Trạm hiện tại chưa có pin nào.
                        </Alert>
                    ) : (
                        <TableWrapper>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                                        <TableCell><strong>Số Seri</strong></TableCell>
                                        <TableCell><strong>Model Pin</strong></TableCell>
                                        <TableCell><strong>Trạng thái</strong></TableCell>
                                        <TableCell align="center"><strong>Dung lượng</strong></TableCell>
                                        <TableCell align="center"><strong>SoH</strong></TableCell>
                                        <TableCell align="center"><strong>Chu kỳ</strong></TableCell>
                                        <TableCell align="center"><strong>Lần đổi</strong></TableCell>
                                        <TableCell><strong>Cập nhật</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {batteries.map((bat: any) => (
                                        <TableRow
                                            key={bat.id}
                                            hover
                                            sx={{ "&:hover": { backgroundColor: "#f0fdfa", cursor: "pointer" } }}
                                            onClick={() => handleViewDetail(bat.id)}
                                        >
                                            <TableCell>
                                                <Typography fontFamily="monospace" fontWeight={700} color="#1e40af">
                                                    {bat.serialNumber}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={bat.batteryName} size="small" color="info" variant="outlined" />
                                            </TableCell>
                                            <TableCell>{getStatusChip(bat.status)}</TableCell>
                                            <TableCell align="center">
                                                <Box>
                                                    <Typography fontWeight={700} color="#059669">
                                                        {bat.chargePercent}%
                                                    </Typography>
                                                    <Typography variant="caption">{bat.currentCapacity.toFixed(0)} mAh</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight={800} color={getSoHColor(bat.stateOfHealth)} sx={{ fontSize: "1.2rem" }}>
                                                    {bat.stateOfHealth}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">{bat.totalCycleCount.toFixed(0)}</TableCell>
                                            <TableCell align="center">
                                                <Chip label={bat.swapCount ?? "-"} size="small" />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {bat.updatedAt
                                                        ? format(new Date(bat.updatedAt), "dd/MM/yyyy HH:mm", { locale: vi })
                                                        : "Chưa cập nhật"}
                                                </Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableWrapper>
                    )}
                </Box>
            </ListCard>

            {/* POPUP CHI TIẾT PIN – SIÊU ĐẸP */}
            <Dialog open={openDetail} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#10b981", color: "white", fontWeight: 600 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                            <BatteryFullIcon />
                            Chi Tiết Pin
                        </Box>
                        <IconButton onClick={handleClose} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent dividers sx={{ bgcolor: "#f8fafc" }}>
                    {detailLoading ? (
                        <Box textAlign="center" py={4}>
                            <CircularProgress />
                        </Box>
                    ) : !selectedBattery ? (
                        <Alert severity="error">Không tải được thông tin pin</Alert>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff" }}>
                                    <Typography variant="h6" gutterBottom color="#1e40af" fontWeight={700}>
                                        {selectedBattery.serialNumber}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {selectedBattery.id}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Model:</Typography>
                                <Chip label={selectedBattery.batteryName} color="info" sx={{ mt: 1 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Trạm:</Typography>
                                <Typography sx={{ mt: 1 }}>{selectedBattery.stationName}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Trạng thái:</Typography>
                                {getStatusChip(selectedBattery.status)}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Pin:</Typography>
                                <Typography fontWeight={700} color="#059669" sx={{ fontSize: "1.3rem" }}>
                                    {selectedBattery.chargePercent}%
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>SoH:</Typography>
                                <Typography fontWeight={800} color={getSoHColor(selectedBattery.stateOfHealth)} sx={{ fontSize: "1.4rem" }}>
                                    {selectedBattery.stateOfHealth}%
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Chu kỳ:</Typography>
                                <Typography fontWeight={700}>{selectedBattery.totalCycleCount.toFixed(0)}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Lần đổi:</Typography>
                                <Chip label={selectedBattery.swapCount ?? "Chưa đổi"} color="secondary" sx={{ mt: 1 }} />
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Dung lượng định mức:</Typography>
                                <Typography fontWeight={700} color="#1e40af">
                                    {selectedBattery.initialCapacity.toFixed(0)} mAh
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Dung lượng hiện tại:</Typography>
                                <Typography fontWeight={700} color={selectedBattery.currentCapacity < selectedBattery.initialCapacity * 0.9 ? "#dc2626" : "#059669"}>
                                    {selectedBattery.currentCapacity.toFixed(0)} mAh
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Typography fontWeight={600}>Cập nhật:</Typography>
                                <Typography sx={{ mt: 1 }}>
                                    {selectedBattery.updatedAt
                                        ? format(new Date(selectedBattery.updatedAt), "PPPp", { locale: vi })
                                        : "Chưa cập nhật"}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default StaffBatteryAtStationList;