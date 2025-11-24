import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptions, runAutoRenew, clearMessage } from "../subscriptionSlice";
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
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Hover row xanh pastel mượt mà
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8",
        transition: "all 0.3s ease",
        transform: "scale(1.01)",
    },
}));

const UserSubscriptionsTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading, error, autoRenewMessage } = useAppSelector(
        (state) => state.subcsription1
    );

    useEffect(() => {
        dispatch(fetchSubscriptions());
    }, [dispatch]);

    const handleAutoRenew = () => {
        dispatch(runAutoRenew()).then(() => {
            dispatch(fetchSubscriptions());
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F9FAFB",
                padding: { xs: 2, sm: 4 },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.08)",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                }}
            >
                {/* Tiêu đề đẹp như app Tesla */}
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        color: "#022601",
                        mb: 1,
                        textAlign: "center",
                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                    }}
                >
                    Subscription Management
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#6B7280",
                        textAlign: "center",
                        mb: 4,
                        fontSize: "1rem",
                    }}
                >
                    Quản lý gói thuê pin và gia hạn tự động
                </Typography>

                {/* Nút RENEW đẹp đúng như ảnh */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                    <Button
                        variant="outlined"
                        color="success"
                        size="large"
                        onClick={handleAutoRenew}
                        disabled={loading}
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            px: 6,
                            py: 1.5,
                            borderRadius: "12px",
                            borderColor: "#22C55E",
                            color: "#22C55E",
                            backgroundColor: "white",
                            boxShadow: "0 4px 15px rgba(34, 197, 94, 0.15)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#F0FDF4",
                                borderColor: "#16A34A",
                                transform: "translateY(-3px)",
                                boxShadow: "0 8px 25px rgba(34, 197, 94, 0.25)",
                            },
                            "&:disabled": {
                                opacity: 0.6,
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="success" /> : "RENEW"}
                    </Button>
                </Box>

                {/* Loading & Error */}
                {loading && !autoRenewMessage && (
                    <Box sx={{ textAlign: "center", my: 3 }}>
                        <CircularProgress color="success" />
                    </Box>
                )}
                {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

                {/* Bảng - ĐÃ XÓA VIỀN NGOÀI HOÀN TOÀN */}
                <TableContainer
                    sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        border: "none", // XÓA VIỀN NGOÀI
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#F0FDF4" }}>
                                <TableCell sx={{ fontWeight: 700, color: "#022601" }}>Vehicle</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#022601" }}>Current Plan</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#022601" }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#022601" }}>End Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: "#022601" }}>Next Plan</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length === 0 && !loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: "#6B7280" }}>
                                        Chưa có gói thuê pin nào
                                    </TableCell>
                                </TableRow>
                            ) : (
                                list.map((sub, idx) => (
                                    <StyledTableRow key={idx}>
                                        <TableCell>{sub.vehicle}</TableCell>
                                        <TableCell>{sub.currentPlan}</TableCell>
                                        <TableCell>{sub.startDate}</TableCell>
                                        <TableCell>{sub.endDate}</TableCell>
                                        <TableCell>
                                            <Box component="span" sx={{ color: "#16A34A", fontWeight: 600 }}>
                                                {sub.nextPlan || "-"}
                                            </Box>
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Snackbar thông báo thành công */}
                <Snackbar
                    open={!!autoRenewMessage}
                    autoHideDuration={4000}
                    onClose={() => dispatch(clearMessage())}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => dispatch(clearMessage())}
                        severity="success"
                        variant="filled"
                        sx={{
                            backgroundColor: "#22C55E",
                            fontWeight: 600,
                            fontSize: "1rem",
                        }}
                    >
                        {autoRenewMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default UserSubscriptionsTable;