// src/features/batteryType/components/BatteryTypeList.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {deleteBattery, fetchBatteries, updateBattery} from "../BatteryThunk";
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
} from "../../../styles/AdminDashboardStyles";

const BatteryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { batteries, loading, error } = useAppSelector((state) => state.battery);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingBatteryType, setEditingBatteryType] = useState<BatteryType | null>(null);

    useEffect(() => {
        dispatch(fetchBatteries());
    }, [dispatch]);

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
                                {batteries.map((bt) => (
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
                                            <Button
                                                size="small"
                                                onClick={() => setEditingBatteryType(bt)}
                                                sx={{
                                                    mr: 1,
                                                    borderRadius: "8px",
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    border: "1.5px solid #22C55E",
                                                    color: "#22C55E",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(34, 197, 94, 0.08)",
                                                        borderColor: "#16A34A",
                                                        transform: "translateY(-1px)",
                                                    },
                                                }}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => dispatch(deleteBattery(bt.id))}
                                                sx={{
                                                    minWidth: 64,
                                                    fontWeight: 600,
                                                    backgroundColor: "#ef4444", // Red
                                                    color: "#ffffff",
                                                    boxShadow: "0 2px 6px rgba(239, 68, 68, 0.2)",

                                                    "&:active": {
                                                        transform: "translateY(0)",
                                                    },
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