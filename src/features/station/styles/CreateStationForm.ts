// src/styles/AdminDashboardStyles.tsx
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer"; // New for tables

// 2025: Softer, more immersive gradient (inspired by Muzli's logistics dashboards)
export const PageContainer = styled(Container)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", // Neutral slate for focus
    padding: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
    },
}));

// Enhanced card: Deeper shadow, subtle glass effect (MUI best: elevation=8+)
export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(4),
    borderRadius: "20px", // Bolder rounds for 2025 trend
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // Elevated depth
    backgroundColor: "#ffffff",
    border: "1px solid rgba(76, 66, 140, 0.1)", // Subtle purple tint
    position: "relative",
    overflow: "hidden",
    // Top accent bar: Softer gradient
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 50%, #06b6d4 100%)",
    },
    // Hover lift for interactivity
    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-2px)",
    },
}));

// Title: Gradient text with better spacing (inspired by BootstrapDash minimalism)
export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    textAlign: "center",
    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "2.25rem", // Slightly larger for impact
    letterSpacing: "-0.025em",
}));

// Form Grid: More flexible for admin forms (2-col desktop, stack mobile)
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

// Upgraded TextField: Focus glows, error states (MUI styled() best practices)
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f1f5f9", // Soft neutral (2025 minimalism)
        borderRadius: "12px",
        padding: "14px 16px", // More breathing room
        fontWeight: 400,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        // Hover: Gentle lift + tint
        "&:hover": {
            backgroundColor: "#e2e8f0",
            borderColor: "#04C4D9",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(4, 196, 217, 0.1)",
        },
        // Focus: Stronger accent, no harsh lines
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
        // Error: Subtle red without overwhelming
        "&.Mui-error": {
            backgroundColor: "#fef2f2",
            "&:hover": {
                backgroundColor: "#fee2e2",
            },
            "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
                borderColor: "#ef4444",
            },
        },
        "& fieldset": {
            borderColor: "#cbd5e1",
            borderWidth: "2px",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "& .MuiInputBase-input": {
            color: "#0f172a", // Dark slate for readability
            fontSize: "1rem",
            "&::placeholder": {
                color: "#64748b",
                opacity: 1,
            },
        },
    },
    "& .MuiInputLabel-root": {
        color: "#475569",
        fontWeight: 500,
        "&.Mui-focused": {
            color: "#4C428C",
            fontWeight: 600,
        },
        "&.Mui-error": {
            color: "#ef4444",
        },
    },
    "& .MuiFormHelperText-root": {
        fontSize: "0.875rem",
        color: "#64748b",
    },
}));

// List/Table Card: Wider for dashboards, better padding
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

// Table Wrapper: Custom scrollbar + zebra stripes hint
export const TableWrapper = styled(TableContainer)(() => ({
    width: "100%",
    overflowX: "auto",
    borderRadius: "12px",
    "&::-webkit-scrollbar": {
        height: "6px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f5f9",
        borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cbd5e1",
        borderRadius: "3px",
        "&:hover": {
            backgroundColor: "#04C4D9",
        },
    },
    // Add to your table: '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'rgba(76, 66, 140, 0.02)' }
}));

// Detail Card: Compact for side panels
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

// Detail Items: Hover expansions for UX
export const DetailItem = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    transition: "all 0.2s ease",
    "&:not(:last-child)": {
        borderBottom: "1px solid #e2e8f0",
    },
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

// Bonus: Admin Button (use in headers/actions)
export const StyledButton = styled("button")(({ theme }) => ({
    padding: "12px 24px",
    fontSize: "0.875rem",
    fontWeight: 600,
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 14px rgba(76, 66, 140, 0.3)",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(76, 66, 140, 0.4)",
    },
    "&:active": {
        transform: "translateY(0)",
    },
    "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
        transform: "none",
    },
}));