import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchVehicleById, updateVehicle, deleteVehicle } from "../VehicleThunks";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box
} from "@mui/material";

const VehicleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, loading, error } = useAppSelector((state) => state.vehicle);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [editData, setEditData] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    const handleView = async (id: number) => {
        await dispatch(fetchVehicleById(id));
        const vehicle = vehicles.find(v => v.id === id);
        setSelectedVehicle(vehicle);
        setOpenView(true);
    };

    const handleEdit = async (id: number) => {
        await dispatch(fetchVehicleById(id));
        const vehicle = vehicles.find(v => v.id === id);
        setEditData(vehicle ? { ...vehicle } : null);
        setOpenEdit(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prev: any) => ({
            ...prev,
            [name]: name.includes("weight") ? Number(value) : value
        }));
    };

    const handleUpdate = async () => {
        if (editData && editData.id) {
            await dispatch(updateVehicle({ id: editData.id, payload: editData }));
            setOpenEdit(false);
        }
    };

    const handleDelete = async () => {
        if (deleteId !== null) {
            await dispatch(deleteVehicle(deleteId));
            setConfirmDelete(false);
            setDeleteId(null);
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />;
    if (error) return <Typography color="error" align="center">{error}</Typography>;

    return (
        <>
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((v) => (
                            typeof v.id === "number" ? (
                                <TableRow key={v.id} hover>
                                    <TableCell>{v.id}</TableCell>
                                    <TableCell>{v.vin}</TableCell>
                                    <TableCell>{v.model}</TableCell>
                                    <TableCell>{v.wheelbase}</TableCell>
                                    <TableCell>{v.seatHeight}</TableCell>
                                    <TableCell>{v.weightWithBattery} kg</TableCell>
                                    <TableCell>
                                        <Button size="small" onClick={() => handleView(v.id!)}>View</Button>
                                        <Button size="small" color="warning" onClick={() => handleEdit(v.id!)}>Edit</Button>
                                        <Button size="small" color="error" onClick={() => { setDeleteId(v.id!); setConfirmDelete(true); }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ) : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View Dialog */}
            <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Vehicle Details</DialogTitle>
                <DialogContent>
                    {selectedVehicle && (
                        <Box>
                            <Typography>ID: {selectedVehicle.id}</Typography>
                            <Typography>VIN: {selectedVehicle.vin}</Typography>
                            <Typography>Model: {selectedVehicle.model}</Typography>
                            <Typography>Dimensions: {selectedVehicle.dimensions}</Typography>
                            <Typography>Wheelbase: {selectedVehicle.wheelbase}</Typography>
                            <Typography>Ground Clearance: {selectedVehicle.groundClearance}</Typography>
                            <Typography>Seat Height: {selectedVehicle.seatHeight}</Typography>
                            <Typography>Front Tire: {selectedVehicle.frontTire}</Typography>
                            <Typography>Rear Tire: {selectedVehicle.rearTire}</Typography>
                            <Typography>Front Suspension: {selectedVehicle.frontSuspension}</Typography>
                            <Typography>Rear Suspension: {selectedVehicle.rearSuspension}</Typography>
                            <Typography>Brake System: {selectedVehicle.brakeSystem}</Typography>
                            <Typography>Trunk Capacity: {selectedVehicle.trunkCapacity}</Typography>
                            <Typography>Weight Without Battery: {selectedVehicle.weightWithoutBattery} kg</Typography>
                            <Typography>Weight With Battery: {selectedVehicle.weightWithBattery} kg</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenView(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Vehicle</DialogTitle>
                <DialogContent>
                    {editData && (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField label="VIN" name="vin" value={editData.vin} onChange={handleEditChange} fullWidth />
                            <TextField label="Model" name="model" value={editData.model} onChange={handleEditChange} fullWidth />
                            <TextField label="Dimensions" name="dimensions" value={editData.dimensions} onChange={handleEditChange} fullWidth />
                            <TextField label="Wheelbase" name="wheelbase" value={editData.wheelbase} onChange={handleEditChange} fullWidth />
                            <TextField label="Ground Clearance" name="groundClearance" value={editData.groundClearance} onChange={handleEditChange} fullWidth />
                            <TextField label="Seat Height" name="seatHeight" value={editData.seatHeight} onChange={handleEditChange} fullWidth />
                            <TextField label="Front Tire" name="frontTire" value={editData.frontTire} onChange={handleEditChange} fullWidth />
                            <TextField label="Rear Tire" name="rearTire" value={editData.rearTire} onChange={handleEditChange} fullWidth />
                            <TextField label="Front Suspension" name="frontSuspension" value={editData.frontSuspension} onChange={handleEditChange} fullWidth />
                            <TextField label="Rear Suspension" name="rearSuspension" value={editData.rearSuspension} onChange={handleEditChange} fullWidth />
                            <TextField label="Brake System" name="brakeSystem" value={editData.brakeSystem} onChange={handleEditChange} fullWidth />
                            <TextField label="Trunk Capacity" name="trunkCapacity" value={editData.trunkCapacity} onChange={handleEditChange} fullWidth />
                            <TextField label="Weight Without Battery" name="weightWithoutBattery" type="number" value={editData.weightWithoutBattery} onChange={handleEditChange} fullWidth />
                            <TextField label="Weight With Battery" name="weightWithBattery" type="number" value={editData.weightWithBattery} onChange={handleEditChange} fullWidth />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this vehicle?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VehicleList;