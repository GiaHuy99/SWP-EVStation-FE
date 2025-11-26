// src/features/linkVehicle/LinkVehicleForm.tsx
import React, { useEffect, useState } from "react";
import {
    MenuItem,
    CircularProgress,
    Alert,
    Typography,
    Button,
    Box,
    Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchVehicles,
    fetchPlans,
    linkVehicle,
} from "../Link_SubcriptionThunk";
import { clearResult } from "../Link_SubcriptionSlices";
import CommonPayment from "../../payment/PaymentSection";
import axiosInstance from "../../../shared/utils/AxiosInstance";

import {
    PageContainer,
    FormCard,
    Title,
    FormRow,
    SingleRow,
    StyledTextField,
} from "../styles/LinkVehicleFormStyles";

const LinkVehicleForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, result, error } = useAppSelector(
        (state) => state.link_Subcription
    );

    const [form, setForm] = useState({
        vehicleModelId: 0,
        subscriptionPlanId: 0,
    });

    /* ------------------------------------------------------------------ */
    /* 1. Load danh sách xe & gói khi vào trang                           */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        dispatch(fetchVehicles());
        dispatch(fetchPlans());

        return () => {
            dispatch(clearResult());
        };
    }, [dispatch]);

    /* ------------------------------------------------------------------ */
    /* 2. Xử lý thay đổi select                                            */
    /* ------------------------------------------------------------------ */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: Number(value) }));
    };

    /* ------------------------------------------------------------------ */
    /* 3. Submit đăng ký xe                                                */
    /* ------------------------------------------------------------------ */
    const handleSubmit = () => {
        if (!form.vehicleModelId || !form.subscriptionPlanId) {
            alert("Vui lòng chọn đầy đủ thông tin");
            return;
        }
        dispatch(linkVehicle(form));
    };

    /* ------------------------------------------------------------------ */
    /* 4. AUTO REDIRECT TO VNPAY khi status = PENDING                     */
    /* ------------------------------------------------------------------ */
    useEffect(() => {
        if (
            result &&
            result.subscription.status === "PENDING" &&
            result.invoiceId &&
            result.invoiceAmount
        ) {
            const timer = setTimeout(() => {
                handleAutoRedirectToVNPay();
            }, 1800); // 1.8s để người dùng kịp đọc thông báo thành công

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
            console.error("Auto redirect error:", err);
            // Nếu auto fail → vẫn hiển thị nút để người dùng bấm tay
        }
    };

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8", maxWidth: 800, mx: "auto" }}>
                <Title variant="h1">Đăng ký xe & gói thuê pin</Title>

                {/* ==================== FORM SELECT ==================== */}
                <FormRow>
                    <StyledTextField
                        select
                        label="Chọn mẫu xe"
                        name="vehicleModelId"
                        value={form.vehicleModelId || ""}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>Chọn xe</em>
                        </MenuItem>
                        {vehicles.map((v) => (
                            <MenuItem key={v.id} value={v.id}>
                                <strong>
                                    {v.brand} - {v.name}
                                </strong>
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    <StyledTextField
                        select
                        label="Chọn gói thuê pin"
                        name="subscriptionPlanId"
                        value={form.subscriptionPlanId || ""}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>Chọn gói</em>
                        </MenuItem>
                        {plans.map((p) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name} — {p.price.toLocaleString()} ₫
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </FormRow>

                <SingleRow>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            bgcolor: "#22C55E",
                            color: "white",
                            "&:hover": { bgcolor: "#16A34A" },
                            py: 1.5,
                            px: 6,
                            fontWeight: 600,
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "ĐĂNG KÝ NGAY"
                        )}
                    </Button>
                </SingleRow>

                {/* ==================== KẾT QUẢ ==================== */}
                {result && (
                    <Box mt={4}>
                        <Alert severity="success" sx={{ mb: 3 }}>
                            <Typography fontWeight={600}>{result.message}</Typography>
                        </Alert>

                        <Paper elevation={3} sx={{ p: 4, bgcolor: "#F8FAFC", borderRadius: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Thông tin đăng ký thành công
                            </Typography>
                            <Typography>
                                Xe: <strong>{result.vehicle.model.brand} {result.vehicle.model.name}</strong>
                            </Typography>
                            <Typography>
                                VIN: <strong>{result.vehicle.vin}</strong>
                            </Typography>
                            <Typography>
                                Gói: <strong>{result.subscription.planName}</strong>
                            </Typography>
                            <Typography>
                                Pin nhận được: <strong>{result.batteries.length} pin</strong>
                            </Typography>
                            <Typography mt={1}>
                                Trạng thái gói:{" "}
                                <strong
                                    style={{
                                        color:
                                            result.subscription.status === "PENDING"
                                                ? "#F59E0B"
                                                : "#22C55E",
                                    }}
                                >
                                    {result.subscription.status === "PENDING"
                                        ? "Chờ thanh toán"
                                        : "Đã kích hoạt"}
                                </strong>
                            </Typography>
                        </Paper>

                        {/* ==================== AUTO REDIRECT + BACKUP BUTTON ==================== */}
                        {result.subscription.status === "PENDING" && (
                            <Box mt={4} textAlign="center">
                                <Alert severity="info" sx={{ mb: 3 }}>
                                    Đang chuyển bạn đến cổng thanh toán VNPay trong giây lát...
                                </Alert>
                                <CircularProgress size={50} thickness={5} />

                                {/* Backup nút nếu auto fail */}
                                <Box mt={4}>
                                    <CommonPayment
                                        invoiceId={result.invoiceId}
                                        amount={result.invoiceAmount}
                                        description={`Thanh toán gói ${result.subscription.planName} để kích hoạt xe và nhận ${result.batteries.length} pin`}
                                        buttonText="Click đây nếu không tự động chuyển hướng"
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}
            </FormCard>
        </PageContainer>
    );
};

export default LinkVehicleForm;