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

const planTypeOptions: SubscriptionPlan["planType"][] = ["DISTANCE", "ENERGY", "UNLIMITED"];

const CreateSubscriptionPlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [durationDays, setDurationDays] = useState(0);
    const [maxBatteries, setMaxBatteries] = useState(1);
    const [baseMileage, setBaseMileage] = useState(0);
    const [baseEnergy, setBaseEnergy] = useState(0);
    const [planType, setPlanType] = useState<SubscriptionPlan["planType"]>("DISTANCE");
    const [status, setStatus] = useState<SubscriptionPlan["status"]>("ACTIVE");

    const handleCreate = () => {
        const payload: CreateSubscriptionPlanPayload = {
            name,
            price,
            durationDays,
            maxBatteries,
            baseMileage,
            baseEnergy,
            planType,
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
        setBaseEnergy(0);
        setPlanType("DISTANCE");
        setStatus("ACTIVE");
    };

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8" }}>
                <Title>Tạo Gói Đăng Ký Mới</Title>
                <FormBox>
                    <StyledTextField
                        label="Tên Gói"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <StyledTextField // Price cạnh name
                        label="Giá"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                    <StyledTextField // Duration
                        label="Thời gian (ngày)"
                        type="number"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        required
                    />
                    <StyledTextField // Max Batteries cạnh duration
                        label="Số Pin Tối Đa"
                        type="number"
                        value={maxBatteries}
                        onChange={(e) => setMaxBatteries(Number(e.target.value))}
                        required
                    />
                    <FullWidthBox> {/* Base Mileage full */}
                        <StyledTextField
                            label="Quá trình (km)"
                            type="number"
                            value={baseMileage}
                            onChange={(e) => setBaseMileage(Number(e.target.value))}
                            required
                        />
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            label="Năng lượng cơ bản"
                            type="number"
                            value={baseEnergy}
                            onChange={(e) => setBaseEnergy(Number(e.target.value))}
                            required
                        />
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Loại Gói"
                            value={planType}
                            onChange={(e) => setPlanType(e.target.value as SubscriptionPlan["planType"])}
                            required
                        >
                            {planTypeOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>
                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Trạng thái"
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