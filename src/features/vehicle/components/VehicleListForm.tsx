import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, fetchVehicleById, updateVehicle, deleteVehicle } from "../VehicleThunks";
import {
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    DialogActions,
    TextField,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "../types/VehicleMockType";
import VehicleDetail from "./VehicleDetailForm";
import { styled } from "@mui/material/styles";
import {
    PageContainer,
    ListCard,
    TableWrapper,
} from "../styles/VehicleStyles";

// StyledTableRow hover effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8",
        transition: "background-color 0.3s ease-in-out",
        transform: "scale(1.01)",
    },
    "& td": { borderBottom: `1px solid ${theme.palette.divider}` },
}));

// Styled cho DialogContent
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    "& .MuiPaper-root": {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    },
}));

const VehicleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { vehicles, loading, error } = useAppSelector((state) => state.vehicle);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [editData, setEditData] = useState<any>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const navigate = useNavigate();
    
    const handleAdd = () => {
        navigate("/vehicle/create");
    };

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
            // Refresh the vehicles list after update
            dispatch(fetchVehicles());
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
        <PageContainer>
            <ListCard sx={{ border: "1px solid #E8F5E8" }}>
                {/* <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Vehicle List</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                    >
                        Create Vehicle
                    </Button>
                </Box> */}
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>VIN</TableCell>
                            <TableCell>Mẫu</TableCell>
                            <TableCell>Chiều dài cơ sở</TableCell>
                            <TableCell>Chiều cao yên</TableCell>
                            <TableCell>Trọng lượng</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((v) => (
                            typeof v.id === "number" ? (
                                <StyledTableRow 
                                    key={v.id}
                                    onClick={() => handleView(v.id!)}
                                >
                                    {/* <TableCell>{v.id}</TableCell> */}
                                    <TableCell>{v.vin}</TableCell>
                                    <TableCell>{v.model}</TableCell>
                                    <TableCell>{v.wheelbase}</TableCell>
                                    <TableCell>{v.seatHeight}</TableCell>
                                    <TableCell>{v.weightWithBattery} kg</TableCell>
                                    <TableCell
                                        align="center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            size="small"
                                            onClick={() => handleEdit(v.id!)}
                                            sx={{ mr: 1 }}
                                        >
                                            Cập nhật
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => { setDeleteId(v.id!); setConfirmDelete(true); }}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </StyledTableRow>
                            ) : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View Dialog */}
            <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Chi Tiết Xe
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenView(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <StyledDialogContent>
                    {selectedVehicle && (
                        <Box>
                            <Typography>ID: {selectedVehicle.id}</Typography>
                            <Typography>VIN: {selectedVehicle.vin}</Typography>
                            <Typography>Mẫu: {selectedVehicle.model}</Typography>
                            <Typography>Kích thước: {selectedVehicle.dimensions}</Typography>
                            <Typography>Chiều dài cơ sở: {selectedVehicle.wheelbase}</Typography>
                            <Typography>Khoảng sáng gầm: {selectedVehicle.groundClearance}</Typography>
                            <Typography>Chiều cao yên: {selectedVehicle.seatHeight}</Typography>
                            <Typography>Vỏ trước: {selectedVehicle.frontTire}</Typography>
                            <Typography>Vỏ sau: {selectedVehicle.rearTire}</Typography>
                            <Typography>Phuộc trước: {selectedVehicle.frontSuspension}</Typography>
                            <Typography>Phuộc sau: {selectedVehicle.rearSuspension}</Typography>
                            <Typography>Hệ thống phanh: {selectedVehicle.brakeSystem}</Typography>
                            <Typography>Thể tích cốp: {selectedVehicle.trunkCapacity}</Typography>
                            <Typography>Trọng lượng không có pin: {selectedVehicle.weightWithoutBattery} kg</Typography>
                            <Typography>Trọng lượng có pin: {selectedVehicle.weightWithBattery} kg</Typography>
                        </Box>
                    )}
                </StyledDialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Edit Vehicle
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenEdit(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <StyledDialogContent>
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
                </StyledDialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleUpdate}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>
                    Confirm Delete
                    <IconButton
                        aria-label="close"
                        onClick={() => setConfirmDelete(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <StyledDialogContent>
                    <Typography>Are you sure you want to delete this vehicle?</Typography>
                </StyledDialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default VehicleList;