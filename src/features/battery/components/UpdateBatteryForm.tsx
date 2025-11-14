// src/features/batteryType/components/UpdateBatteryTypeForm.tsx
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
} from "@mui/material";
import { useAppDispatch } from "../../../app/Hooks";
import { updateBattery } from "../BatteryThunk"; // ĐÚNG
import { BatteryType } from "../types/BatteryType"; // ĐÚNG
import {
    StyledTextField,
    FormBox,
    FullWidthBox,
} from "../../../styles/AdminDashboardStyles";

interface UpdateBatteryTypeFormProps {
    open: boolean;
    batteryType: BatteryType | null;
    onClose: () => void;
}

const UpdateBatteryTypeForm: React.FC<UpdateBatteryTypeFormProps> = ({
                                                                         open,
                                                                         batteryType,
                                                                         onClose,
                                                                     }) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [designCapacity, setDesignCapacity] = useState(0);
    const [description, setDescription] = useState("");

    const typeOptions = ["Scooter", "Bike", "Motorcycle", "Car"];

    useEffect(() => {
        if (batteryType) {
            setName(batteryType.name);
            setType(batteryType.type);
            setDesignCapacity(batteryType.designCapacity);
            setDescription(batteryType.description || "");
        }
    }, [batteryType]);

    const handleUpdate = () => {
        if (!batteryType) return;

        dispatch(
            updateBattery({
                id: batteryType.id,
                payload: {
                    name,
                    type,
                    designCapacity,
                    description: description || undefined,
                },
            })
        )
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch(() => {
                // Notification xử lý ở thunk
            });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Cập nhật Loại Pin</DialogTitle>
            <DialogContent dividers>
                <FormBox>
                    {/* Tên Model */}
                    <StyledTextField
                        label="Tên Model"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />

                    {/* Loại Xe */}
                    <StyledTextField
                        select
                        label="Loại Xe"
                        fullWidth
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        margin="normal"
                        required
                    >
                        {typeOptions.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </StyledTextField>

                    {/* Dung Lượng */}
                    <StyledTextField
                        label="Dung Lượng Thiết Kế (Ah)"
                        fullWidth
                        type="number"
                        value={designCapacity}
                        onChange={(e) => setDesignCapacity(Number(e.target.value) || 0)}
                        margin="normal"
                        required
                        inputProps={{ min: 0.1, step: 0.1 }}
                    />

                    {/* Mô Tả */}
                    <StyledTextField
                        label="Mô Tả"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                        placeholder="Thông tin bổ sung..."
                    />
                </FormBox>
            </DialogContent>

            <DialogActions>
                <FullWidthBox sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdate}
                        sx={{
                            background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
                            boxShadow: "0 4px 14px rgba(76, 66, 140, 0.3)",
                            "&:hover": {
                                boxShadow: "0 8px 25px rgba(76, 66, 140, 0.4)",
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        Cập nhật
                    </Button>
                </FullWidthBox>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBatteryTypeForm;