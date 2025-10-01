import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F5F7FB",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 720,
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(2,6,23,0.08)",
    backgroundColor: "#fff",
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: "#1f2937",
}));

export const FormRow = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(2.5),
    },
}));

export const SingleRow = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
}));
