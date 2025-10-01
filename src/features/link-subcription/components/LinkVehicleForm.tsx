import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchPlans, linkVehicle } from "../Link_SubcriptionThunk";
import { LinkVehiclePayload } from "../types/LinkVehicleType";
import { PageContainer, FormCard, Title, FormRow, SingleRow } from "../styles/LinkVehicleFormStyles";
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
            <FormCard>
                <Title variant="h5">Đăng ký xe</Title>

                <FormRow>
                    <TextField
                        select
                        label="Chọn xe"
                        name="vehicleId"
                        value={form.vehicleId || ""}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Chọn xe"
                    >
                        <MenuItem value="">
                            <em>Chọn</em>
                        </MenuItem>
                        {vehicles.map((v: any) => (
                            <MenuItem key={v.id} value={v.id}>
                                {v.model} — {v.vin}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
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
                    </TextField>
                </FormRow>

                <SingleRow display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={20} /> : "Đăng ký"}
                    </Button>
                </SingleRow>

                {result && (
                    <Box mt={3} p={2} border="1px solid #eee" borderRadius={1}>
                        <div style={{ fontWeight: 600 }}>{result.message}</div>
                        <div>Xe: {result.vehicle.model} ({result.vehicle.vin})</div>
                        <div>Gói: {result.subscription.planName}</div>
                        <div>Pin được gán: {result.batteries.length}</div>
                    </Box>
                )}

                {error && <Box mt={2} color="error.main">{String(error)}</Box>}
            </FormCard>
        </PageContainer>
    );
};

export default LinkVehicleForm;
