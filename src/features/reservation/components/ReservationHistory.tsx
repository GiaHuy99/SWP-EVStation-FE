// features/reservation/components/ReservationHistory.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';
import { loadUserReservations, cancelReservationThunk } from '../reservationThunk';

import { PageContainer, FormCard, Title } from '../../link-subcription/styles/LinkVehicleFormStyles';

import {
    Box,
    Typography,
    Chip,
    Button,
    Alert,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';

const Transition = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReservationHistory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { reservations, loadingReservations, cancellingId, error } = useSelector(
        (state: RootState) => state.reservation
    );

    // State cho Dialog hủy
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState<number | null>(null);

    useEffect(() => {
        dispatch(loadUserReservations());
    }, [dispatch]);

    const handleOpenCancelDialog = (id: number) => {
        setReservationToCancel(id);
        setOpenCancelDialog(true);
    };

    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
        setReservationToCancel(null);
    };

    const handleConfirmCancel = () => {
        if (reservationToCancel !== null) {
            dispatch(cancelReservationThunk(reservationToCancel));
            handleCloseCancelDialog();
        }
    };

    if (loadingReservations) {
        return (
            <PageContainer>
                <FormCard>
                    <Box textAlign="center" py={8}>
                        <CircularProgress size={60} color="success" />
                        <Typography variant="h6" mt={3}>Đang tải lịch sử...</Typography>
                    </Box>
                </FormCard>
            </PageContainer>
        );
    }

    if (reservations.length === 0) {
        return (
            <PageContainer>
                <FormCard>
                    <Box textAlign="center" py={10}>
                        <ElectricBoltIcon sx={{ fontSize: 80, color: '#94a3b8' }} />
                        <Typography variant="h5" mt={3} color="text.secondary">
                            Bạn chưa có đặt pin nào
                        </Typography>
                    </Box>
                </FormCard>
            </PageContainer>
        );
    }

    const activeReservations = reservations.filter(r => r.status === 'ACTIVE');

    return (
        <PageContainer>
            <FormCard>
                <Title variant="h4">Lịch Sử Đặt Pin Của Bạn</Title>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {activeReservations.length === 0 ? (
                    <Box textAlign="center" py={6}>
                        <ElectricBoltIcon sx={{ fontSize: 70, color: '#94a3b8', opacity: 0.8 }} />
                        <Typography variant="h6" color="text.secondary" mt={2}>
                            Không có lượt đặt pin đang hoạt động
                        </Typography>
                    </Box>
                ) : (
                    <List>
                        {activeReservations.map((res, idx) => (
                            <Box key={res.reservationId}>
                                {idx > 0 && <Divider />}
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#22c55e' }}>
                                            <ElectricBoltIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                                <Typography fontWeight={700}>
                                                    {res.station.name}
                                                </Typography>
                                                <Chip
                                                    label={`${res.remainingMinutes} phút còn lại`}
                                                    size="small"
                                                    color={res.remainingMinutes <= 10 ? 'error' : 'success'}
                                                    icon={<AccessTimeIcon />}
                                                />
                                                {res.remainingMinutes <= 10 && (
                                                    <Chip
                                                        label="Sắp hết hạn!"
                                                        color="error"
                                                        variant="outlined"
                                                        size="small"
                                                        icon={<WarningIcon />}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.primary">
                                                    <LocationOnIcon fontSize="small" /> {res.station.address}
                                                </Typography>
                                                <Typography variant="body2" mt={1}>
                                                    {res.quantity} pin • Mã đặt: <strong>#{res.reservationId}</strong>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Hết hạn lúc: {new Date(res.expireAt).toLocaleString('vi-VN')}
                                                </Typography>
                                                <Box mt={2}>
                                                    {res.batteries.map(b => (
                                                        <Chip
                                                            key={b.id}
                                                            label={b.serialNumber}
                                                            size="small"
                                                            sx={{ mr: 1, mb: 1 }}
                                                            color="success"
                                                            variant="outlined"
                                                        />
                                                    ))}
                                                </Box>
                                                {res.status === 'ACTIVE' && res.remainingMinutes > 0 && (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        startIcon={<CancelIcon />}
                                                        onClick={() => handleOpenCancelDialog(res.reservationId)}
                                                        disabled={cancellingId === res.reservationId}
                                                        sx={{ mt: 2 }}
                                                    >
                                                        {cancellingId === res.reservationId ? 'Đang hủy...' : 'Hủy đặt pin'}
                                                    </Button>
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                )}
            </FormCard>

            {/* DIALOG XÁC NHẬN HỦY – ĐẸP NHƯ APP XỊN */}
            <Dialog
                open={openCancelDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseCancelDialog}
                aria-labelledby="cancel-dialog-title"
            >
                <DialogTitle id="cancel-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon color="error" />
                    Xác nhận hủy đặt pin
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn <strong>hủy đặt pin</strong> này không?<br />
                        Sau khi hủy, bạn sẽ không thể đổi pin tại trạm này nữa.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelDialog}>
                        Giữ lại
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        color="error"
                        variant="contained"
                        autoFocus
                    >
                        Có, hủy ngay
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default ReservationHistory;