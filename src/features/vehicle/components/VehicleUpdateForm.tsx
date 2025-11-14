// src/features/vehicle/components/VehicleUpdateForm.tsx
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { updateVehicle } from "../VehicleThunks";
import { Vehicle, UpdateVehiclePayload } from "../types/VehicleType";
import { FormBox, FullWidthBox, StyledTextField } from "../styles/VehicleFormStyles";

interface Props {
    open: boolean;
    onClose: () => void;
    vehicle: Vehicle;
}

const VehicleUpdateForm: React.FC<Props> = ({ open, onClose, vehicle }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.vehicle);
    const [form, setForm] = useState<UpdateVehiclePayload>(vehicle);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: ["weightWithoutBattery", "weightWithBattery"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = () => {
        dispatch(updateVehicle({ id: vehicle.id, payload: form })).then(() => {
            onClose();
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                Cập Nhật Mẫu Xe
                <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <FormBox>
                    <StyledTextField label="Tên xe" name="name" value={form.name} onChange={handleChange} />
                    <StyledTextField label="Hãng" name="brand" value={form.brand} onChange={handleChange} />
                    <StyledTextField label="Chiều dài cơ sở" name="wheelbase" value={form.wheelbase} onChange={handleChange} />
                    <StyledTextField label="Khoảng sáng gầm" name="groundClearance" value={form.groundClearance} onChange={handleChange} />
                    <StyledTextField label="Chiều cao yên" name="seatHeight" value={form.seatHeight} onChange={handleChange} />
                    <StyledTextField label="Lốp trước" name="frontTire" value={form.frontTire} onChange={handleChange} />
                    <StyledTextField label="Lốp sau" name="rearTire" value={form.rearTire} onChange={handleChange} />
                    <StyledTextField label="Phuộc trước" name="frontSuspension" value={form.frontSuspension} onChange={handleChange} />
                    <StyledTextField label="Phuộc sau" name="rearSuspension" value={form.rearSuspension} onChange={handleChange} />
                    <StyledTextField label="Hệ thống phanh" name="brakeSystem" value={form.brakeSystem} onChange={handleChange} />
                    <StyledTextField label="Dung tích cốp" name="trunkCapacity" value={form.trunkCapacity} onChange={handleChange} />
                    <StyledTextField label="Trọng lượng (không pin)" name="weightWithoutBattery" type="number" value={form.weightWithoutBattery} onChange={handleChange} />
                    <StyledTextField label="Trọng lượng (có pin)" name="weightWithBattery" type="number" value={form.weightWithBattery} onChange={handleChange} />
                </FormBox>
            </DialogContent>
            <DialogActions>
                <FullWidthBox sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                            "&:hover": { transform: "translateY(-2px)" },
                        }}
                    >
                        {loading ? <CircularProgress size={20} /> : "Cập nhật"}
                    </Button>
                </FullWidthBox>
            </DialogActions>
        </Dialog>
    );
};

export default VehicleUpdateForm;