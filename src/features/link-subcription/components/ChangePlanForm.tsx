// src/features/subscription/ChangePlanForm.tsx
import React, {useEffect, useState} from "react";
import { Box, Typography, Button, CircularProgress, Alert, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchSubscriptionPlans, changeSubscriptionPlan } from "../ChangeSubscriptionThunks";
import { clearMessage } from "../ChangeSubscriptionSlice";
import CommonPayment from "../../payment/PaymentSection";
import axiosInstance from "../../../shared/utils/AxiosInstance";
import { FormRow, StyledTextField } from "../styles/LinkVehicleFormStyles";

const ChangePlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, changeMessage, error, result } = useAppSelector(
        (state) => state.subcription
    );

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
        setNewPlanId("");
    };

    // AUTO REDIRECT – GIỐNG HỆT LINKVEHICLE
    useEffect(() => {
        if (
            result &&
            result.subscription?.status === "PENDING" &&
            result.invoiceId &&
            result.invoiceAmount
        ) {
            const timer = setTimeout(() => {
                handleAutoRedirectToVNPay();
            }, 1800);
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
            }
        } catch (err) {
            console.error("Auto payment failed:", err);
        }
    };

    const formatVehicleLabel = (vehicle: string) => {
        const parts = vehicle.split(" VN-");
        if (parts.length === 2) {
            return (
                <Box>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>{parts[0].trim()}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 2 }}>{parts[1]}</div>
                </Box>
            );
        }
        return vehicle;
    };

    return (
        <Box sx={{ maxWidth: 650, mx: "auto", mt: 6, p: { xs: 3, sm: 5 }, borderRadius: "20px", backgroundColor: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}>
            <Typography variant="h5" align="center" fontWeight={700} gutterBottom
                        sx={{ background: "linear-gradient(135deg, #4C428C, #04C4D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Đổi Gói Đăng Ký Cho Xe
            </Typography>

            {changeMessage && <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>{changeMessage}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
                <FormRow>
                    <StyledTextField select label="Chọn xe của bạn" value={selectedVehicleId}
                                     onChange={(e) => setSelectedVehicleId(Number(e.target.value))} required fullWidth>
                        <MenuItem value="" disabled><em style={{ color: "#94a3b8" }}>— Chọn xe —</em></MenuItem>
                        {vehicles.map((v) => (
                            <MenuItem key={v.vehicleId} value={v.vehicleId}>
                                <Box sx={{ py: 0.5 }}>
                                    {formatVehicleLabel(v.vehicle)}
                                    <Box sx={{ mt: 1, fontSize: "0.8rem", color: "#64748b", display: "flex", gap: 2, flexWrap: "wrap" }}>
                                        <span>Gói hiện tại: <strong style={{ color: "#1e40af" }}>{v.currentPlan}</strong></span>
                                        <span>Hết hạn: <strong style={{ color: "#dc2626" }}>
                      {new Date(v.endDate).toLocaleDateString("vi-VN")}
                    </strong></span>
                                    </Box>
                                </Box>
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    <StyledTextField select label="Chọn gói mới" value={newPlanId}
                                     onChange={(e) => setNewPlanId(Number(e.target.value))} required fullWidth>
                        <MenuItem value="" disabled><em style={{ color: "#94a3b8" }}>— Chọn gói —</em></MenuItem>
                        {plans.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <strong>{p.name}</strong>
                                    {p.price && <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    {p.price.toLocaleString("vi-VN")} ₫
                  </span>}
                                </Box>
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </FormRow>

                <Button type="submit" variant="contained" size="large" fullWidth
                        disabled={loading || !selectedVehicleId || !newPlanId}
                        sx={{
                            mt: 4, py: 2, fontSize: "1.1rem", fontWeight: 700, borderRadius: "16px",
                            background: "linear-gradient(135deg, #22c55e, #16a34a)",
                            "&:hover": { background: "linear-gradient(135deg, #16a34a, #15803d)" },
                            textTransform: "none",
                        }}>
                    {loading ? <CircularProgress size={28} color="inherit" /> : "ĐỔI GÓI NGAY"}
                </Button>
            </Box>

            {/* KẾT QUẢ + AUTO PAYMENT – GIỐNG HỆT LINKVEHICLE */}
            {result && (
                <Box mt={5} p={4} bgcolor="#f8fafc" borderRadius={3} border="1px solid #e2e8f0">
                    <Alert severity="success" sx={{ mb: 3 }}>
                        <Typography fontWeight={600}>{result.message}</Typography>
                    </Alert>

                    <Typography variant="h6" gutterBottom>Thông tin đổi gói thành công</Typography>
                    <Typography>Gói mới: <strong>{result.subscription.nextPlanName}</strong></Typography>
                    <Typography>Hiệu lực từ: <strong>{new Date(result.subscription.endDate).toLocaleDateString("vi-VN")}</strong></Typography>
                    <Typography mt={1}>
                        Trạng thái: <strong style={{ color: result.subscription.status === "PENDING" ? "#f59e0b" : "#22c55e" }}>
                        {result.subscription.status === "PENDING" ? "Chờ thanh toán" : "Đã kích hoạt"}
                    </strong>
                    </Typography>

                    {result.subscription.status === "PENDING" && (
                        <Box mt={4} textAlign="center">
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Đang chuyển bạn đến cổng thanh toán VNPay...
                            </Alert>
                            <CircularProgress size={50} thickness={5} />
                            <Box mt={3}>
                                <CommonPayment
                                    invoiceId={result.invoiceId}
                                    amount={result.invoiceAmount}
                                    description={`Thanh toán đổi gói ${result.subscription.nextPlanName}`}
                                    buttonText="Click nếu không tự động chuyển"
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ChangePlanForm;