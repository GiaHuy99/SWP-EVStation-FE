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
    // Đồng bộ background nhẹ hơn từ battery
    background: "#F9FAFB",
    padding: theme.spacing(4),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    // Đồng bộ shadow mượt từ battery
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb", // Đồng bộ border xám nhạt
    // Sử dụng sx={{ border: "1px solid #E8F5E8" }} khi wrap để thêm viền ngoài pastel
}));

export const Title = styled(MuiTypography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    // Đồng bộ màu chữ tối hơn từ battery
    color: "#374151",
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

// Đồng bộ StyledTextField từ battery: background xanh pastel, hover gradient, focus glow xanh lá
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#E8F5E8", // Background xanh lá pastel mặc định
        borderRadius: "12px", // Bo tròn hiện đại
        padding: "12px 16px", // Padding thoải mái
        fontWeight: 400, // Font nhẹ dễ đọc
        transition: "all 0.3s ease-in-out", // Mượt mà

        // Hover: Gradient pastel sáng hơn
        "&:hover": {
            background: "linear-gradient(135deg, #E8F5E8 0%, #D4EDDA 100%)",
            borderColor: theme.palette.success.light,
            transform: "translateY(-1px)", // Nâng nhẹ
        },

        // Focus: Viền + glow xanh lá
        "&.Mui-focused": {
            borderColor: theme.palette.success.main,
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.15)", // Glow pastel
            backgroundColor: "#E8F5E8", // Giữ background
            "& fieldset": {
                borderColor: theme.palette.success.main,
            },
        },

        // Error: Đỏ pastel
        "&.Mui-error": {
            backgroundColor: "#FDE8E8",
            "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.15)",
            },
        },

        // Viền mặc định
        "& fieldset": {
            borderColor: "#D1D5DB", // Xám nhạt đồng bộ
            borderWidth: "1px",
            transition: "all 0.3s ease-in-out",
        },

        // Text bên trong
        "& .MuiInputBase-input": {
            color: "#374151", // Chữ tối
            "&::placeholder": {
                color: "#9CA3AF", // Placeholder xám
                opacity: 1,
            },
        },
    },
}));

export const ListCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 1000,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    // Đồng bộ shadow từ FormCard
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb", // Đồng bộ border
    // Sử dụng sx={{ border: "1px solid #E8F5E8" }} để thêm viền ngoài pastel nếu cần
}));

export const TableWrapper = styled(Box)(() => ({
    width: "100%",
    overflowX: "auto",
}));

export const DetailCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 500,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    // Đồng bộ shadow từ battery
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb", // Đồng bộ
    // Sử dụng sx={{ border: "1px solid #E8F5E8" }} để thêm viền ngoài pastel
}));

export const DetailItem = styled(Box)(({ theme }) => ({
    // Giữ flex, thêm border-bottom đồng bộ
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    "&:not(:last-child)": {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
}));

export const DetailLabel = styled(MuiTypography)(({ theme }) => ({
    fontWeight: 600,
    // Đồng bộ màu từ battery
    color: "#374151",
    flexGrow: 1,
}));

export const DetailValue = styled(MuiTypography)(({ theme }) => ({
    fontSize: "1rem",
    // Đồng bộ màu nhạt hơn
    color: "#555",
    textAlign: "right",
}));