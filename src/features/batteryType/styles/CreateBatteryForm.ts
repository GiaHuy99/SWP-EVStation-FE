import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";

export const PageContainer = styled(MuiContainer)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB",
    padding: theme.spacing(2), // ✨ Gợi ý: Giảm padding trên mobile
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4), // ✨ Gợi ý: Trở lại padding cũ trên màn hình lớn hơn
    },
}));

export const FormCard = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(3), // ✨ Gợi ý: Giảm padding trên mobile
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5), // ✨ Gợi ý: Tăng padding trên desktop
    },
    borderRadius: "16px", // ✨ Gợi ý: Tăng độ bo tròn cho mềm mại hơn
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.07), 0px 4px 6px -2px rgba(0,0,0,0.05)", // ✨ Gợi ý: Shadow tinh tế hơn
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // ✨ Gợi ý: Thêm transition cho các hiệu ứng
    '&:hover': {
        transform: 'translateY(-4px)', // ✨ Gợi ý: Hiệu ứng nâng nhẹ card khi hover
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

export const FullWidthBox = styled(Box)(() => ({
    gridColumn: "1 / -1",
}));

// StyledTextField đã rất tốt, chỉ thêm một vài tinh chỉnh nhỏ
export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#E8F5E8",
        borderRadius: "12px",
        // ✨ Gợi ý: Để MUI tự quản lý padding bên trong sẽ tốt hơn
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
        "&.Mui-error": {
            backgroundColor: "#FDE8E8",
            "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.15)",
            },
        },
        "& fieldset": {
            borderColor: "#D1D5DB",
            borderWidth: "1px",
            transition: "all 0.3s ease-in-out",
        },
        "& .MuiInputBase-input": {
            color: "#374151",
            "&::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
            },
        },
    },
    // ✨ Gợi ý: Style cho label để dễ đọc hơn khi focus
    "& .MuiInputLabel-root": {
        color: '#6B7280', // Màu xám cho label
        "&.Mui-focused": {
            fontWeight: '600', // In đậm label khi focus
        }
    }
}));

export const DetailCard = styled(Card)({
    padding: "24px", // ✨ Gợi ý: Tăng padding
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // ✨ Gợi ý: Giảm nhẹ shadow
    borderRadius: "16px", // ✨ Gợi ý: Đồng bộ bo tròn với FormCard
    border: "1px solid #e5e7eb", // ✨ Gợi ý: Thêm viền mỏng
});

export const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "600", // ✨ Gợi ý: Tăng độ đậm để nhấn mạnh
    marginBottom: theme.spacing(3), // ✨ Gợi ý: Tăng khoảng cách dưới
    textAlign: "center",
    color: theme.palette.text.primary, // ✨ Gợi ý: Dùng màu từ theme để nhất quán
}));

export const DetailItem = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center', // ✨ Gợi ý: Căn giữa các item theo chiều dọc
    padding: '12px 0', // ✨ Gợi ý: Thêm padding trên dưới
    // ✨ Gợi ý: Thêm đường kẻ phân cách tinh tế
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    }
}));

export const DetailLabel = styled("span")(({ theme }) => ({
    fontWeight: "500", // ✨ Gợi ý: Dùng Medium weight
    color: theme.palette.text.secondary, // ✨ Gợi ý: Dùng màu phụ của theme
    marginRight: theme.spacing(2), // ✨ Gợi ý: Thêm khoảng cách bên phải
}));

export const DetailValue = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary, // ✨ Gợi ý: Dùng màu chính của theme
    textAlign: 'right', // ✨ Gợi ý: Căn phải để thẳng hàng
    wordBreak: 'break-word', // ✨ Gợi ý: Tự động xuống dòng nếu text quá dài
}));