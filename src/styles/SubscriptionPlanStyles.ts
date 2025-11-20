// src/styles/SubscriptionPlanStyles.ts
import { Box, Card, TextField, Typography, styled } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
}));

export const FormCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: "0 auto",
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    backgroundColor: "#ffffff",
}));

export const ListCard = styled(Card)(({ theme }) => ({
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    backgroundColor: "#ffffff",
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.8rem",
    marginBottom: theme.spacing(3),
    color: "#1a3681",
    textAlign: "center",
}));

export const FormBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: theme.spacing(2.5),
    gridTemplateColumns: "1fr 1fr",
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
    },
}));

export const FullWidthBox = styled(Box)(({ theme }) => ({
    gridColumn: "1 / -1",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        backgroundColor: "#f8fafc",
        "&:hover": {
            backgroundColor: "#edf2f7",
        },
        "&.Mui-focused": {
            backgroundColor: "#ffffff",
            boxShadow: "0 0 0 2px rgba(4, 196, 217, 0.2)",
        },
    },
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
    overflowX: "auto",
    marginTop: theme.spacing(3),
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}));