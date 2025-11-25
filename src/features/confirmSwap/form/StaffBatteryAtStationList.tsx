// src/features/staff-battery/components/StaffBatteryAtStationList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchBatteriesAtStation } from "../ConfirmThunks";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    Typography,
    Chip,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Grid,
    Paper,
    TextField,
    Stack,
    LinearProgress,
} from "@mui/material";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab";

import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import axiosInstance from "../../../shared/utils/AxiosInstance";
import { PageContainer, ListCard, Title, TableWrapper } from "../../../styles/AdminDashboardStyles";

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

interface BatteryHistoryItem {
    id: number;
    eventType: string;
    oldValue: string;
    newValue: string;
    stationName: string;
    vehicleVin: string | null;
    performedByUsername: string;
    notes: string;
    createdAt: string;
}

const StaffBatteryAtStationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { batteries = [], batteriesLoading = false } = useAppSelector((state) => state.confimSwap);

    const [openDetail, setOpenDetail] = useState(false);
    const [selectedBattery, setSelectedBattery] = useState<BatteryDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [openHistory, setOpenHistory] = useState(false);
    const [batteryHistory, setBatteryHistory] = useState<BatteryHistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const [sohInput, setSohInput] = useState<string>("");
    const [updatingSoH, setUpdatingSoH] = useState(false);

    useEffect(() => {
        dispatch(fetchBatteriesAtStation());
    }, [dispatch]);

    const handleViewDetail = async (batteryId: number) => {
        setDetailLoading(true);
        setOpenDetail(true);
        try {
            const res = await axiosInstance.get(`/staff/batteries/${batteryId}`);
            const data = res.data;
            setSelectedBattery(data);
            setSohInput(data.stateOfHealth.toString());
        } catch (err) {
            console.error("Lỗi lấy chi tiết pin:", err);
            setSelectedBattery(null);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleUpdateSoH = async () => {
        if (!selectedBattery) return;
        const newSoH = parseFloat(sohInput);
        if (isNaN(newSoH) || newSoH < 0 || newSoH > 100) {
            alert("SoH phải từ 0 - 100%!");
            setSohInput(selectedBattery.stateOfHealth.toString());
            return;
        }
        setUpdatingSoH(true);
        try {
            await axiosInstance.put(`/staff/batteries/${selectedBattery.id}/soh`, { newSoH });
            setSelectedBattery((prev) => (prev ? { ...prev, stateOfHealth: newSoH } : null));
            dispatch(fetchBatteriesAtStation());
            alert(`Đã cập nhật SoH thành công: ${newSoH}%`);
        } catch (err: any) {
            alert(err.response?.data?.message || "Cập nhật SoH thất bại!");
            setSohInput(selectedBattery.stateOfHealth.toString());
        } finally {
            setUpdatingSoH(false);
        }
    };

    const handleViewHistory = async (batteryId: number) => {
        setHistoryLoading(true);
        setOpenHistory(true);
        try {
            const res = await axiosInstance.get(`/staff/batteries/${batteryId}/history`);
            setBatteryHistory(res.data.history || []);
        } catch (err) {
            setBatteryHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case "AVAILABLE":
                return <Chip label="SẴN SÀNG" color="success" size="small" icon={<BatteryFullIcon />} />;
            case "IN_USE":
                return <Chip label="ĐANG DÙNG" color="primary" size="small" icon={<BatteryChargingFullIcon />} />;
            case "MAINTENANCE":
                return <Chip label="BẢO TRÌ" color="warning" size="small" />;
            case "DAMAGED":
                return <Chip label="HỎNG" color="error" size="small" icon={<BatteryAlertIcon />} />;
            default:
                return <Chip label={status} size="small" variant="outlined" />;
        }
    };

    const getSoHColor = (soh: number) => {
        if (soh >= 90) return "#059669";
        if (soh >= 80) return "#d97706";
        return "#dc2626";
    };

    if (batteriesLoading) {
        return (
            <PageContainer>
                <ListCard>
                    <Box textAlign="center" py={8}>
                        <CircularProgress size={70} />
                        <Typography variant="h6" mt={3}>Đang tải danh sách pin...</Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    const stationName = batteries.length > 0 ? batteries[0].stationName : "Trạm hiện tại";

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    <Title>
                        <BatteryFullIcon sx={{ mr: 2, fontSize: 36, color: "#10b981" }} />
                        Danh Sách Pin Tại Trạm
                    </Title>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                        {stationName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Tổng cộng: <strong>{batteries.length}</strong> viên
                    </Typography>

                    {batteries.length === 0 ? (
                        <Alert severity="info">Trạm chưa có pin nào.</Alert>
                    ) : (
                        <TableWrapper>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                                        <TableCell><strong>Số Seri</strong></TableCell>
                                        <TableCell><strong>Model</strong></TableCell>
                                        <TableCell><strong>Trạng thái</strong></TableCell>
                                        <TableCell align="center"><strong>Dung lượng</strong></TableCell>
                                        <TableCell align="center"><strong>SoH</strong></TableCell>
                                        <TableCell align="center"><strong>Chu kỳ</strong></TableCell>
                                        <TableCell align="center"><strong>Lần đổi</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {batteries.map((bat: any) => (
                                        <TableRow
                                            key={bat.id}
                                            hover
                                            sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0fdfa" } }}
                                            onClick={() => handleViewDetail(bat.id)}
                                        >
                                            <TableCell>
                                                <Typography fontFamily="monospace" fontWeight={700} color="#1e40af">
                                                    {bat.serialNumber}
                                                </Typography>
                                            </TableCell>
                                            <TableCell><Chip label={bat.batteryName} size="small" color="info" variant="outlined" /></TableCell>
                                            <TableCell>{getStatusChip(bat.status)}</TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight={700} color="#059669">{bat.chargePercent}%</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontWeight={800} color={getSoHColor(bat.stateOfHealth)} sx={{ fontSize: "1.2rem" }}>
                                                    {bat.stateOfHealth}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">{bat.totalCycleCount}</TableCell>
                                            <TableCell align="center"><Chip label={bat.swapCount ?? "-"} size="small" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableWrapper>
                    )}
                </Box>
            </ListCard>

            {/* ==================== CHI TIẾT PIN - SIÊU ĐẸP ==================== */}
            <Dialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                    },
                }}
            >
                <DialogTitle sx={{ bgcolor: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white", py: 3.5 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <BatteryFullIcon sx={{ fontSize: 42 }} />
                            <Box>
                                <Typography variant="h5" fontWeight={800}>
                                    {selectedBattery?.serialNumber || "Chi tiết pin"}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                                    {selectedBattery?.batteryName} • ID: {selectedBattery?.id}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={() => setOpenDetail(false)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ bgcolor: "#f8fafc", p: 0 }}>
                    {detailLoading ? (
                        <Box textAlign="center" py={12}>
                            <CircularProgress size={68} thickness={5} />
                            <Typography variant="h6" mt={3} color="text.secondary">
                                Đang tải thông tin pin...
                            </Typography>
                        </Box>
                    ) : !selectedBattery ? (
                        <Alert severity="error" sx={{ m: 4 }}>
                            Không thể tải thông tin pin. Vui lòng thử lại.
                        </Alert>
                    ) : (
                        <Box sx={{ p: { xs: 3, sm: 5 } }}>
                            <Paper
                                elevation={10}
                                sx={{
                                    p: 5,
                                    borderRadius: 4,
                                    background: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)",
                                    border: "1px solid #bbf7d0",
                                    mb: 4,
                                }}
                            >
                                <Grid container spacing={6} alignItems="center">
                                    {/* SoH */}
                                    <Grid item xs={12} md={7}>
                                        <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                                            State of Health (SoH)
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={2} mt={1}>
                                            <Typography
                                                variant="h1"
                                                fontWeight={900}
                                                sx={{
                                                    fontSize: { xs: "3.5rem", sm: "4.5rem" },
                                                    background: `linear-gradient(90deg, ${getSoHColor(selectedBattery.stateOfHealth)} 0%, ${getSoHColor(selectedBattery.stateOfHealth)}cc 100%)`,
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                }}
                                            >
                                                {selectedBattery.stateOfHealth}
                                                <span style={{ fontSize: "0.5em", verticalAlign: "super" }}>%</span>
                                            </Typography>
                                            {selectedBattery.stateOfHealth < 80 && (
                                                <BatteryAlertIcon sx={{ fontSize: 56, color: "#dc2626", opacity: 0.8 }} />
                                            )}
                                            {selectedBattery.stateOfHealth >= 95 && (
                                                <CheckCircleIcon sx={{ fontSize: 56, color: "#10b981" }} />
                                            )}
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={selectedBattery.stateOfHealth}
                                            sx={{
                                                mt: 3,
                                                height: 16,
                                                borderRadius: 8,
                                                bgcolor: "#fee2e2",
                                                "& .MuiLinearProgress-bar": {
                                                    borderRadius: 8,
                                                    background: getSoHColor(selectedBattery.stateOfHealth),
                                                },
                                            }}
                                        />
                                    </Grid>

                                    {/* Charge Percent */}
                                    <Grid item xs={12} md={5} textAlign="center">
                                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                            Mức pin hiện tại
                                        </Typography>
                                        <Box position="relative" display="inline-flex">
                                            <CircularProgress
                                                variant="determinate"
                                                value={selectedBattery.chargePercent}
                                                size={140}
                                                thickness={7}
                                                sx={{
                                                    color:
                                                        selectedBattery.chargePercent > 70
                                                            ? "#10b981"
                                                            : selectedBattery.chargePercent > 30
                                                                ? "#f59e0b"
                                                                : "#ef4444",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    position: "absolute",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="h3" fontWeight={800} color="#059669">
                                                    {selectedBattery.chargePercent}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                                {/* Cập nhật SoH */}
                                <Box
                                    sx={{
                                        mt: 5,
                                        p: 4,
                                        bgcolor: "#fffbeb",
                                        borderRadius: 3,
                                        border: "2px dashed #fbbf24",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700} color="#92400e" gutterBottom>
                                        Cập nhật State of Health (SoH)
                                    </Typography>
                                    <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                                        <TextField
                                            label="SoH mới (%)"
                                            type="number"
                                            size="large"
                                            value={sohInput}
                                            onChange={(e) => setSohInput(e.target.value)}
                                            onBlur={handleUpdateSoH}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateSoH()}
                                            disabled={updatingSoH}
                                            InputProps={{
                                                endAdornment: updatingSoH ? <CircularProgress size={20} /> : <EditIcon color="action" />,
                                                inputProps: { min: 0, max: 100, step: 0.1 },
                                            }}
                                            sx={{
                                                width: 220,
                                                "& .MuiOutlinedInput-root": { fontSize: "1.3rem", fontWeight: 700 },
                                            }}
                                        />
                                        <Typography variant="body1" color="text.secondary">
                                            Nhấn <strong>Enter</strong> hoặc rời khỏi ô để lưu ngay
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Paper>

                            {/* Thông tin chi tiết */}
                            <Grid container spacing={3}>
                                {[
                                    { label: "Trạng thái", value: getStatusChip(selectedBattery.status) },
                                    { label: "Trạm hiện tại", value: selectedBattery.stationName },
                                    { label: "Chu kỳ sử dụng", value: selectedBattery.totalCycleCount },
                                    { label: "Số lần đổi pin", value: selectedBattery.swapCount ?? "Chưa đổi" },
                                    { label: "Dung lượng định mức", value: `${selectedBattery.initialCapacity.toFixed(0)} mAh` },
                                    { label: "Dung lượng hiện tại", value: `${selectedBattery.currentCapacity.toFixed(0)} mAh` },
                                ].map((item, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#ffffff", border: "1px solid #e2e8f0" }}>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {item.label}
                                            </Typography>
                                            <Typography variant="h6" fontWeight={700}>
                                                {item.value}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box textAlign="center" mt={6}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<HistoryIcon />}
                                    onClick={() => handleViewHistory(selectedBattery.id)}
                                    sx={{
                                        bgcolor: "#1e40af",
                                        px: 7,
                                        py: 2,
                                        borderRadius: 3,
                                        fontSize: "1.1rem",
                                        boxShadow: "0 10px 20px rgba(30,64,175,0.25)",
                                        "&:hover": { bgcolor: "#1e3a8a" },
                                    }}
                                >
                                    Xem Lịch Sử Hoạt Động
                                </Button>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* ==================== LỊCH SỬ - GIỮ NGUYÊN NHƯ CŨ ==================== */}
            <Dialog open={openHistory} onClose={() => setOpenHistory(false)} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ bgcolor: "#1e40af", color: "white" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={600}>
                            <HistoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                            Lịch Sử Pin: {selectedBattery?.serialNumber}
                        </Typography>
                        <IconButton onClick={() => setOpenHistory(false)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {historyLoading ? (
                        <Box textAlign="center" py={6}>
                            <CircularProgress />
                        </Box>
                    ) : batteryHistory.length === 0 ? (
                        <Alert severity="info">Chưa có lịch sử hoạt động</Alert>
                    ) : (
                        <Timeline>
                            {batteryHistory.map((item, index) => (
                                <TimelineItem key={item.id}>
                                    <TimelineOppositeContent color="text.secondary">
                                        {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={item.eventType === "SOH_UPDATED" ? "primary" : "grey"}>
                                            {item.eventType === "SOH_UPDATED" ? <EditIcon /> : <BatteryFullIcon />}
                                        </TimelineDot>
                                        {index < batteryHistory.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper elevation={3} sx={{ p: 3 }}>
                                            <Typography fontWeight={600}>
                                                {item.eventType === "SOH_UPDATED" ? "Cập nhật SoH" : "Sự kiện"}
                                            </Typography>
                                            <Typography><strong>Người thực hiện:</strong> {item.performedByUsername}</Typography>
                                            <Typography><strong>Trạm:</strong> {item.stationName}</Typography>
                                            <Typography><strong>Thay đổi:</strong> {item.oldValue} → {item.newValue}</Typography>
                                            {item.notes && (
                                                <Typography color="text.secondary" fontStyle="italic">
                                                    {item.notes}
                                                </Typography>
                                            )}
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    )}
                </DialogContent>
            </Dialog>
        </PageContainer>
    );
};

export default StaffBatteryAtStationList;