import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleDetail from "../components/VehicleDetailForm";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VehicleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/vehicles/list");
    };

    if (!id) {
        return <div>ID phương tiện không hợp lệ</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ mb: 3 }}
            >
                Quay lại danh sách
            </Button>
            
            <VehicleDetail id={parseInt(id)} />
        </Box>
    );
};

export default VehicleDetailPage;