// src/features/staff-swap/components/PendingSwapList.tsx

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchPendingSwaps, confirmSwap, rejectSwap } from "../ConfirmThunks";
import { clearMessages } from "../ConfirmSlices";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Button, CircularProgress, Alert, Box, Typography,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import {
    PageContainer, ListCard, Title, TableWrapper,
    DetailCard, DetailItem, DetailLabel, DetailValue
} from "../../../styles/AdminDashboardStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CancelOutlineIcon from "@mui/icons-material/CancelOutline"; ← ĐÃ BỎ

const PendingSwapList = () => {
    const dispatch = useAppDispatch();
    const { pendingList, loading, actionLoading, error, successMessage } = useAppSelector(
        (state) => state.confimSwap
    );

    const [selectedSwap, setSelectedSwap] = useState<any>(null);
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        dispatch(fetchPendingSwaps());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 4000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, dispatch]);

    const handleConfirm = (id: number) => {
        dispatch(confirmSwap(id));
    };

    const handleReject = (id: number) => {
        dispatch(rejectSwap(id));
    };

    const handleViewDetail = (swap: any) => {
        setSelectedSwap(swap);
        setOpenDetail(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED": return "#10b981";
            case "PENDING": return "#f59e0b";
            case "REJECTED": return "#ef4444";
            default: return "#64748b";
        }
    };

    return (
        <PageContainer maxWidth="lg">
            <ListCard elevation={0}>
                <Title>
                    Duyệt Yêu Cầu Đổi Pin
                </Title>

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
                        {successMessage}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress size={48} thickness={4} />
                    </Box>
                ) : pendingList.length === 0 ? (
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                        Không có yêu cầu nào đang chờ duyệt
                    </Alert>
                ) : (
                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Người dùng</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Trạm</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Pin</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }}>Thời gian</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: "#4C428C" }} align="center">
                                        Hành động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingList.map((swap) => (
                                    <TableRow
                                        key={swap.id}
                                        hover
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "rgba(4, 196, 217, 0.03)",
                                                transform: "translateY(-1px)",
                                                transition: "all 0.2s ease",
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography fontWeight={500}>{swap.username}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleViewDetail(swap)}
                                                    sx={{ color: "#64748b" }}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{swap.stationName}</TableCell>
                                        <TableCell>
                                            <code style={{ fontSize: "0.875rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                                                {swap.batterySerialNumber}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {format(new Date(swap.timestamp), "PPPp", { locale: vi })}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* NÚT DUYỆT */}
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={actionLoading[swap.id] ? null : <CheckCircleOutlineIcon />}
                                                onClick={() => handleConfirm(swap.id)}
                                                disabled={!!actionLoading[swap.id]}
                                                sx={{
                                                    mr: 1,
                                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                                    "&:hover": { background: "linear-gradient(135deg, #059669, #047857)" },
                                                    minWidth: 80,
                                                }}
                                            >
                                                {actionLoading[swap.id] ? <CircularProgress size={16} color="inherit" /> : "Duyệt"}
                                            </Button>

                                            {/* NÚT TỪ CHỐI – DÙNG ICON CLOSE CÓ SẴN */}
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={actionLoading[swap.id] ? null : <CloseIcon />}
                                                onClick={() => handleReject(swap.id)}
                                                disabled={!!actionLoading[swap.id]}
                                                sx={{
                                                    borderColor: "#ef4444",
                                                    color: "#ef4444",
                                                    "&:hover": {
                                                        borderColor: "#dc2626",
                                                        color: "#dc2626",
                                                        backgroundColor: "rgba(239, 68, 68, 0.04)",
                                                    },
                                                    minWidth: 80,
                                                }}
                                            >
                                                {actionLoading[swap.id] ? <CircularProgress size={16} color="inherit" /> : "Từ chối"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                )}
            </ListCard>

            {/* DIALOG CHI TIẾT */}
            <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ background: "linear-gradient(135deg, #4C428C, #04C4D9)", color: "white" }}>
                    Chi Tiết Yêu Cầu Đổi Pin
                </DialogTitle>
                <DialogContent dividers>
                    {selectedSwap && (
                        <DetailCard elevation={0}>
                            <DetailItem>
                                <DetailLabel>Mã yêu cầu:</DetailLabel>
                                <DetailValue>#{selectedSwap.id}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Người dùng:</DetailLabel>
                                <DetailValue>{selectedSwap.username}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Xe ID:</DetailLabel>
                                <DetailValue>{selectedSwap.vehicleId}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Trạm đổi pin:</DetailLabel>
                                <DetailValue>{selectedSwap.stationName}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Số seri pin:</DetailLabel>
                                <DetailValue>
                                    <code style={{ background: "#f8fafc", padding: "2px 6px", borderRadius: "4px" }}>
                                        {selectedSwap.batterySerialNumber}
                                    </code>
                                </DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Trạng thái:</DetailLabel>
                                <DetailValue>
                                    <Box
                                        component="span"
                                        sx={{
                                            bgcolor: getStatusColor(selectedSwap.status),
                                            color: "white",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: "6px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {selectedSwap.status}
                                    </Box>
                                </DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Thời gian yêu cầu:</DetailLabel>
                                <DetailValue>
                                    {format(new Date(selectedSwap.timestamp), "PPPp", { locale: vi })}
                                </DetailValue>
                            </DetailItem>
                        </DetailCard>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDetail(false)} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default PendingSwapList;