import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { createStation } from "../StationThunks";
import { useNavigate } from "react-router-dom";
import {
    MenuItem,
    Button,

} from "@mui/material";
import {FormBox, FullWidthBox, StyledTextField} from "../styles/CreateStationForm";
import {CreateStationPayload} from "../types/StationType";
import {showNotification} from "../../../shared/utils/notification/notificationSlice";

const CreateStationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.station);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        location: "",
        status: "ACTIVE",
        capacity: 0,
        phone: "",
    });



        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            dispatch(createStation({...form, capacity: Number(form.capacity)} as CreateStationPayload)).unwrap()
                .then(() => {
                    dispatch(showNotification({ message: "Battery created successfully!", type: "success" }));
                    navigate("/stations/list"); // chuyển về list
                })
                .catch(() => {
                    dispatch(showNotification({ message: "Failed to create battery.", type: "error" }));
                });
        };

    return (
        <form onSubmit={handleSubmit}>
            <FormBox>
                <FullWidthBox>
                    <StyledTextField
                        label="Station Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </FullWidthBox>

                <FullWidthBox>
                    <StyledTextField
                        label="Location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </FullWidthBox>

                <StyledTextField
                    select
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                </StyledTextField>

                <StyledTextField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    value={form.capacity}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <FullWidthBox>
                    <StyledTextField
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </FullWidthBox>

                <FullWidthBox>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create Station
                    </Button>
                </FullWidthBox>
            </FormBox>
        </form>
    );
    };

export default CreateStationForm;
