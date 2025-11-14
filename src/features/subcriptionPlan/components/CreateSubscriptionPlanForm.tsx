// src/features/subscriptionPlan/components/CreateSubscriptionPlanForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Button } from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { createSubscriptionPlan } from "../SubcriptionPlanThunks";
import { CreateSubscriptionPlanPayload } from "../types/SubscriptionPlanType";
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../../../styles/SubscriptionPlanStyles";

const planTypeOptions = ["DISTANCE", "ENERGY", "UNLIMITED"] as const;
const statusOptions = ["ACTIVE", "INACTIVE"] as const;

const CreateSubscriptionPlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateSubscriptionPlanPayload>({
        name: "",
        price: 0,
        durationDays: 0,
        maxBatteries: 1,
        baseMileage: 0,
        baseEnergy: 0,
        planType: "DISTANCE",
        status: "ACTIVE",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "planType" || name === "status" ? value : Number(value),
        }));
    };

    const handleCreate = () => {
        dispatch(createSubscriptionPlan(form)).then(() => {
            navigate("/subscription-plans");
        });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Gói Đăng Ký Mới</Title>
                <FormBox>
                    <StyledTextField
                        label="Tên Gói"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <StyledTextField
                        label="Giá (VND)"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <StyledTextField
                        label="Thời gian (ngày)"
                        name="durationDays"
                        type="number"
                        value={form.durationDays}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <StyledTextField
                        label="Số Pin Tối Đa"
                        name="maxBatteries"
                        type="number"
                        value={form.maxBatteries}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <FullWidthBox>
                        <StyledTextField
                            label="Quãng đường cơ bản (km)"
                            name="baseMileage"
                            type="number"
                            value={form.baseMileage}
                            onChange={handleChange}
                            fullWidth
                        />
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            label="Năng lượng cơ bản (kWh)"
                            name="baseEnergy"
                            type="number"
                            value={form.baseEnergy}
                            onChange={handleChange}
                            fullWidth
                        />
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Loại Gói"
                            name="planType"
                            value={form.planType}
                            onChange={handleChange}
                            fullWidth
                        >
                            {planTypeOptions.map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Trạng thái"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            {statusOptions.map(s => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>
                    <FullWidthBox>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleCreate}
                            sx={{
                                py: 2,
                                border: "12px",
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
                            Tạo Gói Mới
                        </Button>
                    </FullWidthBox>
                </FormBox>
            </FormCard>
        </PageContainer>
    );
};

export default CreateSubscriptionPlanForm;