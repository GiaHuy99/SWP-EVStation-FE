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

// Import styled components từ file trước (giả sử path đúng)
import { PageContainer, FormCard, StyledTextField /* thêm nếu cần */ } from "../styles/CreateBatteryForm"; // Thay path thực tế

// Styled cho TableRow với theme xanh pastel
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8", // Xanh pastel giống StyledTextField
        transition: "background-color 0.3s ease-in-out",
        transform: "scale(1.01)", // Nâng nhẹ khi hover
    },
    "& td": {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

// Styled cho DialogContent với FormCard
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    "& .MuiPaper-root": { // Nếu dùng FormCard bên trong
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    },
}));

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
        <PageContainer> {/* Wrap toàn bộ với PageContainer */}
            <FormCard> {/* Dùng FormCard cho container table */}
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
                                <StyledTableRow // Dùng styled row
                                    key={battery.id}
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
                                            color="success" // Xanh lá khớp theme
                                            size="small"
                                            onClick={() => setEditingBattery(battery)}
                                            sx={{
                                                mr: 1,
                                                backgroundColor: "transparent", // Nền trắng như hình
                                                borderColor: "#22C55E", // Viền xanh lá đậm nhạt
                                                textTransform: "uppercase", // In hoa "UPDATE"
                                                borderRadius: "8px", // Bo tròn mỏng
                                                transition: "all 0.3s ease-in-out", // Mượt mà
                                                "&:hover": {
                                                    backgroundColor: "rgba(34, 197, 94, 0.05)", // Nền nhạt nhẹ khi hover
                                                    borderColor: "#16A34A", // Viền sáng hơn (success.dark)
                                                    transform: "translateY(-1px)", // Nâng nhẹ
                                                },
                                            }}
                                        >
                                            UPDATE
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
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Popup Update - Giả sử đã dùng StyledTextField bên trong */}
                <UpdateBatteryForm
                    open={Boolean(editingBattery)}
                    battery={editingBattery}
                    onClose={() => setEditingBattery(null)}
                />

                {/* Popup Detail - Wrap nội dung với StyledDialogContent */}
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
                    <StyledDialogContent> {/* Styled cho content */}
                        {selectedId !== null ? (
                            <FormCard> {/* Wrap detail với FormCard */}
                                <BatteryDetail id={selectedId} />
                            </FormCard>
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                    </StyledDialogContent>
                </Dialog>
            </FormCard>
        </PageContainer>
    );
};

export default BatteryList;