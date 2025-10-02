import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { updatePlan } from "../SubcriptionPlanThunks";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "../types/SubscriptionPlanType";

// Import styled
import {
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
} from "../styles/SubscriptionPlanStyles";

interface SubscriptionPlanUpdateFormProps {
    plan: SubscriptionPlan;
    onClose: () => void;
}

const SubscriptionPlanUpdateForm: React.FC<SubscriptionPlanUpdateFormProps> = ({ plan, onClose }) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<CreateSubscriptionPlanPayload>({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        maxBatteries: plan.maxBatteries,
        baseMileage: plan.baseMileage,
        status: plan.status
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "status" ? value : Number(value) || value
        }));
    };

    const handleUpdate = async () => {
        await dispatch(updatePlan({ id: plan.id, payload: formData }));
        onClose();
    };

    return (
        <FormCard sx={{ border: "1px solid #E8F5E8", p: 2 }}> {/* Viền pastel + padding */}
            <FormBox> {/* Grid */}
                <StyledTextField // Name
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <StyledTextField // Price cạnh
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                />
                <StyledTextField // Duration
                    label="Duration Days"
                    name="durationDays"
                    type="number"
                    value={formData.durationDays}
                    onChange={handleChange}
                    fullWidth
                />
                <StyledTextField // Max Batteries
                    label="Max Batteries"
                    name="maxBatteries"
                    type="number"
                    value={formData.maxBatteries}
                    onChange={handleChange}
                    fullWidth
                />
                <FullWidthBox> {/* Base Mileage full */}
                    <StyledTextField
                        label="Base Mileage"
                        name="baseMileage"
                        type="number"
                        value={formData.baseMileage}
                        onChange={handleChange}
                        fullWidth
                    />
                </FullWidthBox>
                <FullWidthBox> {/* Status full */}
                    <StyledTextField
                        select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                        <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                    </StyledTextField>
                </FullWidthBox>
                <FullWidthBox> {/* Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={onClose} color="inherit">
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" onClick={handleUpdate}> {/* Xanh lá */}
                            Update
                        </Button>
                    </Box>
                </FullWidthBox>
            </FormBox>
        </FormCard>
    );
};

export default SubscriptionPlanUpdateForm;