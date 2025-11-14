// src/features/station/components/UpdateStationForm.tsx
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    SelectChangeEvent,
} from "@mui/material";
import {
    FormCard,
    StyledTextField,
    FormBox,
    FullWidthBox,
} from "../styles/CreateStationForm";
import { Station, UpdateStationPayload } from "../types/StationType";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { updateStation } from "../StationThunks";
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

interface Props {
    open: boolean;
    station: Station | null;
    onClose: () => void;
}

const UpdateStationForm: React.FC<Props> = ({ open, station, onClose }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.station);
    const [formData, setFormData] = useState<UpdateStationPayload>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (station) {
            setFormData({
                name: station.name,
                location: station.location,
                status: station.status,
                capacity: station.capacity,
                phone: station.phone,
                latitude: station.latitude,
                longitude: station.longitude,
            });
        }
    }, [station]);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<unknown>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
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
        if (formData.name && !formData.name.trim())
            newErrors.name = "Tên trạm không được để trống";
        if (formData.location && !formData.location.trim())
            newErrors.location = "Địa điểm không được để trống";
        if (formData.capacity !== undefined && formData.capacity < 1)
            newErrors.capacity = "Sức chứa phải ≥ 1";
        if (
            formData.phone &&
            !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
        )
            newErrors.phone = "Số điện thoại không hợp lệ";
        if (formData.latitude !== undefined && (formData.latitude < -90 || formData.latitude > 90))
            newErrors.latitude = "Vĩ độ phải từ -90 đến 90";
        if (formData.longitude !== undefined && (formData.longitude < -180 || formData.longitude > 180))
            newErrors.longitude = "Kinh độ phải từ -180 đến 180";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!station || !validate()) return;

        dispatch(updateStation({ id: station.id, payload: formData }))
            .unwrap()
            .then(() => {
                dispatch(
                    showNotification({
                        message: "Cập nhật trạm thành công!",
                        type: "success",
                    })
                );
                onClose();
            })
            .catch(() => {
                dispatch(
                    showNotification({
                        message: "Cập nhật thất bại. Vui lòng thử lại.",
                        type: "error",
                    })
                );
            });
    };

    if (!station) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem", pb: 1 }}>
                Cập nhật: {station.name}
            </DialogTitle>

            <DialogContent dividers>
                <FormCard>
                    <FormBox>
                        <StyledTextField
                            label="Tên Trạm"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <StyledTextField
                            label="Địa điểm"
                            name="location"
                            value={formData.location || ""}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.location}
                            helperText={errors.location}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                name="status"
                                value={formData.status || "ACTIVE"}
                                label="Trạng thái"
                                onChange={handleChange}
                            >
                                <MenuItem value="ACTIVE">Hoạt động</MenuItem>
                                <MenuItem value="INACTIVE">Ngừng hoạt động</MenuItem>
                            </Select>
                        </FormControl>
                        <StyledTextField
                            label="Sức chứa"
                            name="capacity"
                            type="number"
                            value={formData.capacity ?? ""}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.capacity}
                            helperText={errors.capacity || "Phải ≥ 1"}
                            inputProps={{ min: 1 }}
                        />
                        <FullWidthBox>
                            <StyledTextField
                                label="Số điện thoại"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.phone}
                                helperText={errors.phone || "Ví dụ: +846464373666"}
                                placeholder="+846464373666"
                            />
                        </FullWidthBox>
                        <StyledTextField
                            label="Vĩ độ (Latitude)"
                            name="latitude"
                            type="number"
                            value={formData.latitude ?? ""}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.latitude}
                            helperText={errors.latitude || "Từ -90 đến 90"}
                            inputProps={{ step: "0.000001" }}
                        />
                        <StyledTextField
                            label="Kinh độ (Longitude)"
                            name="longitude"
                            type="number"
                            value={formData.longitude ?? ""}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.longitude}
                            helperText={errors.longitude || "Từ -180 đến 180"}
                            inputProps={{ step: "0.000001" }}
                        />
                    </FormBox>
                </FormCard>
            </DialogContent>

            <DialogActions>
                <FullWidthBox sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <Button onClick={onClose} color="inherit" disabled={loading}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </FullWidthBox>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateStationForm;