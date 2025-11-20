// src/features/invoice/InvoiceHistory.tsx
import React, { useEffect, useState } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    CircularProgress,
    Alert,
    Box,
    Chip,
    Tabs,
    Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchUserInvoices } from "../InvoiceThunks";
import CommonPayment from "../../payment/PaymentSection";
import { Invoice, InvoiceFilter } from "../types/InvoiceType";
import axiosInstance from "../../../shared/utils/AxiosInstance";

// Styled Table
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.selected,
    },
}));

const InvoiceHistory: React.FC = () => {
    const dispatch = useAppDispatch();
    const { invoices, loading, error } = useAppSelector((state) => state.invoice);

    const [filter, setFilter] = useState<InvoiceFilter>("ALL");
    const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        dispatch(fetchUserInvoices());
    }, [dispatch]);

    // Auto redirect khi bấm thanh toán
    useEffect(() => {
        if (payingInvoice) {
            const timer = setTimeout(() => {
                handlePayNow(payingInvoice);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [payingInvoice]);

    const handlePayNow = async (invoice: Invoice) => {
        try {
            const res = await axiosInstance.post("/payment/create-vnpay-url", {
                invoiceId: invoice.invoiceId,
            });
            if (res.data.success && res.data.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            } else {
                throw new Error("Không tạo được link thanh toán");
            }
        } catch (err) {
            setSnackbar({ open: true, message: "Lỗi tạo link thanh toán", severity: "error" });
            setPayingInvoice(null);
        }
    };

    const filteredInvoices = invoices.filter((inv) => {
        if (filter === "PENDING") return inv.status === "PENDING";
        if (filter === "PAID") return inv.status === "PAID";
        return true;
    });

    const formatDate = (date: string | null) =>
        date ? new Date(date).toLocaleString("vi-VN") : "-";

    const pendingCount = invoices.filter((i) => i.status === "PENDING").length;
    const paidCount = invoices.filter((i) => i.status === "PAID").length;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={8}>
                <CircularProgress size={60} thickness={5} />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 4 }}>
            <Box textAlign="center" mb={4}>
                <Box fontSize="2rem" fontWeight={700} mb={1}
                     sx={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Lịch Sử Hóa Đơn Thuê Pin
                </Box>
            </Box>

            {/* Tabs Filter */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={filter} onChange={(_, v) => setFilter(v)} centered>
                    <Tab label={`Tất cả (${invoices.length})`} value="ALL" />
                    <Tab label={<><PendingIcon fontSize="small" sx={{ mr: 1 }} /> Chưa thanh toán ({pendingCount})</>} value="PENDING" />
                    <Tab label={<><CheckCircleIcon fontSize="small" sx={{ mr: 1 }} /> Đã thanh toán ({paidCount})</>} value="PAID" />
                </Tabs>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} elevation={6}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1e293b" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Mã HĐ</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Xe</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Gói</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Số tiền</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Trạng thái</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Ngày tạo</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600 }}>Thanh toán</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInvoices.map((inv) => (
                            <StyledTableRow key={inv.invoiceId}>
                                <TableCell>#{inv.invoiceId}</TableCell>
                                <TableCell>
                                    <strong>{inv.vehicleModel}</strong>
                                    <br />
                                    <Box fontSize="0.85rem" color="text.secondary">{inv.vehicleVin}</Box>
                                </TableCell>
                                <TableCell>
                                    <Chip label={inv.planName} size="small" color="primary" variant="outlined" />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: "#dc2626" }}>
                                    {inv.amount.toLocaleString("vi-VN")} ₫
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={inv.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
                                        color={inv.status === "PAID" ? "success" : "warning"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{formatDate(inv.createdAt)}</TableCell>
                                <TableCell>
                                    {inv.status === "PENDING" ? (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<PaymentIcon />}
                                            sx={{ bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}
                                            onClick={() => setPayingInvoice(inv)}
                                        >
                                            Thanh toán ngay
                                        </Button>
                                    ) : (
                                        <Chip label="Đã thanh toán" color="success" size="small" />
                                    )}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Loading overlay khi chuyển sang VNPay */}
            {payingInvoice && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.8)",
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    <CircularProgress size={80} thickness={6} color="inherit" />
                    <Box mt={3} textAlign="center">
                        <Box fontSize="1.5rem" fontWeight={600}>Đang chuyển đến VNPay...</Box>
                        <Box mt={1}>Hóa đơn #{payingInvoice.invoiceId} - {payingInvoice.amount.toLocaleString()}₫</Box>
                    </Box>
                </Box>
            )}

            {/* Snackbar thông báo lỗi */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default InvoiceHistory;