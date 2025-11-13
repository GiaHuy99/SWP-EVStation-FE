// src/features/batterySerial/components/BatterySerialList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchBatterySerials, deleteBatterySerial } from "../BatterySerialThunk";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    CircularProgress, Button, Box, Typography, Paper, InputBase, IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
    PageContainer, ListCard, Title, TableWrapper
} from "../../../styles/AdminDashboardStyles";

const BatterySerialList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { serials, loading, error } = useAppSelector((state) => state.batterySerials);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchBatterySerials());
    }, [dispatch]);

    const filtered = serials.filter(s =>
        s.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        (s.batteryName?.toLowerCase().includes(search.toLowerCase()))
    );

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
                        <Title>Danh Sách Serial Pin</Title>
                    <Paper sx={{ p: 1, mb: 3, display: "flex", alignItems: "center", maxWidth: 400 }}>
                        <InputBase
                            placeholder="Tìm serial hoặc pin..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <IconButton><SearchIcon /></IconButton>
                    </Paper>

                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Số Seri</strong></TableCell>
                                    <TableCell><strong>Pin</strong></TableCell>
                                    <TableCell><strong>Trạng thái</strong></TableCell>
                                    <TableCell><strong>Trạm</strong></TableCell>
                                    <TableCell align="center"><strong>Hành động</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((s) => (
                                    <TableRow key={s.id} hover>
                                        <TableCell>
                                            <code style={{ fontWeight: 600, color: "#1a3681" }}>
                                                {s.serialNumber}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <strong>{s.batteryName || "—"}</strong>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1.5, py: 0.5, borderRadius: 3, fontSize: "0.75rem",
                                                    bgcolor: s.status === "AVAILABLE" ? "#d1fae5" : s.status === "IN_USE" ? "#dbeafe" : "#fee2e2",
                                                    color: s.status === "AVAILABLE" ? "#065f46" : s.status === "IN_USE" ? "#1e40af" : "#991b1b",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {s.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{s.stationName || "—"}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => {
                                                    if (window.confirm("Xóa serial này?")) {
                                                        dispatch(deleteBatterySerial(s.id));
                                                    }
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                </Box>
            </ListCard>
        </PageContainer>
    );
};

export default BatterySerialList;