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
import { styled } from "@mui/material/styles"; // Để styled TableRow

// Import styled từ file styles
import {
    PageContainer,
    ListCard, // Wrap table
    Title, // Nếu cần
} from "../styles/CreateStationForm";
import Paper from "@mui/material/Paper";

// Styled cho TableRow với hover xanh pastel đồng bộ
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8", // Xanh pastel
        transition: "background-color 0.3s ease-in-out",
        transform: "scale(1.01)", // Nâng nhẹ
    },
    "& td": {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
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
        <PageContainer> {/* Wrap với background #F9FAFB */}
            <ListCard sx={{ border: "1px solid #E8F5E8" }}> {/* Card với viền pastel */}
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>ID</TableCell> */}
                                <TableCell>Tên</TableCell>
                                <TableCell>Địa điểm</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Sức chứa</TableCell>
                                <TableCell>Điện thoại</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stations.map((station) => (
                                <StyledTableRow // Styled hover xanh
                                    key={station.id}
                                    onClick={() => setSelectedId(station.id)}
                                >
                                    {/* <TableCell>{station.id}</TableCell> */}
                                    <TableCell>{station.name}</TableCell>
                                    <TableCell>{station.location}</TableCell>
                                    <TableCell>{station.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</TableCell>
                                    <TableCell>{station.capacity}</TableCell>
                                    <TableCell>{station.phone}</TableCell>
                                    <TableCell
                                        align="center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Button
                                            variant="outlined"
                                            color="success" // Xanh lá khớp theme
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
                                </StyledTableRow>
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
                        Chi Tiết Trạm Sạc
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
                    <StyledDialogContent> {/* Styled content */}
                        {selectedId !== null ? (
                            <StationDetail id={selectedId} />
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                    </StyledDialogContent>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default StationList;