// src/features/subscriptionPlan/components/CreateSubscriptionPlanForm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    Button,
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
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
import { message } from "antd";

const planTypeOptions = ["DISTANCE", "ENERGY", "UNLIMITED"] as const;
const statusOptions = ["ACTIVE", "INACTIVE"] as const;

const CreateSubscriptionPlanForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateSubscriptionPlanPayload>({
        name: "",
        price: 0,
        durationDays: 30,
        maxBatteries: 1,
        baseMileage: null,
        baseEnergy: null,
        minSoH: null,
        maxSoH: null,
        planType: "ENERGY",
        status: "ACTIVE",
    });

    const [errors, setErrors] = useState<{ name?: string }>({});

    // Theo dõi loại gói để ẩn/hiện field
    const isEnergyPlan = form.planType === "ENERGY";
    const isDistancePlan = form.planType === "DISTANCE";

    useEffect(() => {
        // Reset các field khi đổi loại gói
        if (!isEnergyPlan) {
            setForm(prev => ({ ...prev, baseEnergy: null, minSoH: null, maxSoH: null }));
        }
        if (!isDistancePlan) {
            setForm(prev => ({ ...prev, baseMileage: null }));
        }
    }, [form.planType]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸÝ\s\-.]*$/;

        if (value && !regex.test(value)) {
            setErrors({ name: "Chỉ được dùng chữ, số, khoảng trắng, gạch ngang và dấu chấm" });
        } else {
            setErrors({});
        }
        setForm(prev => ({ ...prev, name: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = value === "" ? null : Number(value);
        setForm(prev => ({ ...prev, [name]: numValue }));
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
        if (form.name.trim().length < 3) {
            setErrors({ name: "Tên gói phải ít nhất 3 ký tự" });
            return;
        }

        // Validate SoH cho gói ENERGY
        if (isEnergyPlan) {
            if (!form.minSoH || !form.maxSoH) {
                message.warning("Gói ENERGY phải nhập khoảng SoH");
                return;
            }
            if (form.minSoH < 0 || form.maxSoH > 100 || form.minSoH > form.maxSoH) {
                message.warning("SoH phải từ 0-100 và min ≤ max");
                return;
            }
        }

        dispatch(createSubscriptionPlan(form))
            .unwrap()
            .then(() => {
                message.success("Tạo gói thành công!");
                navigate("/subscriptionPlan/list");
            })
            .catch((err) => {
                message.error(err?.message || "Tạo gói thất bại");
            });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Gói Gói Đăng Ký Mới</Title>
                <FormBox gap={3}>

                    {/* TÊN GÓI */}
                    <StyledTextField
                        label="Tên Gói"
                        name="name"
                        value={form.name}
                        onChange={handleNameChange}
                        required
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name || "Ví dụ: Premium Energy 1, Gói 30 Ngày VIP"}
                        placeholder="Premium Energy 1"
                        inputProps={{ maxLength: 60 }}
                    />

                    {/* GIÁ & THỜI GIAN */}
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                    </Box>

                    {/* SỐ PIN TỐI ĐA */}
                    <StyledTextField
                        label="Số Pin Tối Đa"
                        name="maxBatteries"
                        type="number"
                        value={form.maxBatteries}
                        onChange={handleNumberChange}
                        required
                        fullWidth
                        inputProps={{ min: 1, max: 20 }}
                    />

                    {/* LOẠI GÓI */}
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
                                {option === "DISTANCE" && "Theo quãng đường (km)"}
                                {option === "ENERGY" && "Theo năng lượng (kWh + SoH)"}
                                {option === "UNLIMITED" && "Không giới hạn"}
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    {/* GÓI THEO QUÃNG ĐƯỜNG */}
                    {isDistancePlan && (
                        <StyledTextField
                            label="Quãng đường cơ bản (km)"
                            name="baseMileage"
                            type="number"
                            value={form.baseMileage ?? ""}
                            onChange={handleNumberChange}
                            fullWidth
                            required={isDistancePlan}
                            helperText="Số km được sử dụng miễn phí"
                            inputProps={{ min: 0 }}
                        />
                    )}

                    {/* GÓI THEO NĂNG LƯỢNG */}
                    {isEnergyPlan && (
                        <>
                            <StyledTextField
                                label="Năng lượng cơ bản (kWh)"
                                name="baseEnergy"
                                type="number"
                                value={form.baseEnergy ?? ""}
                                onChange={handleNumberChange}
                                fullWidth
                                required
                                inputProps={{ min: 0, step: 0.1 }}
                                helperText="Tổng năng lượng được dùng trong tháng"
                            />

                            <Box sx={{ display: "flex", gap: 2 }}>
                                <StyledTextField
                                    label="SoH Tối Thiểu (%)"
                                    name="minSoH"
                                    type="number"
                                    value={form.minSoH ?? ""}
                                    onChange={handleNumberChange}
                                    fullWidth
                                    required
                                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                                />
                                <StyledTextField
                                    label="SoH Tối Đa (%)"
                                    name="maxSoH"
                                    type="number"
                                    value={form.maxSoH ?? ""}
                                    onChange={handleNumberChange}
                                    fullWidth
                                    required
                                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                                />
                            </Box>

                        </>
                    )}

                    {/* TRẠNG THÁI */}
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

                    {/* NÚT TẠO */}
                    <FullWidthBox>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleCreate}
                            disabled={!form.name.trim() || !!errors.name}
                            sx={{
                                py: 2.5,
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                fontSize: "1.3rem",
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)",
                                },
                            }}
                        >
                            TẠO GÓI MỚI
                        </Button>
                    </FullWidthBox>
                </FormBox>
            </FormCard>
        </PageContainer>
    );
};

export default CreateSubscriptionPlanForm;