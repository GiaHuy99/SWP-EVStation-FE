// src/components/UpdateStationForm.tsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { Station } from "../types/StationType";
import { useAppDispatch } from "../../../app/Hooks";
import { updateStationThunk } from "../StationThunks";

interface Props {
    open: boolean;
    station: Station | null;
    onClose: () => void;
}

const UpdateStationForm: React.FC<Props> = ({ open, station, onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Station | null>(station);

    React.useEffect(() => {
        setFormData(station);
    }, [station]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData) return;
        dispatch(updateStationThunk(formData));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Cập nhật Station</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Tên"
                    name="name"
                    value={formData?.name || ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Địa điểm"
                    name="location"
                    value={formData?.location || ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Trạng thái"
                    name="status"
                    select
                    value={formData?.status || "ACTIVE"}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                </TextField>
                <TextField
                    label="Sức chứa"
                    name="capacity"
                    type="number"
                    value={formData?.capacity || ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Số điện thoại"
                    name="phone"
                    value={formData?.phone || ""}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateStationForm;
