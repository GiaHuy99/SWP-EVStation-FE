import React, { useState } from "react";
import {
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
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubscriptionPlanDetail from "./SubscriptionPlanDetailForm";
import { SubscriptionPlan } from "../types/SubscriptionPlanType";

interface SubscriptionPlanListProps {
    plans: SubscriptionPlan[];
}

const SubscriptionPlanListForm: React.FC<SubscriptionPlanListProps> = ({ plans }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                        {plans.map((plan) => (
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
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog Detail */}
            <Dialog
                open={selectedId !== null}
                onClose={() => setSelectedId(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Plan Detail
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
                    {selectedId !== null ? (
                        <SubscriptionPlanDetail id={selectedId} />
                    ) : (
                        <div>No data</div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SubscriptionPlanListForm;
