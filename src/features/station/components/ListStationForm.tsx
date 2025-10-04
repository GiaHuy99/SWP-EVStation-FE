import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { deleteStation, fetchStations } from "../StationThunks";
import {
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

// Import DataGrid và types
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";

// Import styled từ file styles
import {
    PageContainer,
    ListCard, // Wrap grid
    Title, // Nếu cần
} from "../styles/CreateStationForm";

// Styled cho DialogContent
import { styled } from "@mui/material/styles";
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

    // Định nghĩa columns với GridColDef
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, sortable: true },
        { field: 'name', headerName: 'Tên', width: 150, sortable: true },
        { field: 'location', headerName: 'Địa điểm', width: 200, sortable: true },
        { field: 'status', headerName: 'Trạng thái', width: 120, sortable: true },
        { field: 'capacity', headerName: 'Sản lượng', width: 120, type: 'number', sortable: true },
        { field: 'phone', headerName: 'Điện thoại', width: 150, sortable: true },
        {
            field: 'actions',
            headerName: 'Hành động',
            type: 'actions',
            width: 200,
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
                    onClick={() => setEditingStation(params.row as Station)}
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
                    onClick={() => handleDelete(params.row.id)}
                    showInMenu={false}
                />,
            ],
        },
    ];

    // Function cho row class (tùy chọn zebra stripes)
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
    };

    return (
        <PageContainer> {/* Wrap với background #F9FAFB */}
            <ListCard sx={{ border: "1px solid #E8F5E8" }}> {/* Card với viền pastel */}
                <div style={{ height: 500, width: '100%' }}> {/* Height cho DataGrid */}
                    <DataGrid
                        rows={stations} // Toàn bộ list – tự chia pagination
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