import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { updateBattery } from "../BatteryThunk";
import { Battery } from "../types/BatteryType";

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
    const [selectedStationId, setSelectedStationId] = useState<number | null>(null); // ✅ cho phép null

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
            setSelectedStationId(exists ? battery.stationId : null); // ✅ nếu không tồn tại thì null
        }
    }, [battery, stations]);

    const handleUpdate = () => {
        if (!battery) return;

        const selectedStation = stations.find((s) => s.id === selectedStationId) || null;

        dispatch(
            updateBattery({
                id: battery.id,
                serialNumber,
                status,
                swapCount,
                stationId: selectedStation ? selectedStation.id : null,   // ✅ null nếu không chọn
                stationName: selectedStation ? selectedStation.name : null, // ✅ null nếu không chọn
            })
        );

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Battery</DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Serial Number"
                    fullWidth
                    margin="normal"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Battery["status"])}
                        label="Status"
                    >
                        {statusOptions.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Swap Count"
                    fullWidth
                    type="number"
                    margin="normal"
                    value={swapCount}
                    onChange={(e) => setSwapCount(Number(e.target.value))}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Station</InputLabel>
                    <Select
                        value={selectedStationId ?? ""} // ✅ null → ""
                        onChange={(e) => {
                            const value = String(e.target.value);
                            setSelectedStationId(value === "" ? null : Number(value));
                        }}
                        label="Station"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {stations.map((station) => (
                            <MenuItem key={station.id} value={station.id}>
                                {station.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBatteryForm;
