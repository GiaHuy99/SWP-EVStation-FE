import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { useNavigate } from 'react-router-dom';

// ✨ 1. Imports cho Dialog và các component của MUI
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Button,
    CircularProgress,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams, GridRenderCellParams } from '@mui/x-data-grid';

// ✨ 2. Import các component con, actions, và types từ feature `Battery`
// import UpdateBatteryForm from './UpdateBatteryForm'; // <-- Component popup update
import BatteryDetail from './BatteryDetail';       // <-- Component popup chi tiết
import { fetchBatteries, deleteBattery } from '../BatteryThunk';
import { BatteryListItem } from '../types/Battery';
import { showNotification } from '../../../shared/utils/notification/notificationSlice';

// ✨ 3. Import các styled components và icons
import { HeaderBox, ListContainer, StatusChip } from '../styles/batteryStyles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// --- Component chính ---

const BatteryList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Lấy state từ slice `battery`
    const { batteries, loading, error } = useAppSelector((state) => state.battery);

    // State để quản lý popup update và detail
    const [editingBattery, setEditingBattery] = useState<BatteryListItem | null>(null);
    const [detailId, setDetailId] = useState<number | null>(null);

    // Fetch dữ liệu khi component được mount
    useEffect(() => {
        dispatch(fetchBatteries());
    }, [dispatch]);

    // ✨ 4. Định nghĩa các cột cho DataGrid của Battery
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'serialNumber', headerName: 'Serial Number', flex: 1, minWidth: 180 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            // Dùng renderCell để hiển thị StatusChip với màu sắc tương ứng
            renderCell: (params: GridRenderCellParams) => (
                <StatusChip status={params.value} label={params.value} />
            )
        },
        { field: 'stationName', headerName: 'Station', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 120,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key="update"
                    icon={<EditIcon />}
                    label="Update"
                    onClick={() => setEditingBattery(params.row as BatteryListItem)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this battery?")) {
                            dispatch(deleteBattery(params.row.id as number))
                                .unwrap()
                                .then(() => {
                                    dispatch(showNotification({ message: 'Deleted successfully!', type: 'success' }));
                                })
                                .catch((err) => {
                                    dispatch(showNotification({ message: err, type: 'error' }));
                                });
                        }
                    }}
                    showInMenu={false}
                />,
            ],
        },
    ];

    if (loading && batteries.length === 0) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ p: 4 }}>Error: {error}</Box>;
    }

    return (
        // ✨ 5. Sử dụng các styled components đã tạo
        <ListContainer>
            <HeaderBox>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Battery Management
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/batteries/create')}
                >
                    Create New
                </Button>
            </HeaderBox>

            <Box sx={{ height: 'calc(100vh - 220px)', width: '100%' }}>
                <DataGrid
                    rows={batteries}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    // Mở popup chi tiết khi click vào một hàng
                    onRowClick={(params) => setDetailId(params.row.id)}
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                        },
                    }}
                />
            </Box>

            {/* Popup Update Form */}
            {/*<UpdateBatteryForm*/}
            {/*    open={Boolean(editingBattery)}*/}
            {/*    battery={editingBattery}*/}
            {/*    onClose={() => setEditingBattery(null)}*/}
            {/*/>*/}

            {/* Popup Detail */}
            <Dialog open={detailId !== null} onClose={() => setDetailId(null)} fullWidth maxWidth="sm">
                <DialogTitle>
                    Battery Detail
                    <IconButton
                        aria-label="close"
                        onClick={() => setDetailId(null)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {detailId !== null && <BatteryDetail id={detailId} />}
                </DialogContent>
            </Dialog>
        </ListContainer>
    );
};

export default BatteryList;