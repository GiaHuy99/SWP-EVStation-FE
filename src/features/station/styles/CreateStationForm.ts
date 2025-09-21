// src/styles/CreateStationForm.js (hoặc file styles tương tự)

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";


export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Sử dụng màu nền mới
    background: "#F0F2F5",
    padding: theme.spacing(4),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    // Đổ bóng mềm hơn và hiện đại hơn
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
}));

export const Title = styled(MuiTypography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    // Màu chữ xám đậm mới
    color: "#333333",
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
export const StyledTextField = styled(TextField)(({ theme }) => ({
    // Hiệu ứng khi focus
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            // Thay đổi màu viền khi focus
            borderColor: theme.palette.primary.main,
            // Thêm hiệu ứng đổ bóng tinh tế
            boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.2)",
            transition: "all 0.3s ease-in-out",
        },
    },
    // Hiệu ứng khi hover
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.light,
    },

}));