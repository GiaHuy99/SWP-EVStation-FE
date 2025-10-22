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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// Local StyledTableRow cho hover xanh pastel (không import external)
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8", // Xanh pastel đồng bộ
        transition: "background-color 0.3s ease-in-out",
        transform: "scale(1.01)", // Nâng nhẹ
    },
    "& td": {
        borderBottom: `1px solid ${theme.palette.divider}`,
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
            dispatch(fetchSubscriptions()); // reload sau khi renew
        });
    };

    return (
        <Box
            sx={{ // Inline PageContainer: bg nhẹ, center, full height
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F9FAFB", // Đồng bộ nhẹ
                padding: 4,
            }}
        >
            <Box
                sx={{ // Inline ListCard: maxWidth, padding, shadow, border
                    width: "100%",
                    maxWidth: 1000,
                    padding: 3,
                    borderRadius: 1,
                    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)", // Đồng bộ mượt
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb", // Border xám nhạt
                }}
            >
                <Button
                    variant="outlined"
                    color="success" // Xanh lá
                    onClick={handleAutoRenew}
                    sx={{
                        mb: 2, // Margin bottom
                        backgroundColor: "transparent", // Trắng như hình
                        borderColor: "#22C55E", // Viền xanh nhạt
                        color: "#22C55E", // Chữ xanh đậm
                        textTransform: "uppercase", // "RENEW" in hoa
                        borderRadius: "8px", // Bo tròn mỏng
                        fontWeight: 600, // Đậm
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(34, 197, 94, 0.05)", // Nhạt hover
                            borderColor: "#16A34A", // Sáng hơn
                            transform: "translateY(-1px)", // Nâng
                        },
                    }}
                >
                    RENEW
                </Button>

                {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}
                {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

                <Box sx={{ // Inline TableWrapper: overflow auto
                    width: "100%",
                    overflowX: "auto",
                }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vehicle</TableCell>
                                    <TableCell>Current Plan</TableCell>
                                    <TableCell>Start</TableCell>
                                    <TableCell>End</TableCell>
                                    <TableCell>Next Plan</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((sub, idx) => (
                                    <StyledTableRow key={idx}> {/* Hover xanh local */}
                                        <TableCell>{sub.vehicle}</TableCell>
                                        <TableCell>{sub.currentPlan}</TableCell>
                                        <TableCell>{sub.startDate}</TableCell>
                                        <TableCell>{sub.endDate}</TableCell>
                                        <TableCell>{sub.nextPlan}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Snackbar
                    open={!!autoRenewMessage}
                    message={autoRenewMessage || ""}
                    autoHideDuration={3000}
                    onClose={() => dispatch(clearMessage())}
                    sx={{
                        "& .MuiSnackbarContent-root": {
                            backgroundColor: "rgba(34, 197, 94, 0.9)", // Xanh success
                            color: "white",
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default UserSubscriptionsTable;