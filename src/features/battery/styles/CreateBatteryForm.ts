import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";

export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB", // nhẹ hơn station
    padding: theme.spacing(4),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
}));

export const FormBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2.5),
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(3),
    },
}));

export const FullWidthBox = styled(Box)(() => ({
    gridColumn: "1 / -1",
}));

// Cập nhật StyledTextField với background xanh pastel và hiệu ứng đẹp hơn
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#E8F5E8", // Background xanh lá pastel mặc định
        borderRadius: "12px", // Bo tròn hơn cho vẻ hiện đại
        padding: "12px 16px", // Padding thoải mái hơn
        fontWeight: 400, // Font nhẹ, dễ đọc
        transition: "all 0.3s ease-in-out", // Mượt mà cho mọi thay đổi

        // Hover: Background sáng hơn với gradient nhẹ
        "&:hover": {
            background: "linear-gradient(135deg, #E8F5E8 0%, #D4EDDA 100%)", // Gradient pastel
            borderColor: theme.palette.success.light,
            transform: "translateY(-1px)", // Nâng nhẹ lên khi hover
        },

        // Focus: Viền xanh + glow shadow pastel
        "&.Mui-focused": {
            borderColor: theme.palette.success.main,
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.15)", // Glow nhẹ hơn, pastel
            backgroundColor: "#E8F5E8", // Giữ nguyên background
            "& fieldset": {
                borderColor: theme.palette.success.main,
            },
        },

        // Error: Đổi sang đỏ pastel để nhất quán
        "&.Mui-error": {
            backgroundColor: "#FDE8E8", // Đỏ pastel cho lỗi
            "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.15)",
            },
        },

        // Notched outline (viền mặc định)
        "& fieldset": {
            borderColor: "#D1D5DB", // Viền xám nhạt mặc định
            borderWidth: "1px",
            transition: "all 0.3s ease-in-out",
        },

        // Input text bên trong
        "& .MuiInputBase-input": {
            color: "#374151", // Màu chữ tối hơn cho tương phản tốt
            "&::placeholder": {
                color: "#9CA3AF", // Placeholder xám nhạt
                opacity: 1,
            },
        },
    },
}));

export const DetailCard = styled(Card)({
    padding: "20px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "12px",
});

export const Title = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
});

export const DetailItem = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
});

export const DetailLabel = styled("span")({
    fontWeight: "bold",
    color: "#333",
});

export const DetailValue = styled("span")({
    color: "#555",
});