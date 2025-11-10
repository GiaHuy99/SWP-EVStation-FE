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
    // Modern gradient background
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
    padding: theme.spacing(4),
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(5),
    borderRadius: "16px", // More rounded for modern feel
    // Enhanced shadow for depth
    boxShadow: "0px 20px 60px rgba(76, 66, 140, 0.12)",
    backgroundColor: "#ffffff",
    border: "2px solid #04C4D9", // Cyan accent border
    position: "relative",
    overflow: "hidden",
    // Subtle top gradient bar
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 100%)",
    },
}));

export const Title = styled(MuiTypography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    // Gradient text effect
    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: "2rem",
    letterSpacing: "-0.5px",
}));

export const FormBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(3),
    },
}));

export const FullWidthBox = styled(Box)(() => ({
    gridColumn: "1 / -1",
}));

// Modern TextField with purple/cyan theme
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f8f9fa", // Light neutral background
        borderRadius: "12px",
        padding: "12px 16px",
        fontWeight: 400,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        // Hover: Subtle cyan glow
        "&:hover": {
            backgroundColor: "#f0fdff", // Very light cyan tint
            borderColor: "#04C4D9",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(4, 196, 217, 0.15)",
        },

        // Focus: Strong purple/cyan accent
        "&.Mui-focused": {
            backgroundColor: "#ffffff",
            borderColor: "#4C428C",
            boxShadow: "0 0 0 4px rgba(76, 66, 140, 0.1), 0 0 20px rgba(4, 196, 217, 0.2)",
            transform: "translateY(-2px)",
            "& fieldset": {
                borderColor: "#4C428C",
                borderWidth: "2px",
            },
        },

        // Error state
        "&.Mui-error": {
            backgroundColor: "#fff5f5",
            "&:hover": {
                backgroundColor: "#fee",
            },
            "&.Mui-focused": {
                boxShadow: "0 0 0 4px rgba(220, 53, 69, 0.1)",
                borderColor: "#dc3545",
            },
        },

        // Default border
        "& fieldset": {
            borderColor: "#e5e7eb",
            borderWidth: "2px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },

        // Input text
        "& .MuiInputBase-input": {
            color: "#222326", // Dark text
            fontSize: "1rem",
            "&::placeholder": {
                color: "#9ca3af",
                opacity: 1,
            },
        },
    },

    // Label styles
    "& .MuiInputLabel-root": {
        color: "#6b7280",
        fontWeight: 500,
        "&.Mui-focused": {
            color: "#4C428C",
            fontWeight: 600,
        },
        "&.Mui-error": {
            color: "#dc3545",
        },
    },

    // Helper text
    "& .MuiFormHelperText-root": {
        marginLeft: "4px",
        fontSize: "0.875rem",
    },
}));

export const ListCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 1200,
    padding: theme.spacing(4),
    borderRadius: "16px",
    boxShadow: "0px 20px 60px rgba(76, 66, 140, 0.12)",
    backgroundColor: "#ffffff",
    border: "2px solid #04C4D9",
    position: "relative",
    overflow: "hidden",
    // Top gradient bar
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 100%)",
    },
}));

export const TableWrapper = styled(Box)(() => ({
    width: "100%",
    overflowX: "auto",
    // Custom scrollbar
    "&::-webkit-scrollbar": {
        height: "8px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f5f9",
        borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#04C4D9",
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: "#03a8b8",
        },
    },
}));

export const DetailCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 500,
    padding: theme.spacing(4),
    borderRadius: "16px",
    boxShadow: "0px 20px 60px rgba(76, 66, 140, 0.12)",
    backgroundColor: "#ffffff",
    border: "2px solid #04C4D9",
    position: "relative",
    overflow: "hidden",
    // Top gradient bar
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #4C428C 0%, #04C4D9 100%)",
    },
}));

export const DetailItem = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    transition: "all 0.2s ease",
    "&:not(:last-child)": {
        borderBottom: "2px solid #f3f4f6",
    },
    // Subtle hover effect
    "&:hover": {
        paddingLeft: theme.spacing(1),
        borderBottomColor: "#04C4D9",
    },
}));

export const DetailLabel = styled(MuiTypography)(({ theme }) => ({
    fontWeight: 600,
    color: "#4C428C", // Purple for labels
    flexGrow: 1,
    fontSize: "1rem",
}));

export const DetailValue = styled(MuiTypography)(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: 500,
    color: "#222326", // Dark for values
    textAlign: "right",
}));

// Bonus: Styled button to match theme
export const StyledButton = styled("button")(({ theme }) => ({
    padding: "12px 32px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: "linear-gradient(135deg, #4C428C 0%, #04C4D9 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(76, 66, 140, 0.3)",

    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 24px rgba(76, 66, 140, 0.4)",
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