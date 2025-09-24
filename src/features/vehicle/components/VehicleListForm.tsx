import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles } from "../VehicleThunks";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography
} from "@mui/material";

const VehicleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, loading, error } = useAppSelector((state) => state.vehicle);

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />;
    if (error) return <Typography color="error" align="center">{error}</Typography>;

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>VIN</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Wheelbase</TableCell>
                        <TableCell>Seat Height</TableCell>
                        <TableCell>Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((v) => (
                        <TableRow key={v.id} hover>
                            <TableCell>{v.id}</TableCell>
                            <TableCell>{v.vin}</TableCell>
                            <TableCell>{v.model}</TableCell>
                            <TableCell>{v.wheelbase}</TableCell>
                            <TableCell>{v.seatHeight}</TableCell>
                            <TableCell>{v.weightWithBattery} kg</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleList;