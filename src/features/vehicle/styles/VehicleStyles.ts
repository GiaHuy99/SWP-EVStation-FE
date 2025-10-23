import { styled } from "@mui/material/styles";
import { Box, Card } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: '100%',
    margin: '0 auto',
}));

export const ListCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.06)',
    marginBottom: theme.spacing(3),
}));

export const TableWrapper = styled(Box)({
    overflowX: 'auto',
    '& .MuiTableCell-head': {
        fontWeight: 'bold',
    },
});

export const FormCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.06)',
    maxWidth: 800,
    margin: '0 auto',
}));