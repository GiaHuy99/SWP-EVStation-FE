import React, { useEffect, useState } from "react";  // Bỏ useMemo vì gọi bình thường
import { MenuItem, CircularProgress, Alert, Typography, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchPlans, linkVehicle } from "../Link_SubcriptionThunk";
import { LinkVehiclePayload, VehicleModelSummary, PlanSummary, LinkedVehicleResponse } from "../types/LinkVehicleType";
import { clearResult } from "../Link_SubcriptionSlices";
import { PageContainer, FormCard, Title, FormRow, SingleRow, StyledTextField } from "../styles/LinkVehicleFormStyles";

const LinkVehicleForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const linkVehicleState = useAppSelector((state) => state.link_Subcription || { vehicles: [], plans: [], loading: false, result: null, error: null });
    const { vehicles, plans, loading, result, error } = linkVehicleState;

    const [form, setForm] = useState<LinkVehiclePayload>({ vehicleModelId: -1, subscriptionPlanId: -1 });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchVehicles());
        dispatch(fetchPlans());
        return () => {
            dispatch(clearResult());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = () => {
        if (!form.vehicleModelId || !form.subscriptionPlanId || form.vehicleModelId < 0 || form.subscriptionPlanId < 0) {
            setSnackbarOpen(true);
            return;
        }
        dispatch(linkVehicle(form));
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    // Debug tạm: Check vehicles trước map (bỏ sau khi fix)
    console.log("Debug - Vehicles (type/array?):", vehicles, Array.isArray(vehicles));

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8" }}>
                <Title variant="h5">Đăng ký xe</Title>

                <FormRow>
                    <StyledTextField
                        select
                        label="Chọn xe"
                        name="vehicleModelId"
                        value={form.vehicleModelId}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={-1}>
                            <em>Chọn</em>
                        </MenuItem>
                        {/* Fix: Map trực tiếp, fallback || [] – Gọi bình thường, không useMemo */}
                        {(vehicles || []).map((v: VehicleModelSummary) => (
                            <MenuItem key={v.id} value={v.id}>
                                {v.name} — {v.brand}
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    <StyledTextField
                        select
                        label="Chọn gói"
                        name="subscriptionPlanId"
                        value={form.subscriptionPlanId}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={-1}>
                            <em>Chọn</em>
                        </MenuItem>
                        {/* Tương tự cho plans */}
                        {(plans || []).map((p: PlanSummary) => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.planName} — {p.price?.toLocaleString() ?? p.price} VND
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </FormRow>

                <SingleRow sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        type="button"
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ /* Custom nếu cần */ }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : "ĐĂNG KÝ"}
                    </Button>
                </SingleRow>

                {result && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                        <Typography variant="body1" fontWeight={600} mb={1}>
                            {result.message}
                        </Typography>
                        <Typography>Xe: {result.vehicle.model.name} ({result.vehicle.vin})</Typography>
                        <Typography>Gói: {result.subscription.planName}</Typography>
                        <Typography>Pin được gán: {result.batteries.length}</Typography>
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {String(error)}
                    </Alert>
                )}
            </FormCard>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Vui lòng chọn xe và gói đăng ký"
            />
        </PageContainer>
    );
};

export default LinkVehicleForm;