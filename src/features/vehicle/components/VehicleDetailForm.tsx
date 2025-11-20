// src/features/vehicle/components/VehicleDetailForm.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchVehicleById } from "../VehicleThunks";
import { Box, Card, CardContent, Typography, Chip, CircularProgress, Alert } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import { styled } from "@mui/material/styles";
import { PageContainer } from "../styles/VehicleFormStyles";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 900,
    margin: "0 auto",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
}));

const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(2),
        color: "#04C4D9",
        fontSize: "2rem",
    },
}));

interface Props {
    id: number;
}

const VehicleDetailForm: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedVehicle: v, loading, error } = useAppSelector(state => state.vehicle);

    useEffect(() => {
        dispatch(fetchVehicleById(id));
    }, [id, dispatch]);

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 8 }} />;
    if (error) return <Alert severity="error" sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>{error}</Alert>;
    if (!v) return <Typography align="center" sx={{ mt: 8 }}>Không tìm thấy mẫu xe</Typography>;

    return (
        <PageContainer>
            <StyledCard>
                <CardContent sx={{ p: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight={700} color="#1a3681">
                            {v.brand} {v.name}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                        <DetailItem>
                            <DirectionsCarIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Thông tin cơ bản</Typography>
                                <Typography variant="h6">{v.brand} - {v.name}</Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <HeightIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Chiều dài cơ sở</Typography>
                                <Typography variant="h6">{v.wheelbase}</Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <HeightIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Khoảng sáng gầm</Typography>
                                <Typography variant="h6">{v.groundClearance}</Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <HeightIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Chiều cao yên</Typography>
                                <Typography variant="h6">{v.seatHeight}</Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <ScaleIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Trọng lượng (không pin)</Typography>
                                <Typography variant="h6">{v.weightWithoutBattery} kg</Typography>
                            </Box>
                        </DetailItem>

                        <DetailItem>
                            <ScaleIcon />
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">Trọng lượng (có pin)</Typography>
                                <Typography variant="h6">{v.weightWithBattery} kg</Typography>
                            </Box>
                        </DetailItem>
                    </Box>
                </CardContent>
            </StyledCard>
        </PageContainer>
    );
};

export default VehicleDetailForm;