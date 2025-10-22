// src/components/UpdateStationForm.tsx
import React, { useState, useEffect } from "react"; // Fix useEffect
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
} from "@mui/material";
import { Station } from "../types/StationType";
import { useAppDispatch } from "../../../app/Hooks";
import { updateStationThunk } from "../StationThunks";

// Import styled
import {
    FormCard, // Wrap content
    StyledTextField, // Cho inputs
    FormBox, // Grid
    FullWidthBox, // Actions
} from "../styles/CreateStationForm";

interface Props {
    open: boolean;
    station: Station | null;
    onClose: () => void;
}

const UpdateStationForm: React.FC<Props> = ({ open, station, onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Station | null>(station);

    useEffect(() => { // Fix: useEffect thay React.useEffect
        setFormData(station);
    }, [station]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData) return;
        const { id, ...payload } = formData;
        dispatch(updateStationThunk({ id, payload }));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Cập nhật Station</DialogTitle>
            <DialogContent dividers>
                <FormCard sx={{ border: "1px solid #E8F5E8", p: 2 }}> {/* Wrap với viền pastel + padding */}
                    <FormBox> {/* Grid responsive */}
                        <StyledTextField // Tên
                            label="Tên"
                            name="name"
                            value={formData?.name || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                        <StyledTextField // Địa điểm cạnh tên
                            label="Địa điểm"
                            name="location"
                            value={formData?.location || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                        <StyledTextField // Trạng thái select
                            select
                            label="Trạng thái"
                            name="status"
                            value={formData?.status || "ACTIVE"}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                        </StyledTextField>
                        <StyledTextField // Sức chứa cạnh trạng thái
                            label="Sức chứa"
                            name="capacity"
                            type="number"
                            value={formData?.capacity || ""}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FullWidthBox> {/* Số điện thoại full */}
                            <StyledTextField
                                label="Số điện thoại"
                                name="phone"
                                value={formData?.phone || ""}
                                onChange={handleChange}
                                fullWidth
                            />
                        </FullWidthBox>
                    </FormBox>
                </FormCard>
            </DialogContent>
            <DialogActions>
                <FullWidthBox> {/* Actions full width */}
                    <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="success"> {/* Xanh lá */}
                        Lưu
                    </Button>
                </FullWidthBox>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateStationForm;