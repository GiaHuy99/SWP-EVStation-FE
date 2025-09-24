import { styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";

// Container cho trang
export const PageContainer = styled("div")({
    padding: "24px",
    display: "flex",
    justifyContent: "center",   // căn giữa ngang
    alignItems: "center",       // căn giữa dọc
    minHeight: "100vh",         // chiều cao 100% viewport
    backgroundColor: "#f5f5f5", // thêm màu nền nếu muốn
});

// Card chứa chi tiết plan
export const PlanCard = styled(Card)({
    padding: 16,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

// Tiêu đề plan
export const Title = styled(Typography)({
    fontWeight: 600,
    marginBottom: 12,
});

// Item label/value
export const DetailItem = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
});

export const DetailLabel = styled(Typography)({
    fontWeight: 500,
});

export const DetailValue = styled(Typography)({
    fontWeight: 400,
});

export const FormCard = styled("div")({
    width: "100%",
    maxWidth: "600px",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
});