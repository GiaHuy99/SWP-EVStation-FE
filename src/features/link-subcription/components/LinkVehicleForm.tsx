import React, { useEffect, useState } from "react";
import { MenuItem, CircularProgress, Alert, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchPlans, linkVehicle } from "../Link_SubcriptionThunk";
import { LinkVehiclePayload } from "../types/LinkVehicleType";
import { PageContainer, FormCard, Title, FormRow, SingleRow, StyledTextField } from "../styles/LinkVehicleFormStyles";
import { clearResult } from "../Link_SubcriptionSlices";

const LinkVehicleForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, plans, loading, result, error } = useAppSelector((state) => state.link_Subcription);

    const [form, setForm] = useState<LinkVehiclePayload>({ vehicleId: 0, subscriptionPlanId: 0 });

    useEffect(() => {
        dispatch(fetchVehicles());
        dispatch(fetchPlans());
        // clear previous result if any
        return () => {
            dispatch(clearResult());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = () => {
        if (!form.vehicleId || !form.subscriptionPlanId) {
            alert("Vui lòng chọn xe và gói đăng ký");
            return;
        }
        dispatch(linkVehicle(form));
    };

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Viền ngoài pastel đồng bộ */}
                <Title variant="h5">Đăng ký xe</Title>

                <FormRow> {/* Grid responsive từ styles */}
                    <StyledTextField // Xe select với pastel green
                        select
                        label="Chọn xe"
                        name="vehicleId"
                        value={form.vehicleId || ""}
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

                    <StyledTextField // Gói select cạnh xe
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

                <SingleRow sx={{ display: "flex", justifyContent: "center" }}> {/* Căn giữa nút */}
                    <Button
                        variant="contained"
                        color="success" // Xanh lá đồng bộ như Update
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            px: 4, // Padding ngang rộng
                            py: 1.5, // Dọc mượt
                            borderRadius: "8px", // Bo tròn
                            textTransform: "uppercase", // "ĐĂNG KÝ" in hoa
                            fontWeight: 600, // Đậm
                            backgroundColor: "#E8F5E8", // Nền pastel xanh
                            color: "#22C55E", // Chữ xanh đậm
                            "&:hover": {
                                backgroundColor: "#D4EDDA", // Hover sáng pastel
                                transform: "translateY(-1px)", // Nâng nhẹ như Update
                                transition: "all 0.3s ease-in-out",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#F3F4F6", // Disabled xám nhạt
                                color: "#9CA3AF",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : "ĐĂNG KÝ"}
                    </Button>
                </SingleRow>

                {result && (
                    <Alert severity="success" sx={{ mt: 3 }}> {/* Alert xanh pastel cho result */}
                        <Typography variant="body1" fontWeight={600} mb={1}>{result.message}</Typography>
                        <Typography>Xe: {result.vehicle.model} ({result.vehicle.vin})</Typography>
                        <Typography>Gói: {result.subscription.planName}</Typography>
                        <Typography>Pin được gán: {result.batteries.length}</Typography>
                    </Alert>
                )}

                {error && <Alert severity="error" sx={{ mt: 2 }}> {/* Alert đỏ pastel cho error */}
                    {String(error)}
                </Alert>}
            </FormCard>
        </PageContainer>
    );
};

export default LinkVehicleForm;