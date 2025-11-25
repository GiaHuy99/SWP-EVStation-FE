// src/features/batterySerial/components/BatterySerialList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchBatterySerials,
    deleteBatterySerial,
    updateBatterySerial,
    transferBattery,
    updateBatterySoH
} from "../BatterySerialThunk";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Button,
    Box,
    Typography,
    Paper,
    InputBase,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    TextField,
    Stack,
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

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ElectricBikeIcon from '@mui/icons-material/ElectricBike';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { PageContainer, ListCard, Title, TableWrapper, EditButton, CreateButton } from "../../../styles/AdminDashboardStyles";
import { BatterySerial } from "../types/BatterySerialTypes";
import TablePagination from "../../../components/Pagination/TablePagination";
import { message } from "antd";
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Interface lịch sử pin
interface BatteryHistoryItem {
    id: number;
    eventType: string;
    oldValue: string;
    newValue: string;
    stationId?: number | null;
    stationName?: string | null;
    vehicleId?: number | null;
    vehicleVin?: string | null;
    performedByUsername: string;
    notes?: string | null;
    createdAt: string;
}

// COMPONENT RIÊNG CHO CÁC NÚT HÀNH ĐỘNG – ĐẸP & GỌN GÀNG
const ActionButtons: React.FC<{
    serial: BatterySerial;
    onEdit: () => void;
    onTransfer: () => void;
    onUpdateSoH: () => void;
    onViewHistory: () => void;
    onDelete: () => void;
}> = ({ serial, onEdit, onTransfer, onUpdateSoH, onViewHistory, onDelete }) => {
    return (
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ py: 0.5 }}>
            <EditButton size="small" startIcon={<EditIcon />} onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                Sửa
            </EditButton>

            {serial.stationId && (
                <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    startIcon={<TransferWithinAStationIcon />}
                    onClick={(e) => { e.stopPropagation(); onTransfer(); }}
                    sx={{ fontSize: "0.75rem", minWidth: 90 }}
                >
                    Chuyển
                </Button>
            )}

            {serial.status === "IN_USE" && (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<HealthAndSafetyIcon />}
                    onClick={(e) => { e.stopPropagation(); onUpdateSoH(); }}
                    sx={{ bgcolor: "#f97316", color: "white", fontSize: "0.75rem", minWidth: 90, '&:hover': { bgcolor: "#ea580c" } }}
                >
                    SoH
                </Button>
            )}

            <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<HistoryIcon />}
                onClick={(e) => { e.stopPropagation(); onViewHistory(); }}
                sx={{ fontSize: "0.75rem", minWidth: 100 }}
            >
                Lịch sử
            </Button>

            <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                sx={{ fontSize: "0.75rem", minWidth: 80 }}
            >
                Xóa
            </Button>
        </Stack>
    );
};

