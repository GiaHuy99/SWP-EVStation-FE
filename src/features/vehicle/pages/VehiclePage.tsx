import React from "react";
import { Container } from "@mui/material";
import VehicleCreateForm from "../components/VehicleCreateForm";
import {PageContainer} from "../styles/VehicleFormStyles";

const VehiclePage: React.FC = () => {
    return (
        <PageContainer>
        <Container sx={{ mt: 5 }}>
            <VehicleCreateForm />
        </Container>
        </PageContainer>
    );
};

export default VehiclePage;
