// src/components/SubscriptionPlanList.tsx
import React, { useEffect, useState } from "react";
import {
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptionPlans, deletePlan } from "../SubcriptionPlanThunks";
import SubscriptionPlanUpdateForm from "./SubscriptionPlanUpdateForm";
import { SubscriptionPlan } from "../types/SubscriptionPlanType";
import { styled } from "@mui/material/styles";

// Import styled
import {
    PageContainer,
    ListCard, // Wrap table
    TableWrapper, Title, // Overflow
    EditButton,
    DeleteButton,
} from "../../../styles/AdminDashboardStyles";
import Paper from "@mui/material/Paper";

// StyledTableRow hover xanh
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "#E8F5E8",
        transition: "background-color 0.3s ease-in-out",
        transform: "scale(1.01)",
    },
    "& td": { borderBottom: `1px solid ${theme.palette.divider}` },
}));

// StyledDialogContent
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    "& .MuiPaper-root": {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.06)",
    },
}));

const SubscriptionPlanList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { plans, loading, error } = useAppSelector(state => state.subscriptionPlan);

    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [detailId, setDetailId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xoá plan này?")) {
            dispatch(deletePlan(id));
        }
    };

    return (
        <PageContainer> {/* Wrap background */}
            <ListCard sx={{ border: "1px solid #E8F5E8" }}> {/* Viền pastel */}
                <Title>Các Gói Dịch Vụ Pin </Title>

                {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
                {error && <Typography color="error" align="center">{error}</Typography>}

                {!loading && !error && plans.length > 0 && (
                    <TableWrapper> {/* Overflow auto */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell>ID</TableCell> */}

                                        {/* <TableCell>Name</TableCell> */}
                                        <TableCell>Tên gói</TableCell>

                                        {/* <TableCell>Price</TableCell> */}
                                        <TableCell>Chi phí</TableCell>

                                        {/* <TableCell>Duration (days)</TableCell> */}
                                        <TableCell>Thời hạn (ngày)</TableCell>

                                        {/* <TableCell>Status</TableCell> */}
                                        <TableCell>Trạng thái</TableCell>

                                        {/* <TableCell align="center">Actions</TableCell> */}
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plans.map(plan => (
                                        <StyledTableRow // Hover xanh
                                            key={plan.id}
                                            onClick={() => setDetailId(plan.id)}
                                        >
                                            {/* <TableCell>{plan.id}</TableCell> */}
                                            <TableCell>{plan.name}</TableCell>
                                            {/* <TableCell>{plan.price}</TableCell> */}
                                            <TableCell>{formatPrice(plan.price)}</TableCell>
                                            <TableCell>{plan.durationDays}</TableCell>
                                            <TableCell>{plan.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}</TableCell>
                                            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                                <EditButton
                                                    onClick={() => setEditingPlan(plan)}
                                                >
                                                    Cập nhật
                                                </EditButton>
                                                <DeleteButton
                                                    onClick={() => handleDelete(plan.id)}
                                                >
                                                    Xóa
                                                </DeleteButton>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TableWrapper>
                )}

                {/* Dialog Update */}
                <Dialog
                    open={editingPlan !== null}
                    onClose={() => setEditingPlan(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Update Plan
                        <IconButton
                            aria-label="close"
                            onClick={() => setEditingPlan(null)}
                            sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <StyledDialogContent> {/* Styled */}
                        {editingPlan && (
                            <SubscriptionPlanUpdateForm
                                plan={editingPlan}
                                onClose={() => setEditingPlan(null)}
                            />
                        )}
                    </StyledDialogContent>
                </Dialog>

                {/* Dialog Detail */}
                <Dialog
                    open={detailId !== null}
                    onClose={() => setDetailId(null)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Chi Tiết Gói Đăng Ký
                        <IconButton
                            aria-label="close"
                            onClick={() => setDetailId(null)}
                            sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    {/*<StyledDialogContent>*/}
                    {/*    {detailId && <SubscriptionPlanDetail id={detailId} />}*/}
                    {/*</StyledDialogContent>*/}
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default SubscriptionPlanList;
