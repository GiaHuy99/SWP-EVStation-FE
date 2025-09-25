// src/components/SubscriptionPlanList.tsx
import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptionPlans, deletePlan } from "../SubcriptionPlanThunks";
import SubscriptionPlanUpdateForm from "./SubscriptionPlanUpdateForm";
import SubscriptionPlanDetail from "./SubscriptionPlanDetailForm";
import { SubscriptionPlan } from "../types/SubscriptionPlanType";

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

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Subscription Plans
            </Typography>

            {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
            {error && <Typography color="error" align="center">{error}</Typography>}

            {!loading && !error && plans.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Duration (days)</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map(plan => (
                                <TableRow key={plan.id} hover sx={{ cursor: "pointer" }}>
                                    <TableCell onClick={() => setDetailId(plan.id)}>{plan.id}</TableCell>
                                    <TableCell onClick={() => setDetailId(plan.id)}>{plan.name}</TableCell>
                                    <TableCell onClick={() => setDetailId(plan.id)}>{plan.price}</TableCell>
                                    <TableCell onClick={() => setDetailId(plan.id)}>{plan.durationDays}</TableCell>
                                    <TableCell onClick={() => setDetailId(plan.id)}>{plan.status}</TableCell>

                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            onClick={() => setEditingPlan(plan)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(plan.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                <DialogContent dividers>
                    {editingPlan && (
                        <SubscriptionPlanUpdateForm
                            plan={editingPlan}
                            onClose={() => setEditingPlan(null)}
                        />
                    )}
                </DialogContent>
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
                <DialogContent dividers>
                    {detailId && <SubscriptionPlanDetail id={detailId} />}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default SubscriptionPlanList;
