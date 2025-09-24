import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptionPlans } from "../SubcriptionPlanThunks";
import {
    CircularProgress,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubscriptionPlanUpdateForm from "../components/SubscriptionPlanUpdateForm";

const SubscriptionPlanPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { plans, loading, error } = useAppSelector(state => state.subscriptionPlan);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedPlan = selectedId !== null ? plans.find(p => p.id === selectedId) : null;

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

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
                                <TableCell>Duration</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map(plan => (
                                <TableRow
                                    key={plan.id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setSelectedId(plan.id)}
                                >
                                    <TableCell>{plan.id}</TableCell>
                                    <TableCell>{plan.name}</TableCell>
                                    <TableCell>{plan.price}</TableCell>
                                    <TableCell>{plan.durationDays}</TableCell>
                                    <TableCell>{plan.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Popup Update/Delete */}
            <Dialog
                open={selectedPlan !== null}
                onClose={() => setSelectedId(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Subscription Plan Detail
                    <IconButton
                        aria-label="close"
                        onClick={() => setSelectedId(null)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedPlan ? (
                        <SubscriptionPlanUpdateForm
                            plan={selectedPlan}
                            onClose={() => setSelectedId(null)}
                        />
                    ) : (
                        <div>No data</div>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default SubscriptionPlanPage;
