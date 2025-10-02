import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    Button,
} from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { createSubscriptionPlan } from "../SubcriptionPlanThunks";
import { SubscriptionPlan, CreateSubscriptionPlanPayload } from "../types/SubscriptionPlanType";

// Import styled đồng bộ
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../styles/SubscriptionPlanStyles";

const statusOptions: SubscriptionPlan["status"][] = ["ACTIVE", "INACTIVE"];

const CreateSubscriptionPlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            navigate("/subcriptionPlan/list");
        });
        // Reset form
        setName("");
        setPrice(0);
        setDurationDays(0);
        setMaxBatteries(1);
        setBaseMileage(0);
        setStatus("ACTIVE");
    };

    return (
        <PageContainer> {/* Wrap background #F9FAFB */}
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Viền pastel */}
                <Title>Create Subscription Plan</Title> {/* Title đồng bộ */}
                <FormBox> {/* Grid responsive */}
                    <StyledTextField // Name
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <StyledTextField // Price cạnh name
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                    <StyledTextField // Duration
                        label="Duration (days)"
                        type="number"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        required
                    />
                    <StyledTextField // Max Batteries cạnh duration
                        label="Max Batteries"
                        type="number"
                        value={maxBatteries}
                        onChange={(e) => setMaxBatteries(Number(e.target.value))}
                        required
                    />
                    <FullWidthBox> {/* Base Mileage full */}
                        <StyledTextField
                            label="Base Mileage"
                            type="number"
                            value={baseMileage}
                            onChange={(e) => setBaseMileage(Number(e.target.value))}
                            required
                        />
                    </FullWidthBox>
                    <FullWidthBox> {/* Status full */}
                        <StyledTextField
                            select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as SubscriptionPlan["status"])}
                        >
                            {statusOptions.map((s) => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>
                    <FullWidthBox> {/* Button full */}
                        <Button
                            variant="contained"
                            color="success" // Xanh lá
                            onClick={handleCreate}
                            fullWidth
                            sx={{ py: 1.5 }}
                        >
                            Create
                        </Button>
                    </FullWidthBox>
                </FormBox>
            </FormCard>
        </PageContainer>
    );
};

export default CreateSubscriptionPlanForm;