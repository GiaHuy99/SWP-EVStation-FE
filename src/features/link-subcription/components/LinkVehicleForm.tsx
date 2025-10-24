import React, { useEffect, useState } from "react";
import { MenuItem, CircularProgress, Alert, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchPlans, linkVehicle } from "../Link_SubcriptionThunk";
import { LinkVehiclePayload } from "../types/LinkVehicleType";
import {
    PageContainer,
    FormCard,
    Title,
    FormRow,
    SingleRow,
    StyledTextField,
} from "../styles/LinkVehicleFormStyles";
import { clearResult } from "../Link_SubcriptionSlices";

const LinkVehicleForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, result, error } = useAppSelector(
        (state) => state.link_Subcription
    );

    // ✅ Đổi "vehicleId" thành "vehicleModelId" để khớp với type LinkVehiclePayload
    const [form, setForm] = useState<LinkVehiclePayload>({
        vehicleModelId: 0,
        subscriptionPlanId: 0,
    });

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
        if (!form.vehicleModelId || !form.subscriptionPlanId) {
            alert("Vui lòng chọn xe và gói đăng ký");
            return;
        }
        dispatch(linkVehicle(form));
    };

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8" }}>
                <Title variant="h5">Đăng ký xe</Title>

                <FormRow>
                    <StyledTextField
                        select
                        label="Chọn xe"
                        name="vehicleModelId"
                        value={form.vehicleModelId || ""}
                        onChange={handleChange}
                        fullWidth
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

                    <StyledTextField
                        select
                        label="Chọn gói"
                        name="subscriptionPlanId"
                        value={form.subscriptionPlanId || ""}
                        onChange={handleChange}
                        fullWidth
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

                <SingleRow sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            backgroundColor: "#E8F5E8",
                            color: "#22C55E",
                            "&:hover": {
                                backgroundColor: "#D4EDDA",
                                transform: "translateY(-1px)",
                                transition: "all 0.3s ease-in-out",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#F3F4F6",
                                color: "#9CA3AF",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : "ĐĂNG KÝ"}
                    </Button>
                </SingleRow>

                {result && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                        {/*<Typography variant="body1" fontWeight={600} mb={1}>*/}
                        {/*    {result.message}*/}
                        {/*</Typography>*/}
                        <Typography>
                            Xe: {result.vehicle.model.name} ({result.vehicle.vin})
                        </Typography>
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
        </PageContainer>
    );
};

export default LinkVehicleForm;
