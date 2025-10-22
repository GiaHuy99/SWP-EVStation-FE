import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import StationDetail from "../components/StationDetailForm";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/stations/list");
    };

    if (!id) {
        return <div>Station ID không hợp lệ</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ mb: 3 }}
            >
                Back to List
            </Button>
            
            <StationDetail id={parseInt(id)} />
        </Box>
    );
};

export default StationDetailPage;
