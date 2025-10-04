import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { deleteBattery, fetchBatteries } from "../BatteryThunk";
import {
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
import { fetchStations } from "../../station/StationThunks";

// Import DataGrid và types cần thiết
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";

// Import styled components từ file trước (giả sử path đúng)
import { PageContainer, FormCard, StyledTextField /* thêm nếu cần */ } from "../styles/CreateBatteryForm"; // Thay path thực tế

// Styled cho DialogContent với FormCard
import { styled } from "@mui/material/styles";
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

    // Định nghĩa columns với GridColDef
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, sortable: true },
        { field: 'serialNumber', headerName: 'Serial Number', width: 150, sortable: true },
        { field: 'status', headerName: 'Status', width: 120, sortable: true },
        { field: 'swapCount', headerName: 'Swap Count', width: 120, type: 'number', sortable: true },
        { field: 'stationName', headerName: 'Station', width: 150, sortable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            // SỬA LỖI: Dùng GridRowParams thay vì GridRenderCellParams
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key="update"
                    icon={
                        <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            sx={{
                                backgroundColor: "transparent",
                                borderColor: "#22C55E",
                                textTransform: "uppercase",
                                borderRadius: "8px",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "rgba(34, 197, 94, 0.05)",
                                    borderColor: "#16A34A",
                                    transform: "translateY(-1px)",
                                },
                            }}
                        >
                            UPDATE
                        </Button>
                    }
                    label="Update"
                    onClick={() => setEditingBattery(params.row as Battery)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                        >
                            Delete
                        </Button>
                    }
                    label="Delete"
                    onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xóa battery này?")) {
                            dispatch(deleteBattery(params.row.id));
                        }
                    }}
                    showInMenu={false}
                />,
            ],
        },
    ];

    // Function cho row class (adapt từ StyledTableRow)
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'; // Optional: zebra stripes
    };

    return (
        <PageContainer> {/* Wrap toàn bộ với PageContainer */}
            <FormCard> {/* Dùng FormCard cho container grid */}
                <div style={{ height: 500, width: '100%' }}> {/* Height cho DataGrid */}
                    <DataGrid
                        rows={batteries} // Toàn bộ list – tự chia pagination
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }, // Bắt đầu trang 1, 10 items/trang
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]} // User chọn size
                        onRowClick={(params) => setSelectedId(params.row.id)} // Click row mở detail
                        getRowClassName={getRowClassName} // Custom styles nếu cần
                        disableRowSelectionOnClick // Không select khi click row
                        sx={{
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: "#E8F5E8", // Xanh pastel khi hover
                                transition: "background-color 0.3s ease-in-out",
                                transform: "scale(1.01)",
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    />
                </div>

                {/* Popup Update - Giữ nguyên */}
                <UpdateBatteryForm
                    open={Boolean(editingBattery)}
                    battery={editingBattery}
                    onClose={() => setEditingBattery(null)}
                />

                {/* Popup Detail - Giữ nguyên với StyledDialogContent */}
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
                    <StyledDialogContent>
                        {selectedId !== null ? (
                            <FormCard>
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