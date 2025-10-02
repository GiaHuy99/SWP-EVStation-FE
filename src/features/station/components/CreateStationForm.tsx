import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createStation } from "../StationThunks";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    Button,
} from "@mui/material";
import {
    PageContainer, // Thêm wrap background
    FormCard, // Thêm card với viền pastel
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title, // Thêm title
} from "../styles/CreateStationForm";
import { CreateStationPayload } from "../types/StationType";
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

const CreateStationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.station);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        location: "",
        status: "ACTIVE",
        capacity: 0,
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createStation({ ...form, capacity: Number(form.capacity) } as CreateStationPayload))
            .unwrap()
            .then(() => {
                dispatch(showNotification({ message: "Station created successfully!", type: "success" })); // Fix message
                navigate("/stations/list"); // chuyển về list
            })
            .catch(() => {
                dispatch(showNotification({ message: "Failed to create station.", type: "error" })); // Fix message
            });
    };

    if (loading) return <div>Đang tạo station...</div>; // Thêm handle loading
    if (error) return <div>Lỗi: {error}</div>; // Thêm handle error

    return (
        <PageContainer> {/* Wrap với background nhẹ #F9FAFB */}
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Card với viền ngoài xanh lá pastel */}
                <Title>Create Station</Title> {/* Title bold, center */}
                <form onSubmit={handleSubmit}>
                    <FormBox> {/* Grid responsive: 1fr mobile, 1fr 1fr desktop */}
                        <StyledTextField // Name
                            label="Station Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <StyledTextField // Location cạnh name trên desktop
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                        <StyledTextField // Status select
                            select
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="ACTIVE">Active</MenuItem>
                            <MenuItem value="INACTIVE">Inactive</MenuItem>
                        </StyledTextField>
                        <StyledTextField // Capacity cạnh status
                            label="Capacity"
                            name="capacity"
                            type="number"
                            value={form.capacity}
                            onChange={handleChange}
                            required
                        />
                        <FullWidthBox> {/* Phone full width */}
                            <StyledTextField
                                label="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </FullWidthBox>
                        <FullWidthBox> {/* Button full width */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="success" // Đổi thành xanh lá khớp theme
                                size="large"
                                fullWidth
                                sx={{ mt: 2, py: 1.5 }} // Padding mượt hơn
                            >
                                Create Station
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateStationForm;