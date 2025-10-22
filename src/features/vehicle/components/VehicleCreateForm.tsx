import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createVehicle } from "../VehicleThunks";
import { CreateVehiclePayload } from "../types/VehicleMockType";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { FormCard, Title, FormRow } from "../styles/VehicleFormStyles";

const VehicleCreateForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.vehicle);

    const [formData, setFormData] = useState<CreateVehiclePayload>({
        vin: "",
        licensePlate: "",
        model: "",
        manufacturer: "",
        color: "",
        year: new Date().getFullYear(),
        wheelbase: 0,
        seatHeight: 0,
        weightWithBattery: 0,
        batteryPercentage: 100,
        mileage: 0,
        status: "ACTIVE",
        userId: 1  // Temporary hardcoded userId
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['year', 'wheelbase', 'seatHeight', 'weightWithBattery', 'batteryPercentage', 'mileage'].includes(name) 
                ? Number(value) 
                : value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const result = await dispatch(createVehicle(formData));
            if (createVehicle.fulfilled.match(result)) {
                // Nếu tạo thành công, chuyển về trang danh sách
                navigate("/vehicle/list");
            }
        } catch (error) {
            console.error("Failed to create vehicle:", error);
        }
    };

    return (
        <FormCard>
            <Title variant="h5">Create Vehicle</Title>
            <FormRow>
                <TextField label="VIN" name="vin" value={formData.vin} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Giấy Đăng Ký" name="licensePlate" value={formData.licensePlate} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Nhà Sản Xuất" name="manufacturer" value={formData.manufacturer} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Màu" name="color" value={formData.color} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Năm" name="year" type="number" value={formData.year} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Chiều Dài (mm)" name="wheelbase" type="number" value={formData.wheelbase} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Chiều Cao Ghế (mm)" name="seatHeight" type="number" value={formData.seatHeight} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Trọng Lượng Cả Pin (kg)" name="weightWithBattery" type="number" value={formData.weightWithBattery} onChange={handleChange} fullWidth />
                <Box mt={2} />
                <TextField label="Tỷ Lệ Pin" name="batteryPercentage" type="number" value={formData.batteryPercentage} onChange={handleChange} fullWidth
                    inputProps={{ min: 0, max: 100 }} />
                <Box mt={2} />
                <TextField label="Quá Trình (km)" name="mileage" type="number" value={formData.mileage} onChange={handleChange} fullWidth />
            </FormRow>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Tạo Vehicle"}
                </Button>
            </Box>
        </FormCard>
    );
};

export default VehicleCreateForm;
