// src/features/batterySerial/components/BatterySerialList.tsx
import React, { useEffect, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../app/Hooks";
import {
    fetchBatterySerials,
    deleteBatterySerial,
    updateBatterySerial,
} from "../BatterySerialThunk";
import { transferBattery, updateBatterySoH } from "../BatterySerialThunk"; // ĐÃ THÊM updateBatterySoH

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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'; // Icon mới

import { PageContainer, ListCard, Title, TableWrapper, EditButton, DeleteButton, CreateButton } from "../../../styles/AdminDashboardStyles";
import { BatterySerial } from "../types/BatterySerialTypes";
import TablePagination from "../../../components/Pagination/TablePagination";
import { message } from "antd";

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

    // MODAL THAY ĐỔI SoH (MỚI)
    const [openSoH, setOpenSoH] = useState(false);
    const [selectedForSoH, setSelectedForSoH] = useState<BatterySerial | null>(null);
    const [newSoH, setNewSoH] = useState<string>("");

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

    // MỞ MODAL CHUYỂN PIN
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

    // XỬ LÝ CHUYỂN PIN
    const handleTransfer = async () => {
        if (!selectedSerial || !selectedSerial.stationId || !toStationId || toStationId === selectedSerial.stationId) {
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

    // MỞ MODAL THAY ĐỔI SoH (CHỈ KHI IN_USE)
    const handleOpenSoH = (serial: BatterySerial) => {
        if (serial.status !== "IN_USE") {
            message.warning("Chỉ pin đang sử dụng (IN_USE) mới được thay đổi SoH!");
            return;
        }
        setSelectedForSoH(serial);
        setNewSoH(serial.soH?.toString() || "90");
        setOpenSoH(true);
    };

    // XỬ LÝ CẬP NHẬT SoH
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
            dispatch(fetchBatterySerials()); // Reload để thấy thay đổi
        } catch (err: any) {
            message.error(err?.message || "Cập nhật SoH thất bại!");
        }
    };

    // Cập nhật modal (giữ nguyên)
    const handleOpenUpdate = (serial: BatterySerial) => {
        setEditingSerial(serial);
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setEditingSerial(null);
    };

    const handleUpdate = () => {
        if (!editingSerial) return;
        dispatch(updateBatterySerial({
            id: editingSerial.id,
            payload: {
                serialNumber: editingSerial.serialNumber,
                status: editingSerial.status,
                stationId: editingSerial.stationId,
                batteryId: editingSerial.batteryId,
            }
        })).unwrap().then(() => handleCloseUpdate());
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

                    {/* BẢNG + CÁC NÚT */}
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
                                        <TableCell align="center">
                                            <EditButton size="small" startIcon={<EditIcon />} onClick={() => handleOpenUpdate(s)}>
                                                Cập nhật
                                            </EditButton>

                                            {/* NÚT CHUYỂN PIN */}
                                            {s.stationId && (
                                                <Button size="small" variant="outlined" startIcon={<TransferWithinAStationIcon />}
                                                        onClick={() => handleOpenTransfer(s)}
                                                        sx={{ ml: 1, borderColor: "#04c4d9", color: "#04c4d9", '&:hover': { bgcolor: "#e3fcef" } }}>
                                                    Chuyển Pin
                                                </Button>
                                            )}

                                            {/* NÚT THAY ĐỔI SoH – CHỈ HIỆN KHI IN_USE */}
                                            {s.status === "IN_USE" && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    startIcon={<HealthAndSafetyIcon />}
                                                    onClick={() => handleOpenSoH(s)}
                                                    sx={{
                                                        ml: 1,
                                                        bgcolor: "#ff9800",
                                                        color: "white",
                                                        fontSize: "0.75rem",
                                                        '&:hover': { bgcolor: "#f57c00" }
                                                    }}
                                                >
                                                    Thay đổi tình trạng pin
                                                </Button>
                                            )}

                                            <DeleteButton size="small" onClick={() => {
                                                if (window.confirm("Xóa serial này?")) {
                                                    dispatch(deleteBatterySerial(s.id));
                                                }
                                            }}>
                                                Xóa
                                            </DeleteButton>
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

            {/* MODAL CHUYỂN PIN */}
            <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#04c4d9', color: 'white', fontWeight: 600 }}>
                    Chuyển Pin Giữa Các Trạm
                </DialogTitle>
                <DialogContent dividers>
                    {selectedSerial && (
                        <Box sx={{ py: 2 }}>
                            <Typography variant="h6" gutterBottom color="#1a3681">{selectedSerial.serialNumber}</Typography>
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
                    <Button variant="contained" onClick={handleTransfer} disabled={!toStationId} sx={{ bgcolor: '#04c4d9', '&:hover': { bgcolor: '#038b9a' } }}>
                        Xác Nhận Chuyển
                    </Button>
                </DialogActions>
            </Dialog>

            {/* MODAL THAY ĐỔI SoH – SIÊU ĐẸP */}
            <Dialog open={openSoH} onClose={() => setOpenSoH(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ bgcolor: '#ff9800', color: 'white', fontWeight: 600, textAlign: "center" }}>
                    Thay Đổi Tình Trạng Pin (SoH)
                </DialogTitle>
                <DialogContent dividers>
                    {selectedForSoH && (
                        <Box sx={{ py: 3, textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom color="#1a3681">
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
                    <Button
                        variant="contained"
                        onClick={handleUpdateSoH}
                        sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#f57c00' }, minWidth: 120 }}
                    >
                        Cập Nhật SoH
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal cập nhật giữ nguyên */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                {/* Nội dung cũ giữ nguyên */}
            </Dialog>
        </PageContainer>
    );
};

export default BatterySerialList;