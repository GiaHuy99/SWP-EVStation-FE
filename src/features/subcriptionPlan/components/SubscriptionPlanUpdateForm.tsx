// src/features/subscriptionPlan/components/SubscriptionPlanUpdateForm.tsx
import React, { useState } from "react";
import { Button, MenuItem, Box } from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { updatePlan } from "../SubcriptionPlanThunks";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "../types/SubscriptionPlanType";
import {
    FormCard, FormBox, FullWidthBox, StyledTextField
} from "../../../styles/SubscriptionPlanStyles";

interface Props {
    plan: SubscriptionPlan;
    onClose: () => void;
}

const SubscriptionPlanUpdateForm: React.FC<Props> = ({ plan, onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreateSubscriptionPlanPayload>({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        maxBatteries: plan.maxBatteries,
        baseMileage: plan.baseMileage,
        baseEnergy: plan.baseEnergy,
        planType: plan.planType,
        status: plan.status,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ["price", "durationDays", "maxBatteries", "baseMileage", "baseEnergy"].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleUpdate = () => {
        dispatch(updatePlan({ id: plan.id, payload: formData })).then(() => {
            onClose();
        });
    };

    return (
        <FormCard sx={{ p: 1 }}>
            <FormBox>
                <StyledTextField label="Tên Gói" name="name" value={formData.name} onChange={handleChange} fullWidth />
                <StyledTextField label="Giá" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth />
                <StyledTextField label="Thời gian" name="durationDays" type="number" value={formData.durationDays} onChange={handleChange} fullWidth />
                <StyledTextField label="Số Pin" name="maxBatteries" type="number" value={formData.maxBatteries} onChange={handleChange} fullWidth />
                <FullWidthBox>
                    <StyledTextField label="Quãng đường (km)" name="baseMileage" type="number" value={formData.baseMileage} onChange={handleChange} fullWidth />
                </FullWidthBox>
                <FullWidthBox>
                    <StyledTextField label="Năng lượng (kWh)" name="baseEnergy" type="number" value={formData.baseEnergy} onChange={handleChange} fullWidth />
                </FullWidthBox>
                <FullWidthBox>
                    <StyledTextField select label="Loại Gói" name="planType" value={formData.planType} onChange={handleChange} fullWidth>
                        {["DISTANCE", "ENERGY", "UNLIMITED"].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                    </StyledTextField>
                </FullWidthBox>
                <FullWidthBox>
                    <StyledTextField select label="Trạng thái" name="status" value={formData.status} onChange={handleChange} fullWidth>
                        {["ACTIVE", "INACTIVE"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </StyledTextField>
                </FullWidthBox>
                <FullWidthBox>
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                                background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                "&:hover": { transform: "translateY(-2px)" },
                            }}
                        >
                            Cập nhật
                        </Button>
                    </Box>
                </FullWidthBox>
            </FormBox>
        </FormCard>
    );
};

export default SubscriptionPlanUpdateForm;