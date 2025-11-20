// src/features/vehicle/components/VehicleListForm.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicles, deleteVehicle } from "../VehicleThunks";
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box,
    CircularProgress, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import VehicleDetailForm from "./VehicleDetailForm";
import VehicleUpdateForm from "./VehicleUpdateForm";
import { Vehicle } from "../types/VehicleType";
import {
    PageContainer, ListCard, TableWrapper, Title,
    EditButton,
    DeleteButton,
} from "../../../styles/AdminDashboardStyles";
import Paper from "@mui/material/Paper";
import TablePagination from "../../../components/Pagination/TablePagination";

const VehicleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { vehicles, loading, error } = useAppSelector(state => state.vehicle);

    const [viewId, setViewId] = useState<number | null>(null);
    const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    const totalPages = Math.ceil(vehicles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = vehicles.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = () => {
        if (deleteId) {
            dispatch(deleteVehicle(deleteId));
            setDeleteId(null);
        }
    };

    return (
        <PageContainer>
            <ListCard>
                <Title sx={{ px: 4, pt: 3 }}>Danh Sách Mẫu Xe</Title>

                <Box sx={{ p: 4 }}>
                    {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
                    {error && <Typography color="error" align="center">{error}</Typography>}

                    {!loading && !error && vehicles.length > 0 && (
                        <>
                            <TableWrapper>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Tên xe</strong></TableCell>
                                                <TableCell><strong>Hãng</strong></TableCell>
                                                <TableCell><strong>Chiều dài cơ sở</strong></TableCell>
                                                <TableCell><strong>Chiều cao yên</strong></TableCell>
                                                <TableCell><strong>Trọng lượng (pin)</strong></TableCell>
                                                <TableCell align="center"><strong>Thao tác</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedVehicles.map(v => (
                                                <TableRow
                                                    key={v.id}
                                                    onClick={() => setViewId(v.id)}
                                                    sx={{
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(4, 196, 217, 0.04)",
                                                            transform: "translateY(-1px)",
                                                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                                        },
                                                        "& td": {
                                                            borderBottom: "1px solid #e2e8f0",
                                                        },
                                                    }}
                                                >
                                                    <TableCell>{v.name}</TableCell>
                                                    <TableCell>{v.brand}</TableCell>
                                                    <TableCell>{v.wheelbase}</TableCell>
                                                    <TableCell>{v.seatHeight}</TableCell>
                                                    <TableCell>{v.weightWithBattery} kg</TableCell>
                                                    <TableCell align="center" onClick={e => e.stopPropagation()}>
                                                        <EditButton
                                                            size="small"
                                                            onClick={() => setEditVehicle(v)}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Sửa
                                                        </EditButton>
                                                        <DeleteButton
                                                            size="small"
                                                            onClick={() => setDeleteId(v.id)}
                                                        >
                                                            Xóa
                                                        </DeleteButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TableWrapper>

                            <TablePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                totalItems={vehicles.length}
                                itemsPerPage={itemsPerPage}
                            />
                        </>
                    )}
                </Box>

                {/* === CHI TIẾT DIALOG === */}
                <Dialog open={!!viewId} onClose={() => setViewId(null)} fullWidth maxWidth="md">
                    <DialogTitle>
                        Chi Tiết Mẫu Xe
                        <IconButton onClick={() => setViewId(null)} sx={{ position: "absolute", right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        {viewId && <VehicleDetailForm id={viewId} />}
                    </DialogContent>
                </Dialog>

                {/* === CẬP NHẬT DIALOG === */}
                {editVehicle && (
                    <VehicleUpdateForm
                        open={true}
                        onClose={() => setEditVehicle(null)}
                        vehicle={editVehicle}
                    />
                )}

                {/* === XÓA XÁC NHẬN === */}
                <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                    <DialogTitle>
                        Xác nhận xóa?
                        <IconButton onClick={() => setDeleteId(null)} sx={{ position: "absolute", right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>Bạn có chắc chắn muốn xóa mẫu xe này?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteId(null)}>Hủy</Button>
                        <Button color="error" onClick={handleDelete}>Xóa</Button>
                    </DialogActions>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default VehicleList;
