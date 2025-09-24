import { styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";

// Container tổng cho trang
export const PageContainer = styled("div")({
    padding: "24px",
    display: "flex",
    justifyContent: "center",   // căn giữa ngang
    alignItems: "center",       // căn giữa dọc
    minHeight: "100vh",         // chiều cao 100% viewport
    backgroundColor: "#f5f5f5",
});

export const FormCard = styled(Card)({
    width: "100%",
    maxWidth: 600,
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    margin: "40px auto", // căn giữa ngang
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // căn giữa các nội dung bên trong
});

// Tiêu đề form
export const Title = styled(Typography)({
    fontWeight: 600,
    marginBottom: 24,
    textAlign: "center",
});

// Hàng input trong form
export const FormRow = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%", // input chiếm toàn bộ width của FormCard
    maxWidth: 400, // giới hạn độ rộng input
});

