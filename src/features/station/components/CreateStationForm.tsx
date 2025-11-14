import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createStation } from "../StationThunks";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    Button,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Box,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../styles/CreateStationForm"; // ← Updated import
import { CreateStationPayload } from "../types/StationType";
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

const CreateStationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.station);
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateStationPayload>({
        name: "",
        location: "",
        status: "ACTIVE",
        capacity: 1,
        phone: "",
        latitude: 0,
        longitude: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<unknown>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name!]:
                ["capacity", "latitude", "longitude"].includes(name!)
                    ? Number(value)
                    : value,
        }));

        if (errors[name!]) {
            setErrors((prev) => ({ ...prev, [name!]: "" }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = "Tên trạm không được để trống";
        if (!form.location.trim()) newErrors.location = "Địa điểm không được để trống";
        if (form.capacity < 1) newErrors.capacity = "Sức chứa phải ≥ 1";
        if (!/^\+?[0-9]{10,15}$/.test(form.phone.replace(/\s/g, "")))
            newErrors.phone = "Số điện thoại không hợp lệ (10-15 số)";
        if (form.latitude < -90 || form.latitude > 90)
            newErrors.latitude = "Vĩ độ phải từ -90 đến 90";
        if (form.longitude < -180 || form.longitude > 180)
            newErrors.longitude = "Kinh độ phải từ -180 đến 180";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(createStation(form))
            .unwrap()
            .then(() => {
                dispatch(
                    showNotification({
                        message: "Tạo trạm thành công!",
                        type: "success",
                    })
                );
                navigate("/stations/list");
            })
            .catch(() => {
                dispatch(
                    showNotification({
                        message: "Tạo trạm thất bại. Vui lòng thử lại.",
                        type: "error",
                    })
                );
            });
    };

    // Loading State
    if (loading) {
        return (
            <PageContainer>
                <FormCard>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="50vh"
                        gap={2}
                    >
                        <CircularProgress size={48} thickness={4} />
                        <Typography variant="body2" color="text.secondary">
                            Đang tạo trạm...
                        </Typography>
                    </Box>
                </FormCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <FormCard>

                <form onSubmit={handleSubmit}>
                    <FormBox>
                        {/* Row 1: Name + Location */}
                        <StyledTextField
                            label="Tên Trạm"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <StyledTextField
                            label="Địa điểm"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            error={!!errors.location}
                            helperText={errors.location}
                        />

                        {/* Row 2: Status + Capacity */}
                        <FormControl fullWidth>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                name="status"
                                value={form.status}
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                                <MenuItem value="ACTIVE">Hoạt động</MenuItem>
                                <MenuItem value="INACTIVE">Ngừng hoạt động</MenuItem>
                            </Select>
                        </FormControl>

                        <StyledTextField
                            label="Sức chứa (số pin)"
                            name="capacity"
                            type="number"
                            value={form.capacity}
                            onChange={handleChange}
                            required
                            error={!!errors.capacity}
                            helperText={errors.capacity || "Phải ≥ 1"}
                            inputProps={{ min: 1 }}
                        />

                        {/* Row 3: Phone (full width) */}
                        <FullWidthBox>
                            <StyledTextField
                                label="Điện thoại"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                error={!!errors.phone}
                                helperText={errors.phone || "Ví dụ: +846464373666"}
                                placeholder="+846464373666"
                            />
                        </FullWidthBox>

                        {/* Row 4: Latitude + Longitude */}
                        <StyledTextField
                            label="Vĩ độ (Latitude)"
                            name="latitude"
                            type="number"
                            value={form.latitude}
                            onChange={handleChange}
                            required
                            error={!!errors.latitude}
                            helperText={errors.latitude || "Từ -90 đến 90"}
                            inputProps={{ step: "0.000001" }}
                        />
                        <StyledTextField
                            label="Kinh độ (Longitude)"
                            name="longitude"
                            type="number"
                            value={form.longitude}
                            onChange={handleChange}
                            required
                            error={!!errors.longitude}
                            helperText={errors.longitude || "Từ -180 đến 180"}
                            inputProps={{ step: "0.000001" }}
                        />

                        {/* Submit Button */}
                        <FullWidthBox>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                size="large"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    py: 1.8,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    fontSize: "1.1rem",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 14px rgba(34, 197, 94, 0.3)",
                                    "&:hover": {
                                        boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                {loading ? "Đang tạo..." : "Tạo Trạm Mới"}
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateStationForm;