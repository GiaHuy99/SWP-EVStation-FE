import { styled } from "@mui/material/styles";
import { Paper, Box, Container as MuiContainer, Typography, TextField, Card, Chip } from "@mui/material";



export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: 'column', // Cho phép header và list nằm dọc
    alignItems: "center",
    justifyContent: "flex-start", // Bắt đầu từ trên xuống
    background: "#F9FAFB",
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

// ========================================================================
// SECTION: FORM & DETAIL COMPONENTS (Tái sử dụng từ file mẫu)
// ========================================================================

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5),
    },
    borderRadius: "16px",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.07), 0px 4px 6px -2px rgba(0,0,0,0.05)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
    }
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

export const FullWidthBox = styled(Box)({
    gridColumn: "1 / -1",
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
    // Giữ nguyên style tuyệt vời từ file mẫu của bạn
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#E8F5E8",
        borderRadius: "12px",
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
            "& fieldset": {
                borderColor: theme.palette.success.main,
            },
        },
        "& fieldset": { borderColor: "#D1D5DB" },
    },
    "& .MuiInputLabel-root": {
        color: '#6B7280',
        "&.Mui-focused": { fontWeight: '600' }
    }
}));

export const DetailCard = styled(Card)({
    padding: "24px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
});

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.primary,
}));

export const DetailItem = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    }
}));

export const DetailLabel = styled("span")(({ theme }) => ({
    fontWeight: "500",
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
}));

export const DetailValue = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: 'right',
    wordBreak: 'break-word',
}));

// ========================================================================
// SECTION: LIST & TABLE COMPONENTS (Component mới dành riêng cho trang danh sách)
// ========================================================================

/**
 * Container cho toàn bộ trang danh sách (bao gồm header và DataGrid).
 * Kế thừa phong cách của FormCard nhưng rộng hơn.
 */
export const ListContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '1400px', // Rộng hơn để chứa bảng
    padding: theme.spacing(3),
    borderRadius: "16px",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.07), 0px 4px 6px -2px rgba(0,0,0,0.05)",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
}));

/**
 * Box chứa Tiêu đề trang và nút "Create New".
 */
export const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));

/**
 * Chip hiển thị trạng thái của Pin với màu sắc riêng biệt.
 * Rất hữu ích để làm nổi bật trạng thái trong DataGrid.
 */
type Status = "AVAILABLE" | "IN_USE" | "DAMAGED" | "MAINTENANCE";

export const StatusChip = styled(Chip)<{ status: Status }>(({ theme, status }) => {
    const styles = {
        AVAILABLE: {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
        },
        IN_USE: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
        },
        DAMAGED: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.dark,
        },
        MAINTENANCE: {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
        },
    };
    return {
        fontWeight: 'bold',
        borderRadius: '8px',
        ...styles[status],
    };
});