import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { deleteStation, fetchStations } from "../StationThunks";
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
import UpdateStationForm from "./UpdateStationForm";
import StationDetail from "./StationDetailForm";
import { Station } from "../types/StationType";

const StationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { stations, loading, error } = useAppSelector((state) => state.station);

    const [editingStation, setEditingStation] = useState<Station | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa station này?")) {
            dispatch(deleteStation(id));
        }
    };

    if (loading && stations.length === 0) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Sản lượng</TableCell>
                            <TableCell>Điện thoại</TableCell>
                            <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stations.map((station) => (
                            <TableRow
                                key={station.id}
                                hover
                                sx={{ cursor: "pointer" }}
                                onClick={() => setSelectedId(station.id)}
                            >
                                <TableCell>{station.id}</TableCell>
                                <TableCell>{station.name}</TableCell>
                                <TableCell>{station.location}</TableCell>
                                <TableCell>{station.status}</TableCell>
                                <TableCell>{station.capacity}</TableCell>
                                <TableCell>{station.phone}</TableCell>
                                <TableCell
                                    align="center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => setEditingStation(station)}
                                        sx={{ mr: 1 }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(station.id)}
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
            <UpdateStationForm
                open={Boolean(editingStation)}
                station={editingStation}
                onClose={() => setEditingStation(null)}
            />

            {/* Popup Detail */}
            <Dialog
                open={selectedId !== null}
                onClose={() => setSelectedId(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                   Detail Station
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
                        <StationDetail id={selectedId} />
                    ) : (
                        <div>Không có dữ liệu</div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StationList;