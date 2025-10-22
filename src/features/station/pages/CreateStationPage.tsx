import React from "react";
import CreateStationForm from "../components/CreateStationForm";
import {PageContainer, FormCard, Title} from "../styles/CreateStationForm";
import { Box } from "@mui/material";

const CreateStationPage: React.FC = () => {
    const stationIconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9DuPzhe6WZnaoZsg0GGNK13gckLmiKAp5w&s";

    return (
        <PageContainer maxWidth="md">
            <FormCard>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3, // margin bottom
                    }}
                >
                    <Box
                        component="img"
                        src={stationIconUrl} // Sử dụng hình ảnh đã import
                        alt="Station Icon"
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%', // Nếu muốn bo tròn hình ảnh
                            mb: 1, // Khoảng cách với tiêu đề
                        }}
                    />
                    <Title variant="h4">Create New Station</Title>
                </Box>
                <CreateStationForm />

            </FormCard>
        </PageContainer>
    );
};

export default CreateStationPage;
