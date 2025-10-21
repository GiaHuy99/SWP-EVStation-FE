import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";

// ✨ 1. Import các thành phần cần thiết cho BatteryType
import { updateBatteryType } from "../BatteryThunkType";
import { BatteryTypes, UpdateBatteryTypePayload } from "../types/BatteryTypes"; // Sửa lại tên file types nếu cần
import { showNotification } from "../../../shared/utils/notification/notificationSlice";

// ✨ 2. Import các styled components
import {
    StyledTextField,
    FormBox,
} from '../styles/CreateBatteryForm'; // <-- Thay đổi đường dẫn này cho đúng

// --- Định nghĩa Props ---
interface UpdateBatteryTypeFormProps {
    open: boolean;
    batteryType: BatteryTypes | null; // <-- Prop nhận vào là BatteryType
    onClose: () => void;
}

// --- Component chính ---
const UpdateBatteryTypeForm: React.FC<UpdateBatteryTypeFormProps> = ({ open, batteryType, onClose }) => {
    const dispatch = useAppDispatch();

    // ✨ 3. State của form được cập nhật để khớp với BatteryType
    const [formState, setFormState] = useState<Omit<UpdateBatteryTypePayload, 'id'>>({
        name: "",
        type: "",
        designCapacity: 0,
        description: "",
    });

    // ✨ 4. useEffect để điền dữ liệu vào form khi prop `batteryType` thay đổi
    useEffect(() => {
        if (batteryType) {
            setFormState({
                name: batteryType.name,
                type: batteryType.type,
                designCapacity: batteryType.designCapacity,
                description: batteryType.description,
            });
        }
    }, [batteryType]);

    // Hàm xử lý khi input thay đổi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    // ✨ 5. Hàm xử lý khi nhấn nút "Update"
    const handleUpdate = () => {
        if (!batteryType) return;

        const payload: UpdateBatteryTypePayload = {
            id: batteryType.id,
            ...formState,
        };

        dispatch(updateBatteryType(payload))
            .unwrap()
            .then(() => {
                dispatch(showNotification({ message: 'Battery type updated successfully!', type: 'success' }));
                onClose(); // Đóng dialog sau khi thành công
            })
            .catch((error) => {
                dispatch(showNotification({ message: error || 'Failed to update battery type.', type: 'error' }));
            });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>Update Battery Type</DialogTitle>
            <DialogContent dividers>
                {/* ✨ 6. Các trường input đã được cập nhật */}
                <FormBox sx={{ pt: 1 }}> {/* pt: 1 để có khoảng cách với DialogTitle */}
                    <StyledTextField
                        label="Model Name"
                        name="name"
                        fullWidth
                        value={formState.name}
                        onChange={handleChange}
                        required
                    />
                    <StyledTextField
                        label="Vehicle Type"
                        name="type"
                        fullWidth
                        value={formState.type}
                        onChange={handleChange}
                        required
                    />
                    <StyledTextField
                        label="Design Capacity (Ah)"
                        name="designCapacity"
                        fullWidth
                        type="number"
                        value={formState.designCapacity}
                        onChange={handleChange}
                        required
                        inputProps={{ step: "0.1", min: "0" }}
                    />
                    <StyledTextField
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={4}
                        value={formState.description}
                        onChange={handleChange}
                    />
                </FormBox>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="success" onClick={handleUpdate}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBatteryTypeForm;