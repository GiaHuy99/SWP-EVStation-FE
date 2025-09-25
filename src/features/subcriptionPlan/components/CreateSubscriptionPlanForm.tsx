import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    Box,
} from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { createSubscriptionPlan } from "../SubcriptionPlanThunks";
import { SubscriptionPlan, CreateSubscriptionPlanPayload } from "../types/SubscriptionPlanType";

interface CreateSubscriptionPlanFormProps {}

const statusOptions: SubscriptionPlan["status"][] = ["ACTIVE", "INACTIVE"];

const CreateSubscriptionPlanForm: React.FC<CreateSubscriptionPlanFormProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // tạo navigate
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [durationDays, setDurationDays] = useState(0);
    const [maxBatteries, setMaxBatteries] = useState(1);
    const [baseMileage, setBaseMileage] = useState(0);
    const [status, setStatus] = useState<SubscriptionPlan["status"]>("ACTIVE");

    const handleCreate = () => {
        const payload: CreateSubscriptionPlanPayload = {
            name,
            price,
            durationDays,
            maxBatteries,
            baseMileage,
            status,
        };
        dispatch(createSubscriptionPlan(payload)).then(() => {
            // sau khi thành công, chuyển sang list page
            navigate("/subcriptionPlan/list");
        });
        // reset form
        setName("");
        setPrice(0);
        setDurationDays(0);
        setMaxBatteries(1);
        setBaseMileage(0);
        setStatus("ACTIVE");
    };

    return (
        <Box>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
                label="Duration (days)"
                type="number"
                fullWidth
                margin="normal"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
            />
            <TextField
                label="Max Batteries"
                type="number"
                fullWidth
                margin="normal"
                value={maxBatteries}
                onChange={(e) => setMaxBatteries(Number(e.target.value))}
            />
            <TextField
                label="Base Mileage"
                type="number"
                fullWidth
                margin="normal"
                value={baseMileage}
                onChange={(e) => setBaseMileage(Number(e.target.value))}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as SubscriptionPlan["status"])}
                >
                    {statusOptions.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Create
                </Button>
            </Box>
        </Box>
    );
};

export default CreateSubscriptionPlanForm;
