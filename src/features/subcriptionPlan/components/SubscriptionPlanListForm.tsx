// src/features/subscriptionPlan/components/SubscriptionPlanList.tsx
import React, { useEffect, useState } from "react";
import {
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Chip,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptionPlans, deletePlan } from "../SubcriptionPlanThunks";

import SubscriptionPlanUpdateForm from "./SubscriptionPlanUpdateForm";

import {
    PageContainer,
    ListCard,
    Title,
    TableWrapper,
    EditButton,
    DeleteButton,
    CreateButton,
} from "../../../styles/AdminDashboardStyles";

import TablePagination from "../../../components/Pagination/TablePagination";
import { SubscriptionPlan } from "../types/SubscriptionPlanType";

const SubscriptionPlanList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { plans, loading } = useAppSelector((state) => state.subscriptionPlan);

    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [viewingPlan, setViewingPlan] = useState<SubscriptionPlan | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    const totalPages = Math.ceil(plans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPlans = plans.slice(startIndex, startIndex + itemsPerPage);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const getPlanTypeLabel = (type: string) => {
        switch (type) {
            case "DISTANCE": return <Chip label="Theo quãng đường" color="primary" size="small" />;
            case "ENERGY": return <Chip label="Theo năng lượng" color="success" size="small" />;
            case "UNLIMITED": return <Chip label="Không giới hạn" color="secondary" size="small" />;
            default: return type;
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa gói này không?")) {
            dispatch(deletePlan(id));
        }
    };

    if (loading && plans.length === 0) {
        return (
            <PageContainer>
                <ListCard>
                    <Box display="flex" justifyContent="center" p={8}>
                        <CircularProgress size={60} />
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box p={4}>
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Title variant="h4" fontWeight={700}>
                            Quản Lý Gói Đăng Ký
                        </Title>
                        <CreateButton
                            onClick={() => window.location.href = "/subscriptionPlan/create"}
                            startIcon={<></>}
                        >
                            Tạo Gói Mới
                        </CreateButton>
                    </Box>

                    {/* Bảng */}
                    <TableWrapper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                                        <TableCell><strong>Tên Gói</strong></TableCell>
                                        <TableCell><strong>Loại Gói</strong></TableCell>
                                        <TableCell><strong>Giá</strong></TableCell>
                                        <TableCell><strong>Thời Hạn</strong></TableCell>
                                        <TableCell><strong>Số Pin</strong></TableCell>
                                        <TableCell><strong>Thông Tin Gói</strong></TableCell>
                                        <TableCell><strong>Trạng Thái</strong></TableCell>
                                        <TableCell align="center"><strong>Thao Tác</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedPlans.map((plan) => (
                                        <TableRow
                                            key={plan.id}
                                            hover
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "#f0fdf4",
                                                    cursor: "pointer",
                                                },
                                                transition: "all 0.2s",
                                            }}
                                            onClick={() => setViewingPlan(plan)}
                                        >
                                            {/* Tên gói */}
                                            <TableCell>
                                                <Typography fontWeight={600} color="#1e293b">
                                                    {plan.name}
                                                </Typography>
                                            </TableCell>

                                            {/* Loại gói */}
                                            <TableCell>{getPlanTypeLabel(plan.planType)}</TableCell>

                                            {/* Giá */}
                                            <TableCell>
                                                <Typography fontWeight={700} color="#dc2626">
                                                    {formatPrice(plan.price)}
                                                </Typography>
                                            </TableCell>

                                            {/* Thời hạn */}
                                            <TableCell>
                                                <Chip
                                                    label={`${plan.durationDays} ngày`}
                                                    variant="outlined"
                                                    color="info"
                                                    size="small"
                                                />
                                            </TableCell>

                                            {/* Số pin tối đa */}
                                            <TableCell>
                                                <Chip label={`${plan.maxBatteries} pin`} color="default" />
                                            </TableCell>

                                            {/* Thông tin gói (baseMileage / baseEnergy) */}
                                            <TableCell>
                                                {plan.planType === "DISTANCE" && plan.baseMileage !== null && (
                                                    <Typography variant="body2" color="primary">
                                                        {plan.baseMileage.toLocaleString()} km
                                                    </Typography>
                                                )}
                                                {plan.planType === "ENERGY" && plan.baseEnergy !== null && (
                                                    <Typography variant="body2" color="success.main">
                                                        {plan.baseEnergy} kWh
                                                    </Typography>
                                                )}
                                                {plan.planType === "UNLIMITED" && (
                                                    <Chip label="Vô hạn" color="secondary" size="small" />
                                                )}
                                            </TableCell>

                                            {/* Trạng thái */}
                                            <TableCell>
                                                <Chip
                                                    label={plan.status === "ACTIVE" ? "Hoạt động" : "Dừng"}
                                                    color={plan.status === "ACTIVE" ? "success" : "default"}
                                                    size="small"
                                                />
                                            </TableCell>

                                            {/* Thao tác */}
                                            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                                <EditButton
                                                    size="small"
                                                    startIcon={<EditIcon />}
                                                    onClick={() => setEditingPlan(plan)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Sửa
                                                </EditButton>
                                                <DeleteButton
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDelete(plan.id)}
                                                >
                                                    Xóa
                                                </DeleteButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TableWrapper>

                    {/* Phân trang */}
                    <Box mt={3}>
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={plans.length}
                            itemsPerPage={itemsPerPage}
                        />
                    </Box>
                </Box>
            </ListCard>

            {/* Dialog Chi Tiết Gói */}
            <Dialog open={!!viewingPlan} onClose={() => setViewingPlan(null)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: "#1e40af", color: "white", fontWeight: 600 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Chi Tiết Gói: {viewingPlan?.name}
                        <IconButton onClick={() => setViewingPlan(null)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {viewingPlan && (
                        <Box sx={{ py: 2 }}>
                            <Typography><strong>ID:</strong> {viewingPlan.id}</Typography>
                            <Typography><strong>Tên gói:</strong> {viewingPlan.name}</Typography>
                            <Typography><strong>Giá:</strong> {formatPrice(viewingPlan.price)}</Typography>
                            <Typography><strong>Thời hạn:</strong> {viewingPlan.durationDays} ngày</Typography>
                            <Typography><strong>Số pin tối đa:</strong> {viewingPlan.maxBatteries}</Typography>
                            <Typography><strong>Loại gói:</strong> {getPlanTypeLabel(viewingPlan.planType)}</Typography>

                            {viewingPlan.planType === "DISTANCE" && viewingPlan.baseMileage && (
                                <Typography color="primary">
                                    <strong>Quãng đường miễn phí:</strong> {viewingPlan.baseMileage.toLocaleString()} km
                                </Typography>
                            )}

                            {viewingPlan.planType === "ENERGY" && viewingPlan.baseEnergy && (
                                <Typography color="success.main">
                                    <strong>Năng lượng miễn phí:</strong> {viewingPlan.baseEnergy} kWh
                                </Typography>
                            )}

                            <Typography>
                                <strong>Trạng thái:</strong>{" "}
                                <Chip
                                    label={viewingPlan.status === "ACTIVE" ? "Đang hoạt động" : "Dừng"}
                                    color={viewingPlan.status === "ACTIVE" ? "success" : "default"}
                                    size="small"
                                />
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog Sửa Gói */}
            <Dialog open={!!editingPlan} onClose={() => setEditingPlan(null)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "#0891b2", color: "white" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Cập Nhật Gói: {editingPlan?.name}
                        <IconButton onClick={() => setEditingPlan(null)} sx={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {editingPlan && (
                        <SubscriptionPlanUpdateForm
                            plan={editingPlan}
                            onSuccess={() => {
                                setEditingPlan(null);
                                dispatch(fetchSubscriptionPlans());
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </PageContainer>
    );
};

export default SubscriptionPlanList;