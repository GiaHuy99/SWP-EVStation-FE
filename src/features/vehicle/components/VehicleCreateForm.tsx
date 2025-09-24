import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createVehicle } from "../VehicleThunks";
import { CreateVehiclePayload } from "../types/VehicleType";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { FormCard, Title, FormRow } from "../styles/VehicleFormStyles";

const VehicleCreateForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.vehicle);

    const [formData, setFormData] = useState<CreateVehiclePayload>({
        vin: "",
        model: "",
        dimensions: "",
        wheelbase: "",
        groundClearance: "",
        seatHeight: "",
        frontTire: "",
        rearTire: "",
        frontSuspension: "",
        rearSuspension: "",
        brakeSystem: "",
        trunkCapacity: "",
        weightWithoutBattery: 0,
        weightWithBattery: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes("weight") ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
        await dispatch(createVehicle(formData));
        // reset form
        setFormData({
            vin: "",
            model: "",
            dimensions: "",
            wheelbase: "",
            groundClearance: "",
            seatHeight: "",
            frontTire: "",
            rearTire: "",
            frontSuspension: "",
            rearSuspension: "",
            brakeSystem: "",
            trunkCapacity: "",
            weightWithoutBattery: 0,
            weightWithBattery: 0
        });
    };

    return (
        <FormCard>
            <Title variant="h5">Create Vehicle</Title>
            <FormRow>
                <TextField label="VIN" name="vin" value={formData.vin} onChange={handleChange} fullWidth />
                <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth />
                <TextField label="Dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} fullWidth />
                <TextField label="Wheelbase" name="wheelbase" value={formData.wheelbase} onChange={handleChange} fullWidth />
                <TextField label="Ground Clearance" name="groundClearance" value={formData.groundClearance} onChange={handleChange} fullWidth />
                <TextField label="Seat Height" name="seatHeight" value={formData.seatHeight} onChange={handleChange} fullWidth />
                <TextField label="Front Tire" name="frontTire" value={formData.frontTire} onChange={handleChange} fullWidth />
                <TextField label="Rear Tire" name="rearTire" value={formData.rearTire} onChange={handleChange} fullWidth />
                <TextField label="Front Suspension" name="frontSuspension" value={formData.frontSuspension} onChange={handleChange} fullWidth />
                <TextField label="Rear Suspension" name="rearSuspension" value={formData.rearSuspension} onChange={handleChange} fullWidth />
                <TextField label="Brake System" name="brakeSystem" value={formData.brakeSystem} onChange={handleChange} fullWidth />
                <TextField label="Trunk Capacity" name="trunkCapacity" value={formData.trunkCapacity} onChange={handleChange} fullWidth />
                <TextField label="Weight Without Battery" name="weightWithoutBattery" type="number" value={formData.weightWithoutBattery} onChange={handleChange} fullWidth />
                <TextField label="Weight With Battery" name="weightWithBattery" type="number" value={formData.weightWithBattery} onChange={handleChange} fullWidth />
            </FormRow>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Create"}
                </Button>
            </Box>
        </FormCard>
    );
};

export default VehicleCreateForm;
