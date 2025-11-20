// src/features/subscriptionPlan/components/CreateSubscriptionPlanForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Button, Box, Typography } from "@mui/material";
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

    const [errors, setErrors] = useState<{ name?: string }>({});

    // CHỈ CHO PHÉP CHỮ CÁI, SỐ, KHOẢNG TRẮNG, GẠCH NGANG, DẤU CHẤM
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸÝ\s-]*$/;

        if (!regex.test(value)) {
            setErrors({ name: "Tên gói chỉ được chứa chữ cái, số, khoảng trắng và dấu gạch ngang" });
        } else {
            setErrors({});
        }

        setForm(prev => ({ ...prev, name: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value === "" ? 0 : Number(value),
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = () => {
        if (!form.name.trim()) {
            setErrors({ name: "Vui lòng nhập tên gói" });
            return;
        }
        if (form.name.length < 3) {
            setErrors({ name: "Tên gói phải có ít nhất 3 ký tự" });
            return;
        }

        dispatch(createSubscriptionPlan(form)).then(() => {
            navigate("/subcriptionPlan/list");
        });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Gói Đăng Ký Mới</Title>
                <FormBox>

                    {/* TÊN GÓI – CHỈ CHO NHẬP CHỮ, SỐ, KÝ TỰ ĐẸP */}
                    <StyledTextField
                        label="Tên Gói (VD: Gói 30 Ngày, VIP Unlimited)"
                        name="name"
                        value={form.name}
                        onChange={handleNameChange}
                        required
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name || "Chỉ chữ cái, số, khoảng trắng và dấu -"}
                        placeholder="Gói 30 Ngày Không Giới Hạn"
                        inputProps={{
                            maxLength: 50,
                        }}
                    />

                    <StyledTextField
                        label="Giá (VND)"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleNumberChange}
                        required
                        fullWidth
                        inputProps={{ min: 0, step: 1000 }}
                    />

                    <StyledTextField
                        label="Thời gian (ngày)"
                        name="durationDays"
                        type="number"
                        value={form.durationDays}
                        onChange={handleNumberChange}
                        required
                        fullWidth
                        inputProps={{ min: 1, max: 365 }}
                    />

                    <StyledTextField
                        label="Số Pin Tối Đa"
                        name="maxBatteries"
                        type="number"
                        value={form.maxBatteries}
                        onChange={handleNumberChange}
                        required
                        fullWidth
                        inputProps={{ min: 1, max: 10 }}
                    />

                    <FullWidthBox>
                        <StyledTextField
                            label="Quãng đường cơ bản (km)"
                            name="baseMileage"
                            type="number"
                            value={form.baseMileage}
                            onChange={handleNumberChange}
                            fullWidth
                            inputProps={{ min: 0 }}
                        />
                    </FullWidthBox>

                    <FullWidthBox>
                        <StyledTextField
                            label="Năng lượng cơ bản (kWh)"
                            name="baseEnergy"
                            type="number"
                            value={form.baseEnergy}
                            onChange={handleNumberChange}
                            fullWidth
                            inputProps={{ min: 0, step: 0.1 }}
                        />
                    </FullWidthBox>

                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Loại Gói"
                            name="planType"
                            value={form.planType}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            {planTypeOptions.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option === "DISTANCE" && "Theo quãng đường"}
                                    {option === "ENERGY" && "Theo năng lượng"}
                                    {option === "UNLIMITED" && "Không giới hạn"}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>

                    <FullWidthBox>
                        <StyledTextField
                            select
                            label="Trạng thái"
                            name="status"
                            value={form.status}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            {statusOptions.map(s => (
                                <MenuItem key={s} value={s}>
                                    {s === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                    </FullWidthBox>

                    <FullWidthBox>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleCreate}
                            disabled={!form.name.trim() || !!errors.name}
                            sx={{
                                py: 2,
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                boxShadow: "0 8px 20px rgba(76, 66, 140, 0.3)",
                                "&:hover": {
                                    boxShadow: "0 12px 30px rgba(76, 66, 140, 0.4)",
                                    transform: "translateY(-3px)",
                                },
                                "&:disabled": {
                                    background: "#94a3b8",
                                    boxShadow: "none",
                                },
                                fontWeight: 700,
                                fontSize: "1.2rem",
                                textTransform: "none",
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