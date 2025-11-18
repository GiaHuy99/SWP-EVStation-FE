// src/features/battery/components/BatteryListForm.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { deleteBattery, fetchBatteries, updateBattery } from "../BatteryThunk";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BatteryTypeDetail from "./BatteryDetailForm";
import UpdateBatteryTypeForm from "./UpdateBatteryForm";
import { BatteryType } from "../types/BatteryType"; // ĐÚNG: Loại pin
import {
    PageContainer,
    ListCard,
    Title,
    TableWrapper,
    EditButton,
    DeleteButton,
} from "../../../styles/AdminDashboardStyles";
import TablePagination from "../../../components/Pagination/TablePagination";

const BatteryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { batteries, loading, error } = useAppSelector((state) => state.battery);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingBatteryType, setEditingBatteryType] = useState<BatteryType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchBatteries());
    }, [dispatch]);

    const totalPages = Math.ceil(batteries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBatteries = batteries.slice(startIndex, startIndex + itemsPerPage);

    if (loading && batteries.length === 0) {
        return (
            <PageContainer>
                <ListCard>
                    <Box display="flex" justifyContent="center" p={6}>
                        <CircularProgress size={48} thickness={4} />
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
                        <Typography color="error" align="center">
                            Lỗi: {error}
                        </Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box sx={{ p: 4 }}>
                    {/* Title + Add Button */}
                    <Title sx={{ px: 4, pt: 3 }}>Danh Sách Trạm Pin</Title>

                    {/* Table */}
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Loại Xe</strong></TableCell>
                                    <TableCell><strong>Dung Lượng (Ah)</strong></TableCell>
                                    <TableCell><strong>Mô Tả</strong></TableCell>
                                    <TableCell align="center"><strong>Thao tác</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedBatteries.map((bt) => (
                                    <TableRow
                                        key={bt.id}
                                        onClick={() => setSelectedId(bt.id)}
                                        sx={{
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "rgba(4, 196, 217, 0.04)",
                                                transform: "translateY(-1px)",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                            },
                                            "& td": {
                                                borderBottom: "1px solid #e2e8f0",
                                            },
                                        }}
                                    >
                                        <TableCell>{bt.name}</TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: "12px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 600,
                                                    backgroundColor: "#e0f2fe",
                                                    color: "#0369a1",
                                                }}
                                            >
                                                {bt.type}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{bt.designCapacity} Ah</TableCell>
                                        <TableCell sx={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {bt.description || "—"}
                                        </TableCell>
                                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                            <EditButton
                                                size="small"
                                                onClick={() => setEditingBatteryType(bt)}
                                                sx={{ mr: 1 }}
                                            >
                                                Cập nhật
                                            </EditButton>
                                            <DeleteButton
                                                size="small"
                                                onClick={() => dispatch(deleteBattery(bt.id))}
                                            >
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
                        totalItems={batteries.length}
                        itemsPerPage={itemsPerPage}
                    />
                </Box>

                {/* Update Dialog */}
                <UpdateBatteryTypeForm
                    open={Boolean(editingBatteryType)}
                    batteryType={editingBatteryType}
                    onClose={() => setEditingBatteryType(null)}
                />

                {/* Detail Dialog */}
                <Dialog open={selectedId !== null} onClose={() => setSelectedId(null)} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Chi Tiết Loại Pin
                        <IconButton
                            onClick={() => setSelectedId(null)}
                            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Box p={3}>
                        {selectedId && <BatteryTypeDetail id={selectedId} />}
                    </Box>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default BatteryList;
