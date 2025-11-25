// src/features/staffManagement/components/StaffManagement.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { getStaffList, editStaff } from '../StaffManagementThunk';
import { fetchStations } from '../../../features/station/StationThunks';

import {
    PageContainer,
    ListCard,
    Title,
    TableWrapper,
} from '../../../styles/SubscriptionPlanStyles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    CircularProgress,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { message } from 'antd';

const StaffManagement: React.FC = () => {
    const dispatch = useAppDispatch();

    // CHỈ CẦN 1 DÒNG DUY NHẤT – LẤY ĐÚNG DỮ LIỆU TỪ SLICE
    const { staffList = [], stations = [], loading = false } = useAppSelector(
        (state: any) => state.staffManagement
    );

    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<any>(null);
    const [selectedStationId, setSelectedStationId] = useState<number | ''>('');

    useEffect(() => {
        dispatch(getStaffList());
        dispatch(fetchStations());
    }, [dispatch]);

    const handleOpenAssignModal = (staff: any) => {
        setSelectedStaff(staff);
        setSelectedStationId(staff.assignedStationId || '');
        setAssignModalOpen(true);
    };

    const handleAssignStation = async () => {
        if (!selectedStaff || !selectedStationId) return;

        try {
            await dispatch(
                editStaff({
                    id: selectedStaff.id,
                    data: { stationId: Number(selectedStationId) },
                })
            ).unwrap();

            message.success(`Đã gán trạm thành công cho ${selectedStaff.username}!`);
            setAssignModalOpen(false);
            setSelectedStaff(null);
            setSelectedStationId('');
        } catch (err) {
            message.error('Gán trạm thất bại!');
        }
    };

    return (
        <PageContainer>
            <ListCard>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Title>Quản Lý Gán Trạm Cho Nhân Viên</Title>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" my={8}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableWrapper>
                        <TableContainer component={Paper} elevation={0}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                                        <TableCell><strong>ID</strong></TableCell>
                                        <TableCell><strong>Tên đăng nhập</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>SĐT</strong></TableCell>
                                        <TableCell><strong>Trạm hiện tại</strong></TableCell>
                                        <TableCell align="center"><strong>Hành động</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {staffList.map((staff: any) => (
                                        <TableRow key={staff.id} hover>
                                            <TableCell>{staff.id}</TableCell>
                                            <TableCell>{staff.username}</TableCell>
                                            <TableCell>{staff.email}</TableCell>
                                            <TableCell>{staff.phone || '-'}</TableCell>
                                            <TableCell>
                                                <strong>
                                                    {staff.assignedStationName || (
                                                        <span style={{ color: '#999', fontStyle: 'italic' }}>
                              Chưa gán trạm
                            </span>
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    size="large"
                                                    color="primary"
                                                    onClick={() => handleOpenAssignModal(staff)}
                                                    sx={{
                                                        bgcolor: '#e3fcef',
                                                        '&:hover': { bgcolor: '#c8f5d8' },
                                                    }}
                                                >
                                                    <LocalGasStationIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TableWrapper>
                )}
            </ListCard>

            {/* Modal Gán Trạm */}
            <Dialog open={assignModalOpen} onClose={() => setAssignModalOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#04c4d9', color: 'white', fontWeight: 600, py: 2.5 }}>
                    Gán Trạm Làm Việc
                </DialogTitle>
                <DialogContent dividers>
                    {selectedStaff && (
                        <Box sx={{ py: 3 }}>
                            <Typography variant="h6" gutterBottom color="#1a3681">
                                {selectedStaff.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Email: {selectedStaff.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={4}>
                                Trạm hiện tại:{' '}
                                <strong>{selectedStaff.assignedStationName || 'Chưa gán'}</strong>
                            </Typography>

                            <FormControl fullWidth>
                                <InputLabel>Chọn trạm làm việc</InputLabel>
                                <Select
                                    value={selectedStationId}
                                    label="Chọn trạm làm việc"
                                    onChange={(e) => setSelectedStationId(Number(e.target.value))}
                                    disabled={loading}
                                >
                                    {stations.map((station: any) => (
                                        <MenuItem
                                            key={station.id}
                                            value={station.id}
                                            selected={station.id === selectedStaff.assignedStationId}
                                        >
                                            {station.name}
                                            {station.id === selectedStaff.assignedStationId && ' (Hiện tại)'}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setAssignModalOpen(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleAssignStation}
                        disabled={!selectedStationId || loading}
                        sx={{ bgcolor: '#04c4d9', '&:hover': { bgcolor: '#038b9a' } }}
                    >
                        Gán Trạm
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default StaffManagement;