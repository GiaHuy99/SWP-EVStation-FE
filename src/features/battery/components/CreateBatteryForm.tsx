// src/components/CreateBatteryForm.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createBattery } from "../BatteryThunk";
import { fetchStations } from "../../station/StationThunks";
import { CreateBatteryPayload } from "../types/BatteryType";
import { Button, Card, CardContent, MenuItem, TextField, Typography } from "@mui/material";

const CreateBatteryForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { stations } = useAppSelector((state) => state.station);
    const [form, setForm] = useState<CreateBatteryPayload>({
        serialNumber: "",
        status: "AVAILABLE",
        swapCount: 0,
        stationId: 0,
    });

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createBattery(form));
    };

    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg rounded-2xl">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Create Battery
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Serial Number"
                        name="serialNumber"
                        value={form.serialNumber}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                        <MenuItem value="IN_USE">IN_USE</MenuItem>
                        <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                    </TextField>
                    <TextField
                        type="number"
                        label="Swap Count"
                        name="swapCount"
                        value={form.swapCount}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        select
                        label="Station"
                        name="stationId"
                        value={form.stationId}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        {stations.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                                {s.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateBatteryForm;
