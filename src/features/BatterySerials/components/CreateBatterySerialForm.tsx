// src/features/batterySerial/components/CreateBatterySerialForm.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../../../styles/AdminDashboardStyles";
import { CreateBatterySerialPayload } from "../types/BatterySerialTypes";
import { createBatterySerial } from "../BatterySerialThunk";
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

const CreateBatterySerialForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { batteries } = useAppSelector((state) => state.battery);
    const { stations } = useAppSelector((state) => state.station);

    const [form, setForm] = useState<CreateBatterySerialPayload>({
        status: "AVAILABLE",
        stationId: null,
        batteryId: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "stationId" ? (value === "" ? null : Number(value))
                : name === "batteryId" ? Number(value)
                    : value,
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (form.batteryId <= 0) newErrors.batteryId = "Chọn loại pin";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(createBatterySerial(form))
            .unwrap()
            .then(() => {
                dispatch(showNotification({ message: "Tạo serial thành công! Serial được tạo tự động.", type: "success" }));
                navigate("/battery-serials/list");
            })
            .catch(err => {
                dispatch(showNotification({ message: err || "Tạo thất bại", type: "error" }));
            });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Serial Pin Mới</Title>
                <form onSubmit={handleSubmit}>
                    <FormBox>

                        {/* LOẠI BỎ SERIAL NUMBER */}

                        <StyledTextField
                            select
                            label="Loại Pin (Battery)"
                            name="batteryId"
                            value={form.batteryId}
                            onChange={handleChange}
                            required
                            error={!!errors.batteryId}
                            helperText={errors.batteryId || "Chọn loại pin để tạo serial"}
                            fullWidth
                        >
                            <MenuItem value={0} disabled><em>Chọn loại pin</em></MenuItem>
                            {batteries.map(b => (
                                <MenuItem key={b.id} value={b.id}>
                                    {b.name} (ID: {b.id})
                                </MenuItem>
                            ))}
                        </StyledTextField>

                        <StyledTextField
                            select
                            label="Trạng thái"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            {["AVAILABLE", "IN_USE", "DAMAGED", "MAINTENANCE"].map(s => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </StyledTextField>

                        <StyledTextField
                            select
                            label="Trạm"
                            name="stationId"
                            value={form.stationId ?? ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value=""><em>Không thuộc trạm</em></MenuItem>
                            {stations.map(s => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </StyledTextField>

                        <FullWidthBox>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 2,
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                    boxShadow: "0 4px 14px rgba(76, 66, 140, 0.3)",
                                    "&:hover": {
                                        boxShadow: "0 8px 25px rgba(76, 66, 140, 0.4)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                Tạo
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateBatterySerialForm;