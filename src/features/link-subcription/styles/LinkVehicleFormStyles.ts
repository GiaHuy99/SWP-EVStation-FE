import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"; // Để StyledTextField

export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB", // Đồng bộ nhẹ
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 720,
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)", // Đồng bộ mượt
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb", // Đồng bộ xám nhạt
    // sx={{ border: "1px solid #E8F5E8" }} cho viền ngoài pastel
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3), // Đồng bộ thoáng
    textAlign: "center",
    color: "#374151", // Đồng bộ tối
}));

export const FormRow = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2.5), // Đồng bộ FormBox
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(3),
    },
}));

export const SingleRow = styled(Box)(({ theme }) => ({
    display: "block",
    marginTop: theme.spacing(1.5),
}));

// Thêm StyledTextField đồng bộ pastel green
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#E8F5E8", // Pastel green
        borderRadius: "12px",
        padding: "12px 16px",
        fontWeight: 400,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            background: "linear-gradient(135deg, #E8F5E8 0%, #D4EDDA 100%)",
            borderColor: theme.palette.success.light,
            transform: "translateY(-1px)",
        },
        "&.Mui-focused": {
            borderColor: theme.palette.success.main,
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.15)", // Glow pastel
            backgroundColor: "#E8F5E8",
            "& fieldset": { borderColor: theme.palette.success.main },
        },
        "&.Mui-error": {
            backgroundColor: "#FDE8E8",
            "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.15)" },
        },
        "& fieldset": {
            borderColor: "#D1D5DB",
            borderWidth: "1px",
            transition: "all 0.3s ease-in-out",
        },
        "& .MuiInputBase-input": {
            color: "#374151",
            "&::placeholder": { color: "#9CA3AF", opacity: 1 },
        },
    },
}));