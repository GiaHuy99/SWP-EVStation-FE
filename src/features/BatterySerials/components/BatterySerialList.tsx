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
import {
    transferBattery, // ← THÊM THUNK MỚI
} from "../BatterySerialThunk"; // bạn sẽ tạo ở dưới

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

import { PageContainer, ListCard, Title, TableWrapper, StyledTextField, FullWidthBox, EditButton, DeleteButton, CreateButton } from "../../../styles/AdminDashboardStyles";
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
        if (
            !selectedSerial ||
            selectedSerial.stationId === null ||
            !toStationId ||
            toStationId === selectedSerial.stationId
        ) {
            message.warning("Vui lòng chọn trạm đích khác trạm hiện tại!");
            return;
        }

        try {
            await dispatch(transferBattery({
                batteryId: selectedSerial.id,           // ĐÚNG – ID của battery-serials
                fromStationId: selectedSerial.stationId!,
                toStationId: Number(toStationId),
                notes: notes || "Chuyển pin giữa các trạm"
            })).unwrap();

            message.success(`Đã chuyển pin ${selectedSerial.serialNumber} thành công!`);
            setOpenTransfer(false);
            setSelectedSerial(null);
            setToStationId("");
            setNotes("");
            // Reload danh sách để cập nhật trạm mới
            dispatch(fetchBatterySerials());
        } catch (err: any) {
            message.error(err?.message || "Chuyển pin thất bại!");
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

                    {/* BẢNG + NÚT CHUYỂN PIN */}
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Số Seri</strong></TableCell>
                                    <TableCell><strong>Trạng thái</strong></TableCell>
                                    <TableCell><strong>Trạm</strong></TableCell>
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
                                                bgcolor: s.status === "AVAILABLE" ? "#d1fae5" : s.status === "IN_USE" ? "#dbeafe" : "#fee2e2",
                                                color: s.status === "AVAILABLE" ? "#065f46" : s.status === "IN_USE" ? "#1e40af" : "#991b1b",
                                                fontWeight: 600,
                                            }}>
                                                {s.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{s.stationName || "—"}</TableCell>
                                        <TableCell align="center">
                                            <EditButton size="small" startIcon={<EditIcon />} onClick={() => handleOpenUpdate(s)}>
                                                Cập nhật
                                            </EditButton>

                                            {/* NÚT CHUYỂN PIN */}
                                            {s.stationId && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    startIcon={<TransferWithinAStationIcon />}
                                                    onClick={() => handleOpenTransfer(s)}
                                                    sx={{ ml: 1, borderColor: "#04c4d9", color: "#04c4d9", '&:hover': { bgcolor: "#e3fcef" } }}
                                                >
                                                    Chuyển Pin
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

            {/* MODAL CHUYỂN PIN – ĐẸP LUNG LINH */}
            <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#04c4d9', color: 'white', fontWeight: 600 }}>
                    Chuyển Pin Giữa Các Trạm
                </DialogTitle>
                <DialogContent dividers>
                    {selectedSerial && (
                        <Box sx={{ py: 2 }}>
                            <Typography variant="h6" gutterBottom color="#1a3681">
                                {selectedSerial.serialNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Loại pin: <strong>{selectedSerial.batteryName}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Trạm hiện tại: <strong>{selectedSerial.stationName}</strong>
                            </Typography>

                            <FormControl fullWidth sx={{ mt: 3 }}>
                                <InputLabel>Chuyển đến trạm</InputLabel>
                                <Select
                                    value={toStationId}
                                    label="Chuyển đến trạm"
                                    onChange={(e) => setToStationId(e.target.value as number)}
                                >
                                    {stations
                                        .filter(st => st.id !== selectedSerial.stationId)
                                        .map(st => (
                                            <MenuItem key={st.id} value={st.id}>
                                                {st.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Ghi chú (tùy chọn)"
                                multiline
                                rows={2}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                fullWidth
                                sx={{ mt: 2 }}
                                placeholder="Ví dụ: Cân bằng tồn kho"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenTransfer(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleTransfer}
                        disabled={!toStationId}
                        sx={{ bgcolor: '#04c4d9', '&:hover': { bgcolor: '#038b9a' } }}
                    >
                        Xác Nhận Chuyển
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal cập nhật giữ nguyên */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                {/* ... giữ nguyên phần cũ */}
            </Dialog>
        </PageContainer>
    );
};

export default BatterySerialList;