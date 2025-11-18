// src/features/station/components/StationList.tsx
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
    DialogTitle,
    IconButton,
    Chip,
    Box,
    Typography,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdateStationForm from "./UpdateStationForm";
import StationDetail from "./StationDetailForm";
import { Station } from "../types/StationType";
import { styled } from "@mui/material/styles";
import {
    PageContainer,
    ListCard,
    TableWrapper,
    Title,
    EditButton,
    DeleteButton,
} from "../../../styles/AdminDashboardStyles";
import TablePagination from "../../../components/Pagination/TablePagination";

// Styled Row with hover
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        backgroundColor: "rgba(4, 196, 217, 0.04)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    "& td": {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

const StationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { stations, loading, error } = useAppSelector((state) => state.station);
    const [editingStation, setEditingStation] = useState<Station | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    const totalPages = Math.ceil(stations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStations = stations.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa trạm này?")) {
            dispatch(deleteStation(id));
        }
    };

    if (loading && stations.length === 0) {
        return (
            <PageContainer>
                <ListCard>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="50vh"
                        gap={2}
                    >
                        <CircularProgress size={48} thickness={4} />
                        <Typography variant="body2" color="text.secondary">
                            Đang tải danh sách...
                        </Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <ListCard>
                    <Alert severity="error" sx={{ m: 3 }}>
                        {error}
                    </Alert>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Title sx={{ px: 4, pt: 3 }}>Danh Sách Trạm Sạc</Title>

                <TableWrapper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Tên</strong></TableCell>
                                <TableCell><strong>Địa điểm</strong></TableCell>
                                <TableCell><strong>Trạng thái</strong></TableCell>
                                <TableCell><strong>Sức chứa</strong></TableCell>
                                <TableCell><strong>Điện thoại</strong></TableCell>
                                <TableCell align="center"><strong>Hành động</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedStations.map((station) => (
                                <StyledTableRow
                                    key={station.id}
                                    onClick={() => setSelectedId(station.id)}
                                >
                                    <TableCell>{station.name}</TableCell>
                                    <TableCell>{station.location}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={station.status === "ACTIVE" ? "Hoạt động" : "Ngừng"}
                                            color={station.status === "ACTIVE" ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{station.capacity}</TableCell>
                                    <TableCell>{station.phone}</TableCell>
                                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                        <EditButton onClick={() => setEditingStation(station)}>
                                            Sửa
                                        </EditButton>
                                        <DeleteButton onClick={() => handleDelete(station.id)}>
                                            Xóa
                                        </DeleteButton>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableWrapper>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={stations.length}
                    itemsPerPage={itemsPerPage}
                />

                {/* Update Dialog */}
                <UpdateStationForm
                    open={Boolean(editingStation)}
                    station={editingStation}
                    onClose={() => setEditingStation(null)}
                />

                {/* Detail Dialog */}
                <Dialog
                    open={selectedId !== null}
                    onClose={() => setSelectedId(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Chi Tiết Trạm
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
                    {selectedId && <StationDetail id={selectedId} />}
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default StationList;
