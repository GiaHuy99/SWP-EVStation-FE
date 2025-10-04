import React, { useEffect, useState } from "react";
import {
    Typography,
    CircularProgress,
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
import SubscriptionPlanDetail from "./SubscriptionPlanDetailForm";
import { SubscriptionPlan } from "../types/SubscriptionPlanType";

// Import DataGrid và types
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";

// Import styled
import {
    PageContainer,
    ListCard, // Wrap grid
    TableWrapper, // Overflow – adapt cho grid nếu cần
} from "../styles/SubscriptionPlanStyles";

// StyledDialogContent
import { styled } from "@mui/material/styles";
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

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xoá plan này?")) {
            dispatch(deletePlan(id));
        }
    };

    // Định nghĩa columns với GridColDef
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, sortable: true },
        { field: 'name', headerName: 'Name', width: 150, sortable: true },
        { field: 'price', headerName: 'Price', width: 120, type: 'number', sortable: true },
        { field: 'durationDays', headerName: 'Duration (days)', width: 150, type: 'number', sortable: true },
        { field: 'status', headerName: 'Status', width: 120, sortable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key="update"
                    icon={
                        <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            sx={{
                                backgroundColor: "transparent",
                                borderColor: "#22C55E",
                                textTransform: "uppercase",
                                borderRadius: "8px",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "rgba(34, 197, 94, 0.05)",
                                    borderColor: "#16A34A",
                                    transform: "translateY(-1px)",
                                },
                            }}
                        >
                            UPDATE
                        </Button>
                    }
                    label="Update"
                    onClick={() => setEditingPlan(params.row as SubscriptionPlan)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                        >
                            Delete
                        </Button>
                    }
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                    showInMenu={false}
                />,
            ],
        },
    ];

    // Function cho row class (tùy chọn)
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
    };

    return (
        <PageContainer> {/* Wrap background */}
            <ListCard sx={{ border: "1px solid #E8F5E8" }}> {/* Viền pastel */}
                <Typography variant="h4" align="center" gutterBottom>
                    Subscription Plans
                </Typography>

                {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
                {error && <Typography color="error" align="center">{error}</Typography>}

                {!loading && !error && plans.length > 0 && (
                    <TableWrapper> {/* Overflow auto – giữ nếu cần */}
                        <div style={{ height: 500, width: '100%' }}> {/* Height cho DataGrid */}
                            <DataGrid
                                rows={plans} // Toàn bộ list – tự chia pagination
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 }, // Bắt đầu trang 1, 10 items/trang
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25]} // User chọn size
                                onRowClick={(params) => setDetailId(params.row.id)} // Click row mở detail
                                getRowClassName={getRowClassName} // Custom styles nếu cần
                                disableRowSelectionOnClick // Không select khi click row
                                sx={{
                                    '& .MuiDataGrid-row:hover': {
                                        backgroundColor: "#E8F5E8", // Xanh pastel khi hover
                                        transition: "background-color 0.3s ease-in-out",
                                        transform: "scale(1.01)",
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                                    },
                                }}
                            />
                        </div>
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
                        Plan Detail
                        <IconButton
                            aria-label="close"
                            onClick={() => setDetailId(null)}
                            sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <StyledDialogContent>
                        {detailId && <SubscriptionPlanDetail id={detailId} />}
                    </StyledDialogContent>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default SubscriptionPlanList;