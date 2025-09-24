import React from "react";
import VehicleList from "../components/VehicleListForm";
import { Container, Typography } from "@mui/material";

const VehiclePage: React.FC = () => {
    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Vehicle List
            </Typography>
            <VehicleList />
        </Container>
    );
};

export default VehiclePage;
