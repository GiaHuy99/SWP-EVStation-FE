import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { fetchSubscriptions, runAutoRenew, clearMessage } from "../subscriptionSlice";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Snackbar,
} from "@mui/material";

const UserSubscriptionsTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading, error, autoRenewMessage } = useAppSelector(
        (state) => state.subcsription1
    );

    useEffect(() => {
        dispatch(fetchSubscriptions());
    }, [dispatch]);

    const handleAutoRenew = () => {
        dispatch(runAutoRenew()).then(() => {
            dispatch(fetchSubscriptions()); // reload sau khi renew
        });
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAutoRenew}
                style={{ marginBottom: 16 }}
            >
                 Renew
            </Button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Vehicle</TableCell>
                        <TableCell>Current Plan</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Next Plan</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((sub, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{sub.vehicle}</TableCell>
                            <TableCell>{sub.currentPlan}</TableCell>
                            <TableCell>{sub.startDate}</TableCell>
                            <TableCell>{sub.endDate}</TableCell>
                            <TableCell>{sub.nextPlan}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Snackbar
                open={!!autoRenewMessage}
                message={autoRenewMessage || ""}
                autoHideDuration={3000}
                onClose={() => dispatch(clearMessage())}
            />
        </div>
    );
};

export default UserSubscriptionsTable;
