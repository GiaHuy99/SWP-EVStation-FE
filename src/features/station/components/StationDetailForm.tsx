import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getStationById } from "../StationThunks";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    styled
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import InventoryIcon from '@mui/icons-material/Inventory';

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

interface StationDetailProps {
    id: number;
}

const StationDetail: React.FC<StationDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedStation, loading, error } = useAppSelector(
        (state) => state.station
    );

    useEffect(() => {
        if (id) {
            dispatch(getStationById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    if (!selectedStation) {
        return <div>Không có dữ liệu chi tiết cho station này.</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <StyledCard>
                <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            {selectedStation.name}
                        </Typography>
                        <StatusChip
                            label={selectedStation.status=== 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                            status={selectedStation.status}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <DetailItem>
                            <LocationOnIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Địa chỉ
                                </Typography>
                                <Typography variant="body1">
                                    {selectedStation.location}
                                </Typography>
                            </Box>
                        </DetailItem>

                        <Box sx={{ display: 'flex', gap: 4, mt: 3 }}>
                            <DetailItem>
                                <InventoryIcon />
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Sức chứa
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedStation.capacity} vị trí
                                    </Typography>
                                </Box>
                            </DetailItem>

                            <DetailItem>
                                <PhoneIcon />
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Số điện thoại
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedStation.phone}
                                    </Typography>
                                </Box>
                            </DetailItem>
                        </Box>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default StationDetail;