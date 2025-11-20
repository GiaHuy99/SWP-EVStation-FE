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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { PageContainer, ListCard, Title, TableWrapper, StyledTextField, FullWidthBox, EditButton, DeleteButton, CreateButton } from "../../../styles/AdminDashboardStyles";
import { BatterySerial } from "../types/BatterySerialTypes";
import TablePagination from "../../../components/Pagination/TablePagination";

const BatterySerialList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { serials, loading, error } = useAppSelector((state) => state.batterySerials);
    const { batteries } = useAppSelector((state) => state.battery);
    const { stations } = useAppSelector((state) => state.station);

    // STATE CHO BỘ LỌC
    const [search, setSearch] = useState("");
    const [selectedStation, setSelectedStation] = useState<number | "">(""); // "" = tất cả

    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingSerial, setEditingSerial] = useState<BatterySerial | null>(null);

    // PHÂN TRANG
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchBatterySerials());
    }, [dispatch]);

    // RESET TRANG KHI LỌC THAY ĐỔI
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedStation]);

    // LỌC DỮ LIỆU THEO 2 TIÊU CHÍ
    const filtered = serials.filter((s) => {
        const matchSearch =
            s.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
            (s.batteryName?.toLowerCase().includes(search.toLowerCase()) ?? false);

        const matchStation =
            selectedStation === "" || s.stationId === selectedStation;

        return matchSearch && matchStation;
    });

    // PHÂN TRANG
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSerials = filtered.slice(startIndex, startIndex + itemsPerPage);

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
        const payload = {
            serialNumber: editingSerial.serialNumber,
            status: editingSerial.status,
            stationId: editingSerial.stationId,
            batteryId: editingSerial.batteryId,
        };
        dispatch(updateBatterySerial({ id: editingSerial.id, payload }))
            .unwrap()
            .then(() => handleCloseUpdate());
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

    if (error) {
        return (
            <PageContainer>
                <ListCard>
                    <Box p={4}>
                        <Typography color="error" align="center">Lỗi: {error}</Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    {/* HEADER */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Title>Danh Sách Serial Pin</Title>
                        <CreateButton onClick={() => window.location.href = "/battery-serials/create"}>
                            Tạo Serial Mới
                        </CreateButton>
                    </Box>

                    {/* BỘ LỌC: TÌM KIẾM + THEO TRẠM */}
                    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                        {/* Tìm kiếm */}
                        <Paper sx={{ p: 1, display: "flex", alignItems: "center", width: 400 }}>
                            <InputBase
                                placeholder="Tìm serial hoặc tên pin..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ ml: 1, flex: 1 }}
                            />
                            <IconButton><SearchIcon /></IconButton>
                        </Paper>

                        {/* Lọc theo trạm */}
                        <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel>Lọc theo trạm</InputLabel>
                            <Select
                                value={selectedStation}
                                label="Lọc theo trạm"
                                onChange={(e) => setSelectedStation(e.target.value as number | "")}
                            >
                                <MenuItem value="">Tất cả trạm</MenuItem>
                                {stations.map((st) => (
                                    <MenuItem key={st.id} value={st.id}>
                                        {st.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* BẢNG */}
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
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 3,
                                                    fontSize: "0.75rem",
                                                    bgcolor:
                                                        s.status === "AVAILABLE" ? "#d1fae5" :
                                                            s.status === "IN_USE" ? "#dbeafe" :
                                                                s.status === "DAMAGED" ? "#fee2e2" : "#fef3c7",
                                                    color:
                                                        s.status === "AVAILABLE" ? "#065f46" :
                                                            s.status === "IN_USE" ? "#1e40af" :
                                                                s.status === "DAMAGED" ? "#991b1b" : "#92400e",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {s.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{s.stationName || "—"}</TableCell>
                                        <TableCell align="center">
                                            <EditButton size="small" startIcon={<EditIcon />} onClick={() => handleOpenUpdate(s)}>
                                                Cập nhật
                                            </EditButton>
                                            <DeleteButton
                                                size="small"
                                                onClick={() => {
                                                    if (window.confirm("Xóa serial này?")) {
                                                        dispatch(deleteBatterySerial(s.id));
                                                    }
                                                }}
                                            >
                                                Xóa
                                            </DeleteButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>

                    {/* PHÂN TRANG */}
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                    />
                </Box>
            </ListCard>

            {/* DIALOG CẬP NHẬT */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth maxWidth="sm">
                <DialogTitle>Cập nhật Serial Pin</DialogTitle>
                <DialogContent dividers>
                    {editingSerial && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <StyledTextField label="Số Seri" value={editingSerial.serialNumber} disabled fullWidth />
                            <StyledTextField
                                select
                                label="Loại Pin"
                                value={editingSerial.batteryId}
                                onChange={(e) => setEditingSerial({
                                    ...editingSerial,
                                    batteryId: Number(e.target.value),
                                    batteryName: batteries.find(b => b.id === Number(e.target.value))?.name || ""
                                })}
                                fullWidth
                            >
                                {batteries.map(b => (
                                    <MenuItem key={b.id} value={b.id}>{b.name} (ID: {b.id})</MenuItem>
                                ))}
                            </StyledTextField>
                            <StyledTextField
                                select
                                label="Trạng thái"
                                value={editingSerial.status}
                                onChange={(e) => setEditingSerial({ ...editingSerial, status: e.target.value as any })}
                                fullWidth
                            >
                                {["AVAILABLE", "IN_USE", "DAMAGED", "MAINTENANCE"].map(s => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </StyledTextField>
                            <StyledTextField
                                select
                                label="Trạm"
                                value={editingSerial.stationId ?? ""}
                                onChange={(e) => setEditingSerial({
                                    ...editingSerial,
                                    stationId: e.target.value === "" ? null : Number(e.target.value),
                                    stationName: e.target.value === "" ? null : stations.find(st => st.id === Number(e.target.value))?.name || null
                                })}
                                fullWidth
                            >
                                <MenuItem value=""><em>Không thuộc trạm</em></MenuItem>
                                {stations.map(s => (
                                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                ))}
                            </StyledTextField>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <FullWidthBox sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button onClick={handleCloseUpdate}>Hủy</Button>
                        <Button variant="contained" onClick={handleUpdate} sx={{ background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)" }}>
                            Cập nhật
                        </Button>
                    </FullWidthBox>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default BatterySerialList;