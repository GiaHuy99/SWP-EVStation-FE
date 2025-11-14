// src/styles/AdminDashboardStyles.tsx
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";

export const PageContainer = styled(Container)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    padding: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
    },
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(4),
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(76, 66, 140, 0.1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 50%, #06b6d4 100%)",
    },
    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-2px)",
    },
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    textAlign: "center",
    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "2.25rem",
    letterSpacing: "-0.025em",
}));

export const FormBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
    },
}));

export const FullWidthBox = styled(Box)(() => ({
    gridColumn: "1 / -1",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "14px 16px",
        fontWeight: 400,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
            backgroundColor: "#e9ecef",
            borderColor: "#04C4D9",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(4, 196, 217, 0.1)",
        },
        "&.Mui-focused": {
            backgroundColor: "#ffffff",
            borderColor: "#4C428C",
            boxShadow: "0 0 0 3px rgba(76, 66, 140, 0.1), 0 0 0 0 rgba(4, 196, 217, 0.2)",
            transform: "translateY(-1px)",
            "& fieldset": {
                borderColor: "#4C428C",
                borderWidth: "2px",
            },
        },
        "&.Mui-error": {
            backgroundColor: "#fef2f2",
            "&:hover": { backgroundColor: "#fee2e2" },
            "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)" },
        },
        "& fieldset": {
            borderColor: "#cbd5e1",
            borderWidth: "2px",
        },
        "& .MuiInputBase-input": {
            color: "#0f172a",
            fontSize: "1rem",
            "&::placeholder": { color: "#64748b", opacity: 1 },
        },
    },
    "& .MuiInputLabel-root": {
        color: "#475569",
        fontWeight: 500,
        "&.Mui-focused": { color: "#4C428C", fontWeight: 600 },
        "&.Mui-error": { color: "#ef4444" },
    },
    "& .MuiFormHelperText-root": {
        fontSize: "0.875rem",
        color: "#64748b",
    },
}));

export const ListCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 1200,
    padding: theme.spacing(4),
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(76, 66, 140, 0.1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 50%, #06b6d4 100%)",
    },
}));

export const TableWrapper = styled(TableContainer)(() => ({
    width: "100%",
    overflowX: "auto",
    borderRadius: "12px",
    "&::-webkit-scrollbar": { height: "6px" },
    "&::-webkit-scrollbar-track": { backgroundColor: "#f1f5f9", borderRadius: "3px" },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cbd5e1",
        borderRadius: "3px",
        "&:hover": { backgroundColor: "#04C4D9" },
    },
}));

export const DetailCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 500,
    padding: theme.spacing(3),
    borderRadius: "16px",
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(4, 196, 217, 0.1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 100%)",
    },
}));

export const DetailItem = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: "all 0.2s ease",
    "&:not(:last-child)": { borderBottom: "1px solid #e2e8f0" },
    "&:hover": {
        paddingLeft: theme.spacing(1),
        borderBottomColor: "#04C4D9",
        backgroundColor: "rgba(4, 196, 217, 0.02)",
        borderRadius: "8px",
    },
}));

export const DetailLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: "#4C428C",
    flexGrow: 1,
    fontSize: "1rem",
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: 500,
    color: "#0f172a",
    textAlign: "right",
}));