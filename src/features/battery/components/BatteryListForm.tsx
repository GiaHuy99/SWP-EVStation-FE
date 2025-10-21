import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { useNavigate } from 'react-router-dom';

// ✨ 1. Imports cho Dialog và các component cần thiết
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

// Component con cho popup
import UpdateBatteryTypeForm from './UpdateBatteryForm'; // <-- Đổi tên file cho đúng
import BatteryTypeDetail from './BatteryTypeDetail'; // <-- Import component chi tiết

// Actions và Types
import { fetchBatteryTypes, deleteBatteryType } from '../BatteryThunk'; // <-- Đổi tên file cho đúng
import { BatteryTypes } from '../types/BatteryTypes'; // <-- Đổi tên file cho đúng
import { showNotification } from '../../../shared/utils/notification/notificationSlice';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// --- Component chính ---

const BatteryTypeList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { batteryTypes, loading, error } = useAppSelector((state) => state.batteryType); // <-- Đổi tên state cho đúng

    const [editingBatteryType, setEditingBatteryType] = useState<BatteryTypes | null>(null);
    // ✨ 2. Thêm state mới để quản lý ID của item cần xem chi tiết
    const [detailId, setDetailId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchBatteryTypes());
    }, [dispatch]);

    const columns: GridColDef[] = [
        // ... các cột khác không đổi
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Model Name', flex: 1, minWidth: 200 },
        { field: 'type', headerName: 'Vehicle Type', width: 150 },
        // {
        //     field: 'designCapacity',
        //     headerName: 'Capacity (Ah)',
        //     type: 'number',
        //     width: 150,
        //     align: 'right',
        //     headerAlign: 'right',
        // },
        // {
        //     field: 'createdAt',
        //     headerName: 'Created At',
        //     width: 200,
        //     renderCell: (params: GridRenderCellParams<any, string>) => {
        //         if (!params.value) return '';
        //         const date = new Date(params.value);
        //         return <span>{date.toLocaleString('vi-VN')}</span>;
        //     },
        // },
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
                    onClick={() => setEditingBatteryType(params.row as BatteryTypes)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this battery type?")) {
                            dispatch(deleteBatteryType(params.row.id as number))
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

    if (loading && batteryTypes.length === 0) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ p: 4 }}>Error: {error}</Box>;
    }

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Battery Types
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/battery-types/create')}
                >
                    Create New
                </Button>
            </Box>

            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={batteryTypes}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    // ✨ 3. Thay đổi onRowClick để mở popup thay vì navigate
                    onRowClick={(params) => setDetailId(params.row.id)}
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        borderRadius: '12px',
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #e0e0e0',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#fafafa',
                            borderBottom: '1px solid #e0e0e0',
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Box>

            {/* Popup Update Form */}
            <UpdateBatteryTypeForm
                open={Boolean(editingBatteryType)}
                batteryType={editingBatteryType}
                onClose={() => setEditingBatteryType(null)}
            />

            {/* ✨ 4. Thêm Dialog cho popup chi tiết */}
            <Dialog open={detailId !== null} onClose={() => setDetailId(null)} fullWidth maxWidth="sm">
                <DialogTitle>
                    Battery Type Detail
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
                    {/* Chỉ render component detail khi có ID */}
                    {detailId !== null && <BatteryTypeDetail id={detailId} />}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default BatteryTypeList;