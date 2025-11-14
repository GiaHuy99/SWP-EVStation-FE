// src/features/vehicle/components/VehicleCreateForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createVehicle } from "../VehicleThunks";
import { CreateVehiclePayload } from "../types/VehicleType";
import { Button, CircularProgress } from "@mui/material";
import {
    PageContainer,
    FormCard,
    Title,
    FormBox,
    FullWidthBox,
    StyledTextField,
} from "../styles/VehicleFormStyles";

const VehicleCreateForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.vehicle);

    const [form, setForm] = useState<CreateVehiclePayload>({
        name: "",
        brand: "",
        wheelbase: "",
        groundClearance: "",
        seatHeight: "",
        frontTire: "",
        rearTire: "",
        frontSuspension: "",
        rearSuspension: "",
        brakeSystem: "",
        trunkCapacity: "",
        weightWithoutBattery: 0,
        weightWithBattery: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: ["weightWithoutBattery", "weightWithBattery"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = () => {
        dispatch(createVehicle(form)).then(() => {
            navigate("/vehicle/list");
        });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Mẫu Xe Mới</Title>
                <FormBox>
                    <StyledTextField label="Tên xe" name="name" value={form.name} onChange={handleChange} required />
                    <StyledTextField label="Hãng" name="brand" value={form.brand} onChange={handleChange} required />
                    <StyledTextField label="Chiều dài cơ sở" name="wheelbase" value={form.wheelbase} onChange={handleChange} />
                    <StyledTextField label="Khoảng sáng gầm" name="groundClearance" value={form.groundClearance} onChange={handleChange} />
                    <StyledTextField label="Chiều cao yên" name="seatHeight" value={form.seatHeight} onChange={handleChange} />
                    <StyledTextField label="Lốp trước" name="frontTire" value={form.frontTire} onChange={handleChange} />
                    <StyledTextField label="Lốp sau" name="rearTire" value={form.rearTire} onChange={handleChange} />
                    <StyledTextField label="Phuộc trước" name="frontSuspension" value={form.frontSuspension} onChange={handleChange} />
                    <StyledTextField label="Phuộc sau" name="rearSuspension" value={form.rearSuspension} onChange={handleChange} />
                    <StyledTextField label="Hệ thống phanh" name="brakeSystem" value={form.brakeSystem} onChange={handleChange} />
                    <StyledTextField label="Dung tích cốp" name="trunkCapacity" value={form.trunkCapacity} onChange={handleChange} />
                    <StyledTextField label="Trọng lượng (không pin)" name="weightWithoutBattery" type="number" value={form.weightWithoutBattery} onChange={handleChange} />
                    <StyledTextField label="Trọng lượng (có pin)" name="weightWithBattery" type="number" value={form.weightWithBattery} onChange={handleChange} />
                    <FullWidthBox>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                py: 2,
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                boxShadow: "0 4px 14px rgba(76, 66, 140, 0.3)",
                                "&:hover": {
                                    boxShadow: "0 8px 25px rgba(76, 66, 140, 0.4)",
                                    transform: "translateY(-2px)",
                                },
                                fontWeight: 600,
                                fontSize: "1.1rem",
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Tạo Mẫu Xe"}
                        </Button>
                    </FullWidthBox>
                </FormBox>
            </FormCard>
        </PageContainer>
    );
};

export default VehicleCreateForm;