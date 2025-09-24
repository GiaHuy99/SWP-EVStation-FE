import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { updatePlan, deletePlan } from "../SubcriptionPlanThunks";
import { CreateSubscriptionPlanPayload, SubscriptionPlan } from "../types/SubscriptionPlanType";

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

    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete this plan?")) {
            await dispatch(deletePlan(plan.id));
            onClose();
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth />
            <TextField label="Duration Days" name="durationDays" type="number" value={formData.durationDays} onChange={handleChange} fullWidth />
            <TextField label="Max Batteries" name="maxBatteries" type="number" value={formData.maxBatteries} onChange={handleChange} fullWidth />
            <TextField label="Base Mileage" name="baseMileage" type="number" value={formData.baseMileage} onChange={handleChange} fullWidth />
            <TextField select label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth>
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </TextField>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default SubscriptionPlanUpdateForm;
