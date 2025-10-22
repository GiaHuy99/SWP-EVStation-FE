import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getSubscriptionPlanById } from "../SubcriptionPlanThunks";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    CircularProgress,
    Alert,
    styled
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import SpeedIcon from '@mui/icons-material/Speed';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
}));

const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
    },
}));

const StatusChip = styled(Chip)(({ status }: { status: string }) => ({
    fontWeight: 'bold',
    backgroundColor: status === 'ACTIVE' ? '#E8F5E9' : '#FFEBEE',
    color: status === 'ACTIVE' ? '#2E7D32' : '#C62828',
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '2rem',
}));

interface SubscriptionPlanDetailFormProps {
    id: number;
}

const SubscriptionPlanDetailForm: React.FC<SubscriptionPlanDetailFormProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedPlan, loading, error } = useAppSelector(
        (state) => state.subscriptionPlan
    );

    useEffect(() => {
        if (id) {
            dispatch(getSubscriptionPlanById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedPlan) return <div>No data found</div>;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Box sx={{ p: 3 }}>
            <StyledCard>
                <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            {selectedPlan.name}
                        </Typography>
                        <StatusChip
                            label={selectedPlan.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                            status={selectedPlan.status}
                        />
                    </Box>

                    <DetailItem>
                        <AttachMoneyIcon fontSize="large" />
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                Giá gói
                            </Typography>
                            <PriceTypography>
                                {formatPrice(selectedPlan.price)}
                            </PriceTypography>
                        </Box>
                    </DetailItem>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 3 }}>
                        <DetailItem>
                            <CalendarTodayIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Thời hạn
                                </Typography>
                                <Typography variant="body1">
                                    {selectedPlan.durationDays} ngày
                                </Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <BatteryChargingFullIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Số pin tối đa
                                </Typography>
                                <Typography variant="body1">
                                    {selectedPlan.maxBatteries} pin
                                </Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <SpeedIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Số km cơ bản
                                </Typography>
                                <Typography variant="body1">
                                    {selectedPlan.baseMileage.toLocaleString()} km
                                </Typography>
                            </Box>
                        </DetailItem>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default SubscriptionPlanDetailForm;