// src/components/CreateBatteryForm.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createBattery } from "../BatteryThunk";
import { fetchStations } from "../../station/StationThunks";
import { CreateBatteryPayload } from "../types/BatteryType";
import { Button, MenuItem } from "@mui/material";
import { showNotification } from "../../../shared/utils/notification/notificationSlice";
import { useNavigate } from "react-router-dom";

// Import styled components từ file trước (thay path thực tế)
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from "../styles/CreateBatteryForm"; // Ví dụ: '../../../styles/BatteryStyles'

const CreateBatteryForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { stations } = useAppSelector((state) => state.station);
    const [form, setForm] = useState<CreateBatteryPayload>({
        serialNumber: "",
        status: "AVAILABLE",
        swapCount: 0,
        stationId: 0,
    });

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createBattery(form))
            .unwrap()
            .then(() => {
                dispatch(showNotification({ message: "Battery created successfully!", type: "success" }));
                navigate("/battery/list"); // chuyển về list
            })
            .catch(() => {
                dispatch(showNotification({ message: "Failed to create battery.", type: "error" }));
            });
    };

    return (
        <PageContainer> {/* Wrap toàn bộ với background nhẹ */}
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Thêm viền ngoài xanh lá pastel */}
                <Title>Tạo Pin mới</Title> {/* Title styled bold, center */}
                <form onSubmit={handleSubmit}>
                    <FormBox> {/* Grid responsive: 1fr mobile, 1fr 1fr desktop */}
                        <StyledTextField // Serial Number với pastel background
                            label="Số Seri"
                            name="serialNumber"
                            value={form.serialNumber}
                            onChange={handleChange}
                            required
                        />
                        <StyledTextField // Status select
                            select
                            label="Trạng thái"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                            <MenuItem value="IN_USE">IN_USE</MenuItem>
                            <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                        </StyledTextField>
                        <StyledTextField // Swap Count number
                            type="number"
                            label="Số lần đổi"
                            name="swapCount"
                            value={form.swapCount}
                            onChange={handleChange}
                        />
                        <StyledTextField // Station select
                            select
                            label="Trạm"
                            name="stationId"
                            value={form.stationId}
                            onChange={handleChange}
                            required
                        >
                            {stations.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                        <FullWidthBox> {/* Button full width */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="success" // Màu xanh để khớp theme
                                fullWidth
                                sx={{ mt: 2, py: 1.5 }} // Padding thoải mái hơn
                            >
                                Lưu
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateBatteryForm;