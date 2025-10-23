import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/Hooks";
import {deleteBattery, fetchBatteries} from "../../BatteryThunk";
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
    Box,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BatteryDetail from "../BatteryDetailForm";
import UpdateBatteryForm from "../UpdateBatteryForm";
import { Battery } from "../../types/BatteryType";
import {fetchStations} from "../../../station/StationThunks";
import { PageContainer, FormCard } from "../../styles/CreateBatteryForm";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Banner from "./Banner";
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Banner />
            <PageContainer 
                sx={{ 
                    position: 'relative', 
                    zIndex: 1,
                    pt: 0,
                    mt: '25px', 
                    backgroundColor: 'transparent'
                }}
            >
                <FormCard>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: '#1a3681', // Màu xanh đậm sang trọng
                            textAlign: 'center',
                            pt: 2
                        }}
                    >
                        Danh sách Pin
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell>Số Seri</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Số lần đổi</TableCell>
                                    <TableCell>Trạm</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {batteries.map((battery: Battery) => (
                                    <StyledTableRow // Dùng styled row
                                        key={battery.id}
                                        onClick={() => setSelectedId(battery.id)}
                                    >
                                        {/* <TableCell>{battery.id}</TableCell> */}
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
                                                CẬP NHẬT
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
                                                Xóa
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
                            {/* Chi Tiết Pin */}
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
        </div>
    );
};

export default BatteryList;