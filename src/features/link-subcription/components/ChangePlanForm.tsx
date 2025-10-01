// src/features/subscription/components/ChangePlanForm.tsx
import React, { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { changeSubscriptionPlan } from "../SubscriptionThunks";

interface ChangePlanFormProps {
    subscriptionId: number;
}

const ChangePlanForm: React.FC<ChangePlanFormProps> = ({ subscriptionId }) => {
    const dispatch = useAppDispatch();
    const { plans, changeMessage } = useAppSelector((state) => state.subcription);
    const [newPlanId, setNewPlanId] = useState<number | "">("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPlanId) return;
        dispatch(changeSubscriptionPlan({ subscriptionId, newPlanId: newPlanId as number }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h6" gutterBottom>
                Change Subscription Plan
            </Typography>

            <TextField
                select
                label="Select New Plan"
                fullWidth
                margin="normal"
                value={newPlanId}
                onChange={(e) => setNewPlanId(Number(e.target.value))}
                required
            >
                {plans.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                        {plan.name}
                    </MenuItem>
                ))}
            </TextField>

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Change Plan
            </Button>

            {changeMessage && (
                <Typography sx={{ mt: 2 }} color="secondary">
                    {changeMessage}
                </Typography>
            )}
        </Box>
    );
};

export default ChangePlanForm;