const BatterySerialList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { serials, loading } = useAppSelector((state) => state.batterySerials);
    const { stations } = useAppSelector((state) => state.station);

    // STATE CHO BỘ LỌC
    const [search, setSearch] = useState("");
    const [selectedStation, setSelectedStation] = useState<number | "">("");

    // MODAL CẬP NHẬT
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingSerial, setEditingSerial] = useState<BatterySerial | null>(null);

    // MODAL CHUYỂN PIN
    const [openTransfer, setOpenTransfer] = useState(false);
    const [selectedSerial, setSelectedSerial] = useState<BatterySerial | null>(null);
    const [toStationId, setToStationId] = useState<number | "">("");
    const [notes, setNotes] = useState("");

    // MODAL THAY ĐỔI SoH
    const [openSoH, setOpenSoH] = useState(false);
    const [selectedForSoH, setSelectedForSoH] = useState<BatterySerial | null>(null);
    const [newSoH, setNewSoH] = useState<string>("");

    // MODAL LỊCH SỬ PIN
    const [openHistory, setOpenHistory] = useState(false);
    const [historyBattery, setHistoryBattery] = useState<BatterySerial | null>(null);
    const [batteryHistory, setBatteryHistory] = useState<BatteryHistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    // PHÂN TRANG
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchBatterySerials());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedStation]);

    const filtered = serials.filter((s) => {
        const matchSearch =
            s.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
            (s.batteryName?.toLowerCase().includes(search.toLowerCase()) ?? false);
        const matchStation = selectedStation === "" || s.stationId === selectedStation;
        return matchSearch && matchStation;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSerials = filtered.slice(startIndex, startIndex + itemsPerPage);

    // XỬ LÝ LỊCH SỬ PIN
    const handleOpenHistory = async (serial: BatterySerial) => {
        setHistoryBattery(serial);
        setOpenHistory(true);
        setHistoryLoading(true);
        try {
            const res = await axiosInstance.get(`/admin/batteries/${serial.id}/history`);
            setBatteryHistory(res.data.history || []);
        } catch (err) {
            message.error("Không tải được lịch sử pin");
            setBatteryHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    // CHUYỂN PIN
    const handleOpenTransfer = (serial: BatterySerial) => {
        if (!serial.stationId) {
            message.warning("Pin này chưa thuộc trạm nào, không thể chuyển!");
            return;
        }
        setSelectedSerial(serial);
        setToStationId("");
        setNotes("");
        setOpenTransfer(true);
    };

    const handleTransfer = async () => {
        if (!selectedSerial || !toStationId || toStationId === selectedSerial.stationId) {
            message.warning("Vui lòng chọn trạm đích khác trạm hiện tại!");
            return;
        }
        try {
            await dispatch(transferBattery({
                batteryId: selectedSerial.id,
                fromStationId: selectedSerial.stationId!,
                toStationId: Number(toStationId),
                notes: notes || "Chuyển pin giữa các trạm"
            })).unwrap();
            message.success(`Đã chuyển pin ${selectedSerial.serialNumber} thành công!`);
            setOpenTransfer(false);
            dispatch(fetchBatterySerials());
        } catch (err: any) {
            message.error(err?.message || "Chuyển pin thất bại!");
        }
    };

    // CẬP NHẬT SoH
    const handleOpenSoH = (serial: BatterySerial) => {
        if (serial.status !== "IN_USE") {
            message.warning("Chỉ pin đang sử dụng (IN_USE) mới được thay đổi SoH!");
            return;
        }
        setSelectedForSoH(serial);
        setNewSoH(serial.soH?.toString() || "90");
        setOpenSoH(true);
    };

    const handleUpdateSoH = async () => {
        const value = Number(newSoH);
        if (isNaN(value) || value < 0 || value > 100) {
            message.error("Vui lòng nhập SoH hợp lệ từ 0 đến 100!");
            return;
        }
        try {
            await dispatch(updateBatterySoH({
                batteryId: selectedForSoH!.id,
                newSoH: value
            })).unwrap();
            message.success(`Cập nhật SoH pin ${selectedForSoH!.serialNumber} thành ${value}% thành công!`);
            setOpenSoH(false);
            setSelectedForSoH(null);
            setNewSoH("");
            dispatch(fetchBatterySerials());
        } catch (err: any) {
            message.error(err?.message || "Cập nhật SoH thất bại!");
        }
    };

    // CẬP NHẬT & XÓA
    const handleOpenUpdate = (serial: BatterySerial) => {
        setEditingSerial(serial);
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setEditingSerial(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Xóa serial này thật chứ?")) {
            dispatch(deleteBatterySerial(id));
        }
    };

    const getSoHColor = (soh: number) => {
        if (soh >= 90) return "#059669";
        if (soh >= 80) return "#d97706";
        return "#dc2626";
    };

    if (loading && serials.length === 0) {
        return (
            <PageContainer>
                <ListCard>
                    <Box display="flex" justifyContent="center" p={6}>
                        <CircularProgress />
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Title>Danh Sách Serial Pin</Title>
                        <CreateButton onClick={() => window.location.href = "/battery-serials/create"}>
                            Tạo Serial Mới
                        </CreateButton>
                    </Box>

                    {/* Bộ lọc */}
                    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                        <Paper sx={{ p: 1, display: "flex", alignItems: "center", width: 400 }}>
                            <InputBase placeholder="Tìm serial hoặc tên pin..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ ml: 1, flex: 1 }} />
                            <IconButton><SearchIcon /></IconButton>
                        </Paper>
                        <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel>Lọc theo trạm</InputLabel>
                            <Select value={selectedStation} label="Lọc theo trạm" onChange={(e) => setSelectedStation(e.target.value as number | "")}>
                                <MenuItem value="">Tất cả trạm</MenuItem>
                                {stations.map((st) => (
                                    <MenuItem key={st.id} value={st.id}>{st.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* BẢNG - ĐÃ TÁCH NÚT RA RIÊNG */}
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Số Seri</strong></TableCell>
                                    <TableCell><strong>Trạng thái</strong></TableCell>
                                    <TableCell><strong>Trạm</strong></TableCell>
                                    <TableCell><strong>SoH (%)</strong></TableCell>
                                    <TableCell align="center"><strong>Hành động</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedSerials.map((s) => (
                                    <TableRow key={s.id} hover>
                                        <TableCell>
                                            <code style={{ fontWeight: 600, color: "#1a3681" }}>
                                                {s.serialNumber}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Box component="span" sx={{
                                                px: 1.5, py: 0.5, borderRadius: 3, fontSize: "0.75rem",
                                                bgcolor: s.status === "AVAILABLE" ? "#d1fae5" : s.status === "IN_USE" ? "#dbeafe" : s.status === "DAMAGED" ? "#fee2e2" : "#fef3c7",
                                                color: s.status === "AVAILABLE" ? "#065f46" : s.status === "IN_USE" ? "#1e40af" : s.status === "DAMAGED" ? "#991b1b" : "#92400e",
                                                fontWeight: 600,
                                            }}>
                                                {s.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{s.stationName || "—"}</TableCell>
                                        <TableCell>
                                            <strong style={{ color: (s.soH ?? 0) < 80 ? "#d32f2f" : "#1976d2" }}>
                                                {s.soH !== null && s.soH !== undefined ? `${s.soH}%` : "—"}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <ActionButtons
                                                serial={s}
                                                onEdit={() => handleOpenUpdate(s)}
                                                onTransfer={() => handleOpenTransfer(s)}
                                                onUpdateSoH={() => handleOpenSoH(s)}
                                                onViewHistory={() => handleOpenHistory(s)}
                                                onDelete={() => handleDelete(s.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                    />
                </Box>
            </ListCard>

            {/* MODAL LỊCH SỬ PIN */}
            <Dialog open={openHistory} onClose={() => setOpenHistory(false)} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ bgcolor: "#1e40af", color: "white" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={600}>
                            <HistoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                            Lịch Sử Pin: {historyBattery?.serialNumber}
                        </Typography>
                        <IconButton onClick={() => setOpenHistory(false)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {historyLoading ? (
                        <Box textAlign="center" py={8}><CircularProgress size={60} /></Box>
                    ) : batteryHistory.length === 0 ? (
                        <Typography textAlign="center" color="text.secondary" py={6} variant="h6">
                            Chưa có lịch sử hoạt động
                        </Typography>
                    ) : (
                        <Timeline>
                            {batteryHistory.map((item, index) => {
                                const renderEvent = () => {
                                    switch (item.eventType) {
                                        case "CREATED": return { title: "Tạo pin mới", icon: <BatteryFullIcon />, color: "success", desc: "Pin được thêm vào hệ thống" };
                                        case "STATUS_CHANGED": return { title: "Thay đổi trạng thái", icon: <CheckCircleIcon />, color: "info", desc: <>Từ <strong>{item.oldValue}</strong> → <strong>{item.newValue}</strong></> };
                                        case "TRANSFERRED":
                                        case "STATION_CHANGED": return { title: "Chuyển trạm", icon: <ChangeCircleIcon />, color: "secondary", desc: <>Từ <strong>{item.oldValue}</strong> → <strong>{item.newValue || item.stationName}</strong></> };
                                        case "VEHICLE_ASSIGNED": return { title: "Gắn vào xe", icon: <ElectricBikeIcon />, color: "primary", desc: <>Xe: <strong>{item.vehicleVin || "Không rõ"}</strong></> };
                                        case "VEHICLE_RETURNED": return { title: "Trả pin về trạm", icon: <KeyboardReturnIcon />, color: "success", desc: <>Từ xe <strong>{item.vehicleVin}</strong> → <strong>{item.stationName}</strong></> };
                                        case "SOH_UPDATED": return { title: "Cập nhật SoH", icon: <EditOutlinedIcon />, color: "warning", desc: <>SoH: <strong style={{ color: "#dc2626" }}>{item.oldValue}</strong> → <strong style={{ color: getSoHColor(parseFloat(item.newValue)) }}>{item.newValue}</strong></> };
                                        case "SWAPPED": return { title: "Đổi pin thành công", icon: <SwapHorizIcon />, color: "success", desc: <>Đổi pin tại trạm: <strong>{item.stationName}</strong></> };
                                        default: return { title: item.eventType, icon: <HistoryIcon />, color: "grey", desc: item.notes || "Không có mô tả" };
                                    }
                                };
                                const event = renderEvent();

                                return (
                                    <TimelineItem key={item.id}>
                                        <TimelineOppositeContent color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                                            {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color={event.color as any} variant={event.color === "grey" ? "outlined" : "filled"}>
                                                {event.icon}
                                            </TimelineDot>
                                            {index < batteryHistory.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                    {event.icon}
                                                    <Typography variant="h6" fontWeight={700} color={`${event.color}.main`}>
                                                        {event.title}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Người thực hiện:</strong> {item.performedByUsername}
                                                </Typography>
                                                <Typography variant="body1" mt={1}>{event.desc}</Typography>
                                                {item.notes && (
                                                    <Typography variant="body2" color="text.secondary" fontStyle="italic" mt={2}>
                                                        Ghi chú: {item.notes}
                                                    </Typography>
                                                )}
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })}
                        </Timeline>
                    )}
                </DialogContent>
            </Dialog>

            {/* MODAL CHUYỂN PIN */}
            <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#06b6d4', color: 'white', fontWeight: 600 }}>
                    Chuyển Pin Giữa Các Trạm
                </DialogTitle>
                <DialogContent dividers>
                    {selectedSerial && (
                        <Box sx={{ py: 2 }}>
                            <Typography variant="h6" gutterBottom color="#1e40af">{selectedSerial.serialNumber}</Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Loại pin: <strong>{selectedSerial.batteryName}</strong></Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Trạm hiện tại: <strong>{selectedSerial.stationName}</strong></Typography>
                            <FormControl fullWidth sx={{ mt: 3 }}>
                                <InputLabel>Chuyển đến trạm</InputLabel>
                                <Select value={toStationId} label="Chuyển đến trạm" onChange={(e) => setToStationId(e.target.value as number)}>
                                    {stations.filter(st => st.id !== selectedSerial.stationId).map(st => (
                                        <MenuItem key={st.id} value={st.id}>{st.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField label="Ghi chú (tùy chọn)" multiline rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth sx={{ mt: 2 }} placeholder="Ví dụ: Cân bằng tồn kho" />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenTransfer(false)}>Hủy</Button>
                    <Button variant="contained" onClick={handleTransfer} disabled={!toStationId} sx={{ bgcolor: '#06b6d4', '&:hover': { bgcolor: '#0891b2' } }}>
                        Xác Nhận Chuyển
                    </Button>
                </DialogActions>
            </Dialog>

            {/* MODAL THAY ĐỔI SoH */}
            <Dialog open={openSoH} onClose={() => setOpenSoH(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ bgcolor: '#f97316', color: 'white', fontWeight: 600, textAlign: "center" }}>
                    Thay Đổi Tình Trạng Pin (SoH)
                </DialogTitle>
                <DialogContent dividers>
                    {selectedForSoH && (
                        <Box sx={{ py: 3, textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom color="#1e40af">
                                {selectedForSoH.serialNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Trạng thái: <strong style={{ color: "#1e88e5" }}>ĐANG SỬ DỤNG</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                SoH hiện tại: <strong style={{ fontSize: "1.5rem", color: "#1976d2" }}>
                                {selectedForSoH.soH !== null ? `${selectedForSoH.soH}%` : "Chưa xác định"}
                            </strong>
                            </Typography>
                            <TextField
                                label="SoH mới (%)"
                                type="number"
                                value={newSoH}
                                onChange={(e) => setNewSoH(e.target.value)}
                                fullWidth
                                inputProps={{ min: 0, max: 100, step: 0.1 }}
                                sx={{ mt: 3 }}
                                autoFocus
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                Nhập từ 0 đến 100 (có thể có số lẻ)
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, justifyContent: "center" }}>
                    <Button onClick={() => setOpenSoH(false)}>Hủy</Button>
                    <Button variant="contained" onClick={handleUpdateSoH} sx={{ bgcolor: '#f97316', '&:hover': { bgcolor: '#ea580c' }, minWidth: 120 }}>
                        Cập Nhật SoH
                    </Button>
                </DialogActions>
            </Dialog>

            {/* MODAL CẬP NHẬT (nếu bạn có form chi tiết thì để đây) */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                <DialogTitle>Cập nhật Serial Pin</DialogTitle>
                <DialogContent>
                    {/* Form cập nhật ở đây nếu cần */}
                    <Typography>Chức năng cập nhật chưa được triển khai chi tiết</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default BatterySerialList;