// src/features/batteryType/components/CreateBatteryTypeForm.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/Hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../../../styles/AdminDashboardStyles";
import { CreateBatteryTypePayload } from "../types/BatteryType"; // ĐÚNG
import { createBattery } from "../BatteryThunk"; // ĐÚNG
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

const CreateBatteryTypeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateBatteryTypePayload>({
        name: "",
        type: "",
        designCapacity: 0,
        description: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const processedValue = type === "number" ? parseFloat(value) || 0 : value;
        setForm((prev) => ({ ...prev, [name]: processedValue }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = "Tên model không được để trống";
        if (!form.type.trim()) newErrors.type = "Loại xe không được để trống";
        if (form.designCapacity <= 0) newErrors.designCapacity = "Dung lượng phải > 0";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(createBattery(form)) // ĐÚNG
            .unwrap()
            .then(() => {
                dispatch(showNotification({ message: "Tạo loại pin thành công!", type: "success" }));
                navigate("/battery-types");
            })
            .catch((error) => {
                dispatch(showNotification({ message: error || "Tạo thất bại.", type: "error" }));
            });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title>Tạo Loại Pin Mới</Title>
                <form onSubmit={handleSubmit}>
                    <FormBox>
                        {/* Row 1 */}
                        <StyledTextField
                            label="Tên Model"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />

                        <StyledTextField
                            label="Loại Xe"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                            error={!!errors.type}
                            helperText={errors.type || "Ví dụ: Scooter, Bike"}
                        />

                        {/* Row 2 */}
                        <FullWidthBox>
                            <StyledTextField
                                label="Dung Lượng Thiết Kế (Ah)"
                                name="designCapacity"
                                type="number"
                                value={form.designCapacity}
                                onChange={handleChange}
                                required
                                error={!!errors.designCapacity}
                                helperText={errors.designCapacity || "Phải > 0"}
                                inputProps={{ step: "0.1", min: "0.1" }}
                            />
                        </FullWidthBox>

                        <FullWidthBox>
                            <StyledTextField
                                label="Mô Tả"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                placeholder="Thông tin bổ sung về loại pin..."
                            />
                        </FullWidthBox>

                        {/* Submit Button */}
                        <FullWidthBox>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 2,
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                                    boxShadow: "0 4px 14px rgba(76, 66, 140, 0.3)",
                                    "&:hover": {
                                        boxShadow: "0 8px 25px rgba(76, 66, 140, 0.4)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                Tạo Loại Pin
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateBatteryTypeForm;