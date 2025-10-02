import React, { useEffect, useState } from "react";
import {
    Typography,
    CircularProgress,
    Alert,
    MenuItem, Button, Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { changeSubscriptionPlan, fetchSubscriptionPlans, fetchVehicles } from "../ChangeSubscriptionThunks"; // Fix: Thunks từ Thunks file
import { clearMessage } from "../ChangeSubscriptionSlice"; // Action từ slice đúng

// Import styled đồng bộ (thêm FormRow, StyledTextField nếu chưa)
import { FormRow, StyledTextField } from "../styles/LinkVehicleFormStyles"; // Hoặc file chung

interface ChangePlanFormProps {
    subscriptionId: number;
}

const ChangePlanForm: React.FC<ChangePlanFormProps> = ({ subscriptionId }) => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, changeMessage, error } = useAppSelector(
        (state) => state.subcription // Slice name đúng
    );

    const [vehicleId, setVehicleId] = useState<number | "">("");
    const [newPlanId, setNewPlanId] = useState<number | "">("");

    useEffect(() => {
        dispatch(fetchVehicles());
        dispatch(fetchSubscriptionPlans());
        return () => {
            dispatch(clearMessage()); // Cleanup đúng
        };
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vehicleId || !newPlanId) {
            alert("Vui lòng chọn xe và gói mới");
            return;
        }
        dispatch(
            changeSubscriptionPlan({
                subscriptionId,
                vehicleId: vehicleId as number,
                newPlanId: newPlanId as number,
            })
        );
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 5,
                p: 3,
                border: "1px solid #E8F5E8", // Viền ngoài pastel
                borderRadius: "8px",
                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)", // Đồng bộ mượt
            }}
        >
            <Typography variant="h6" gutterBottom>
                Đổi gói đăng ký cho xe
            </Typography>

            {/* 2 cột vehicle và plan với FormRow */}
            <FormRow> {/* Grid responsive 1fr to 1fr 1fr sm */}
                <StyledTextField // Chọn xe pastel green
                    select
                    label="Chọn xe"
                    fullWidth
                    margin="normal"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(Number(e.target.value))}
                    required
                >
                    <MenuItem value="">
                        <em>Chọn</em>
                    </MenuItem>
                    {vehicles.map((v: any) => (
                        <MenuItem key={v.id} value={v.id}>
                            {v.model} — {v.vin}
                        </MenuItem>
                    ))}
                </StyledTextField>

                <StyledTextField // Chọn gói mới cạnh xe
                    select
                    label="Chọn gói mới"
                    fullWidth
                    margin="normal"
                    value={newPlanId}
                    onChange={(e) => setNewPlanId(Number(e.target.value))}
                    required
                >
                    <MenuItem value="">
                        <em>Chọn</em>
                    </MenuItem>
                    {plans.map((p: any) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name} — {p.price?.toLocaleString?.() ?? p.price} VND
                        </MenuItem>
                    ))}
                </StyledTextField>
            </FormRow>

            <Button
                type="submit"
                variant="contained"
                color="success" // Xanh lá đồng bộ
                fullWidth
                disabled={loading}
                sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: 600,
                    backgroundColor: "#E8F5E8", // Nền pastel xanh
                    color: "#22C55E", // Chữ xanh đậm
                    textTransform: "uppercase", // "ĐỔI GÓI" in hoa
                    "&:hover": {
                        backgroundColor: "#D4EDDA", // Hover sáng pastel
                        transform: "translateY(-1px)", // Nâng nhẹ
                        transition: "all 0.3s ease-in-out",
                    },
                    "&.Mui-disabled": {
                        backgroundColor: "#F3F4F6", // Disabled xám nhạt
                        color: "#9CA3AF",
                    },
                }}
            >
                {loading ? <CircularProgress size={20} color="inherit" /> : "ĐỔI GÓI"}
            </Button>

            {changeMessage && (
                <Alert severity="success" sx={{ mt: 2 }}> {/* Alert xanh pastel */}
                    {changeMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}> {/* Alert đỏ pastel */}
                    {String(error)}
                </Alert>
            )}
        </Box>
    );
};

export default ChangePlanForm;