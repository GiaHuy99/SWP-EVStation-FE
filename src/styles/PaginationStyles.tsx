import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  padding: "24px",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const PaginationButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  padding: "8px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "#f5f5f5",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#04C4D9",
    color: "white",
    borderColor: "#04C4D9",
  },
  "&.active": {
    backgroundColor: "#04C4D9",
    color: "white",
    borderColor: "#04C4D9",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

export const PaginationInfo = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.secondary,
  margin: "0 16px",
}));
