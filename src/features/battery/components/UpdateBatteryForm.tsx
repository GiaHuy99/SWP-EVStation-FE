import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { updateBattery } from "../BatteryThunk";
import { Battery } from "../types/BatteryType";

// Import styled components
import {
    FormCard, // Wrap content với border pastel
    StyledTextField, // Cho inputs
    FormBox, // Grid layout
    FullWidthBox, // Cho actions
    Title, // Nếu cần cho title
} from "../styles/CreateBatteryForm"; // Import đúng path

interface UpdateBatteryFormProps {
    open: boolean;
    battery: Battery | null;
    onClose: () => void;
}

const UpdateBatteryForm: React.FC<UpdateBatteryFormProps> = ({ open, battery, onClose }) => {
    const dispatch = useAppDispatch();
    const { stations } = useAppSelector((state) => state.station);

    const [serialNumber, setSerialNumber] = useState("");
    const [status, setStatus] = useState<Battery["status"]>("AVAILABLE");
    const [swapCount, setSwapCount] = useState(0);
    const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

    const statusOptions: Battery["status"][] = [
        "AVAILABLE",
        "IN_USE",
        "DAMAGED",
        "MAINTENANCE",
    ];

    useEffect(() => {
        if (battery) {
            setSerialNumber(battery.serialNumber);
            setStatus(battery.status);
            setSwapCount(battery.swapCount);

            const exists = stations.some((s) => s.id === battery.stationId);
            setSelectedStationId(exists ? battery.stationId : null);
        }
    }, [battery, stations]);

    const handleUpdate = () => {
        if (!battery) return;

        const selectedStation = stations.find((s) => s.id === selectedStationId) || null;

        dispatch(
            updateBattery({
                id: battery.id,
                payload: {
                    serialNumber,
                    status,
                    swapCount,
                    stationId: selectedStation ? selectedStation.id : null,
                }
            })
        );

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Cập nhật Pin</DialogTitle>
            <DialogContent dividers>
                <FormCard sx={{ border: "1px solid #E8F5E8", p: 2 }}> {/* Wrap với viền xanh pastel và padding */}
                    <FormBox> {/* Grid responsive cho fields */}
                        <StyledTextField // Serial Number
                            label="Số Seri"
                            fullWidth
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            margin="normal"
                        />
                        <StyledTextField // Status select
                            select
                            label="Trạng thái"
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Battery["status"])}
                            margin="normal"
                        >
                            {statusOptions.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                        <StyledTextField // Swap Count
                            label="Số lần đổi"
                            fullWidth
                            type="number"
                            value={swapCount}
                            onChange={(e) => setSwapCount(Number(e.target.value))}
                            margin="normal"
                        />
                        <StyledTextField // Station select
                            select
                            label="Trạm"
                            fullWidth
                            value={selectedStationId ?? ""}
                            onChange={(e) => {
                                const value = String(e.target.value);
                                setSelectedStationId(value === "" ? null : Number(value));
                            }}
                            margin="normal"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {stations.map((station) => (
                                <MenuItem key={station.id} value={station.id}>
                                    {station.name}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                    </FormBox>
                </FormCard>
            </DialogContent>
            <DialogActions>
                <FullWidthBox> {/* Full width cho buttons */}
                    <Button onClick={onClose} sx={{ mr: 1 }}>Hủy</Button>
                    <Button variant="contained" color="success" onClick={handleUpdate}> {/* Màu xanh khớp theme */}
                        Cập nhật
                    </Button>
                </FullWidthBox>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBatteryForm;