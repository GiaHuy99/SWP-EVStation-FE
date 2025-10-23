import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    IconButton,
    Typography,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Vehicle } from '../types/VehicleMockType';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { updateVehicle } from '../VehicleThunks';
import { styled } from '@mui/material/styles';

interface Props {
    open: boolean;
    onClose: () => void;
    vehicle: Vehicle;
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(2)
    }
}));

const VehicleUpdateForm: React.FC<Props> = ({ open, onClose, vehicle }) => {
    const [formData, setFormData] = React.useState<Vehicle>(vehicle);
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.vehicle);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['year', 'wheelbase', 'seatHeight', 'weightWithBattery', 'batteryPercentage', 'mileage'].includes(name)
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async () => {
        await dispatch(updateVehicle({ id: vehicle.id, payload: formData }));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Update Vehicle</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <StyledDialogContent>
                <TextField label="VIN" name="vin" value={formData.vin} onChange={handleChange} fullWidth />
                <TextField label="Giấy Đăng Ký" name="licensePlate" value={formData.licensePlate} onChange={handleChange} fullWidth />
                <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth />
                <TextField label="Nhà Sản Xuất" name="manufacturer" value={formData.manufacturer} onChange={handleChange} fullWidth />
                <TextField label="Màu" name="color" value={formData.color} onChange={handleChange} fullWidth />
                <TextField label="Năm" name="year" type="number" value={formData.year} onChange={handleChange} fullWidth />
                <TextField label="Chiều Dài (mm)" name="wheelbase" type="number" value={formData.wheelbase} onChange={handleChange} fullWidth />
                <TextField label="Chiều Cao Ghế (mm)" name="seatHeight" type="number" value={formData.seatHeight} onChange={handleChange} fullWidth />
                <TextField label="Trọng Lượng Cả Pin (kg)" name="weightWithBattery" type="number" value={formData.weightWithBattery} onChange={handleChange} fullWidth />
                <TextField
                    label="Tỷ Lệ Pin"
                    name="batteryPercentage"
                    type="number"
                    value={formData.batteryPercentage} 
                    onChange={handleChange} 
                    fullWidth
                    inputProps={{ min: 0, max: 100 }}
                />
                <TextField label="Quá Trình (km)" name="mileage" type="number" value={formData.mileage} onChange={handleChange} fullWidth />

                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>Hủy</Button>
                    <Button
                        variant="contained"
                        color="primary" 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Cập Nhật"}
                    </Button>
                </Box>
            </StyledDialogContent>
        </Dialog>
    );
};

export default VehicleUpdateForm;