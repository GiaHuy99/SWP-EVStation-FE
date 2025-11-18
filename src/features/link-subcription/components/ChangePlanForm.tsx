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
import { FormRow, StyledTextField } from "../styles/LinkVehicleFormStyles";

const ChangePlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, changeMessage, error } = useAppSelector(
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

        // Reset form
        setNewPlanId("");
    };

    // Hàm format tên xe đẹp: tách model và VIN
    const formatVehicleLabel = (vehicle: string) => {
        const parts = vehicle.split(" VN-");
        if (parts.length === 2) {
            return (
                <Box>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                        {parts[0].trim()}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 2 }}>
                        {parts[1]}
                    </div>
                </Box>
            );
        }
        return vehicle;
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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

            {/* Thông báo */}
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

            <FormRow>
                {/* CHỌN XE – KHÔNG HIỆN ID */}
                <StyledTextField
                    select
                    label="Chọn xe của bạn"
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                    required
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        <em style={{ color: "#94a3b8" }}>— Chọn xe —</em>
                    </MenuItem>

                    {vehicles.map((v) => (
                        <MenuItem key={v.vehicleId} value={v.vehicleId}>
                            <Box sx={{ py: 0.5 }}>
                                {formatVehicleLabel(v.vehicle)}

                                <Box
                                    sx={{
                                        mt: 1,
                                        fontSize: "0.8rem",
                                        color: "#64748b",
                                        display: "flex",
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                  <span>
                    Gói hiện tại: <strong style={{ color: "#1e40af" }}>{v.currentPlan}</strong>
                  </span>
                                    <span>
                    Hết hạn: <strong style={{ color: "#dc2626" }}>
                      {new Date(v.endDate).toLocaleDateString("vi-VN")}
                    </strong>
                  </span>
                                    {v.nextPlan && v.nextPlan !== v.currentPlan && (
                                        <span>
                      → Tiếp theo: <strong style={{ color: "#16a34a" }}>{v.nextPlan}</strong>
                    </span>
                                    )}
                                </Box>
                            </Box>
                        </MenuItem>
                    ))}
                </StyledTextField>

                {/* CHỌN GÓI MỚI */}
                <StyledTextField
                    select
                    label="Chọn gói mới"
                    value={newPlanId}
                    onChange={(e) => setNewPlanId(Number(e.target.value))}
                    required
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        <em style={{ color: "#94a3b8" }}>— Chọn gói —</em>
                    </MenuItem>
                    {plans.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <strong>{p.name}</strong>
                                {p.price && (
                                    <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    {p.price.toLocaleString("vi-VN")} ₫
                  </span>
                                )}
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
                    boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #16a34a, #15803d)",
                        transform: "translateY(-3px)",
                    },
                    textTransform: "none",
                }}
            >
                {loading ? (
                    <CircularProgress size={28} color="inherit" />
                ) : (
                    "ĐỔI GÓI NGAY"
                )}
            </Button>
        </Box>
    );
};

export default ChangePlanForm;