import { styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import MuiContainer from "@mui/material/Container";
import Paper from "@mui/material/Paper"; // Để PageContainer

// Đồng bộ PageContainer từ battery/station
export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB", // Đồng bộ nhẹ hơn #f5f5f5
    padding: theme.spacing(4),
}));

// FormCard cho form/create/update
export const FormCard = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: "600px",
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)", // Đồng bộ shadow mượt
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb", // Đồng bộ border xám nhạt
    // Sử dụng sx={{ border: "1px solid #E8F5E8" }} để thêm viền ngoài pastel
}));

// PlanCard/DetailCard cho detail
export const PlanCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: "500px",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)", // Đồng bộ
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    // sx cho viền pastel nếu cần
}));

// Title đồng bộ
export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: "#374151", // Đồng bộ tối hơn
}));

// FormBox grid responsive
export const FormBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2.5),
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(3),
    },
}));

// FullWidthBox cho button
export const FullWidthBox = styled(Box)(() => ({
    gridColumn: "1 / -1",
}));

// StyledTextField đồng bộ pastel green
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
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.15)",
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

// DetailItem flex
export const DetailItem = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    "&:not(:last-child)": { borderBottom: `1px solid ${theme.palette.grey[300]}` },
}));

// DetailLabel/Value đồng bộ color
export const DetailLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: "#374151",
    flexGrow: 1,
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    color: "#555",
    textAlign: "right",
}));

// ListCard cho table
export const ListCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 1000,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    // sx cho viền pastel
}));

// TableWrapper
export const TableWrapper = styled(Box)(() => ({
    width: "100%",
    overflowX: "auto",
}));