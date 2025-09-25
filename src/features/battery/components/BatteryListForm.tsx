import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {deleteBattery, fetchBatteries} from "../BatteryThunk";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BatteryDetail from "./BatteryDetailForm";
import UpdateBatteryForm from "./UpdateBatteryForm"; // <- popup update
import { Battery } from "../types/BatteryType";
import {fetchStations} from "../../station/StationThunks";

const BatteryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { batteries, loading, error } = useAppSelector((state) => state.battery);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingBattery, setEditingBattery] = useState<Battery | null>(null);

    useEffect(() => {
        dispatch(fetchBatteries());
        dispatch(fetchStations());
    }, [dispatch]);

    if (loading && batteries.length === 0) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Swap Count</TableCell>
                            <TableCell>Station</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {batteries.map((battery: Battery) => (
                            <TableRow
                                key={battery.id}
                                hover
                                sx={{ cursor: "pointer" }}
                                onClick={() => setSelectedId(battery.id)}
                            >
                                <TableCell>{battery.id}</TableCell>
                                <TableCell>{battery.serialNumber}</TableCell>
                                <TableCell>{battery.status}</TableCell>
                                <TableCell>{battery.swapCount}</TableCell>
                                <TableCell>{battery.stationName}</TableCell>
                                <TableCell
                                    align="center"
                                    onClick={(e) => e.stopPropagation()} // chặn click row
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => setEditingBattery(battery)}
                                        sx={{ mr: 1 }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            if (window.confirm("Bạn có chắc muốn xóa battery này?")) {
                                                dispatch(deleteBattery(battery.id));
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Popup Update */}
            <UpdateBatteryForm
                open={Boolean(editingBattery)}
                battery={editingBattery}
                onClose={() => setEditingBattery(null)}
            />

            {/* Popup Detail */}
            <Dialog
                open={selectedId !== null}
                onClose={() => setSelectedId(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Battery Detail
                    <IconButton
                        aria-label="close"
                        onClick={() => setSelectedId(null)}
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
                <DialogContent dividers>
                    {selectedId !== null ? (
                        <BatteryDetail id={selectedId} />
                    ) : (
                        <div>Không có dữ liệu</div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BatteryList;
