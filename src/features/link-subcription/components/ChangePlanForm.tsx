// src/features/subscription/ChangePlanForm.tsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchVehicles,
    fetchSubscriptionPlans,
    changeSubscriptionPlan,
} from "../ChangeSubscriptionThunks";
import { clearMessage } from "../ChangeSubscriptionSlice";
import CommonPayment from "../../payment/PaymentSection";
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { FormRow, StyledTextField } from "../styles/LinkVehicleFormStyles";

const ChangePlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, changeMessage, error, result } =
        useAppSelector((state) => state.subcription);

    const [selectedVehicleId, setSelectedVehicleId] = useState<number | "">("");
    const [newPlanId, setNewPlanId] = useState<number | "">("");

    useEffect(() => {
        dispatch(fetchVehicles());
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    useEffect(() => {
        if (changeMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessage()), 5000);
            return () => clearTimeout(timer);
        }
    }, [changeMessage, error, dispatch]);

    /* AUTO REDIRECT KHI CÓ INVOICE PENDING – giống hệt LinkVehicleForm */
    useEffect(() => {
        if (
            result &&
            result.status === "PENDING" &&
            result.invoiceId &&
            result.invoiceAmount
        ) {
            const timer = setTimeout(() => {
                handleAutoRedirectToVNPay();
            }, 2000); // 2 giây để người dùng đọc thông báo
            return () => clearTimeout(timer);
        }
    }, [result]);

    const handleAutoRedirectToVNPay = async () => {
        try {
            const res = await axiosInstance.post("/payment/create-vnpay-url", {
                invoiceId: result!.invoiceId,
            });

            if (res.data.success && res.data.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            } else {
                console.warn("Không lấy được paymentUrl → để người dùng bấm tay");
            }
        } catch (err: any) {
            console.error("Auto redirect failed:", err);
            // Không làm gì → để backup button hoạt động
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVehicleId || !newPlanId) {
            alert("Vui lòng chọn xe và gói mới");
            return;
        }

        dispatch(
            changeSubscriptionPlan({
                vehicleId: selectedVehicleId as number,
                newPlanId: newPlanId as number,
            })
        );
    };

    const formatVehicleLabel = (v: any) => {
        const parts = v.vehicle?.split(" VN-") || [];
        if (parts.length === 2) {
            return (
                <Box>
                    <div style={{ fontWeight: 600 }}>{parts[0].trim()}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 2 }}>
                        {parts[1]}
                    </div>
                </Box>
            );
        }
        return v.vehicle;
    };

    return (
        <Box
            sx={{
                maxWidth: 650,
                mx: "auto",
                mt: 6,
                p: { xs: 3, sm: 5 },
                borderRadius: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
            }}
        >
            <Typography
                variant="h5"
                align="center"
                fontWeight={700}
                gutterBottom
                sx={{
                    background: "linear-gradient(135deg, #4C428C, #04C4D9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Đổi Gói Đăng Ký Cho Xe
            </Typography>

            {changeMessage && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
                    {changeMessage}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <FormRow>
                    <StyledTextField
                        select
                        label="Chọn xe của bạn"
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                        required
                        fullWidth
                    >
                        <MenuItem value="" disabled><em>— Chọn xe —</em></MenuItem>
                        {vehicles.map((v) => (
                            <MenuItem key={v.vehicleId} value={v.vehicleId}>
                                <Box sx={{ py: 0.5 }}>
                                    {formatVehicleLabel(v)}
                                    <Box sx={{ mt: 1, fontSize: "0.8rem", color: "#64748b" }}>
                                        Gói hiện tại: <strong style={{ color: "#1e40af" }}>{v.currentPlan}</strong> |
                                        Hết hạn: <strong style={{ color: "#dc2626" }}>
                                        {new Date(v.endDate).toLocaleDateString("vi-VN")}
                                    </strong>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    <StyledTextField
                        select
                        label="Chọn gói mới"
                        value={newPlanId}
                        onChange={(e) => setNewPlanId(Number(e.target.value))}
                        required
                        fullWidth
                    >
                        <MenuItem value="" disabled><em>— Chọn gói —</em></MenuItem>
                        {plans.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>{p.name}</strong>
                                    <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    {p.price?.toLocaleString()} ₫
                  </span>
                                </Box>
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </FormRow>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading || !selectedVehicleId || !newPlanId}
                    sx={{
                        mt: 4,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        "&:hover": { background: "linear-gradient(135deg, #16a34a, #15803d)" },
                        textTransform: "none",
                    }}
                >
                    {loading ? <CircularProgress size={28} /> : "ĐỔI GÓI NGAY"}
                </Button>
            </Box>

            {/* KẾT QUẢ + AUTO REDIRECT + BACKUP BUTTON – giống hệt LinkVehicleForm */}
            {result && result.status === "PENDING" && (
                <Box mt={5} p={4} bgcolor="#f0fdf4" borderRadius={4} border="2px solid #22c55e" textAlign="center">
                    <Alert severity="success" sx={{ mb: 3, fontSize: "1.1rem" }}>
                        Yêu cầu đổi gói thành công! Đang chuyển bạn đến cổng thanh toán...
                    </Alert>

                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        Thông tin gói mới
                    </Typography>
                    <Typography>Gói: <strong>{result.planName}</strong></Typography>
                    <Typography>
                        Số tiền: <strong style={{ color: "#dc2626", fontSize: "1.4rem" }}>
                        {result.invoiceAmount.toLocaleString()} ₫
                    </strong>
                    </Typography>
                    <Typography>
                        Hiệu lực từ: <strong>{new Date(result.startDate).toLocaleDateString("vi-VN")}</strong>
                    </Typography>

                    <Box mt={4}>
                        <CircularProgress size={60} thickness={5} color="success" />
                        <Typography mt={2} color="text.secondary">
                            Đang chuyển đến VNPay trong giây lát...
                        </Typography>
                    </Box>

                    {/* Backup nút nếu auto fail */}
                    <Box mt={4}>
                        <CommonPayment
                            invoiceId={result.invoiceId}
                            amount={result.invoiceAmount}
                            description={`Thanh toán đổi gói ${result.planName}`}
                            buttonText="Click đây nếu không tự động chuyển hướng"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChangePlanForm;