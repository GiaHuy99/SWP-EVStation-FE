import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getSubscriptionPlanById } from "../SubcriptionPlanThunks";
import {
    PageContainer,
    FormCard, // Wrap viền pastel
    PlanCard,
    Title,
    DetailItem,
    DetailLabel,
    DetailValue,
} from "../styles/SubscriptionPlanStyles";
import { CircularProgress, Alert } from "@mui/material";

interface SubscriptionPlanDetailFormProps {
    id: number;
}

const SubscriptionPlanDetailForm: React.FC<SubscriptionPlanDetailFormProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedPlan, loading, error } = useAppSelector(
        (state) => state.subscriptionPlan
    );

    useEffect(() => {
        if (id) {
            dispatch(getSubscriptionPlanById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedPlan) return <div>No data found</div>;

    return (
        <PageContainer>
            <FormCard sx={{ border: "1px solid #E8F5E8" }}> {/* Viền pastel */}
                <PlanCard> {/* Nội dung detail */}
                    <Title variant="h5">Plan Detail - {selectedPlan.name}</Title> {/* Đồng bộ title */}
                    <DetailItem>
                        <DetailLabel>Price:</DetailLabel>
                        <DetailValue>{selectedPlan.price}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Duration (days):</DetailLabel>
                        <DetailValue>{selectedPlan.durationDays}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Max Batteries:</DetailLabel>
                        <DetailValue>{selectedPlan.maxBatteries}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Base Mileage:</DetailLabel>
                        <DetailValue>{selectedPlan.baseMileage}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Status:</DetailLabel>
                        <DetailValue>{selectedPlan.status}</DetailValue>
                    </DetailItem>
                </PlanCard>
            </FormCard>
        </PageContainer>
    );
};

export default SubscriptionPlanDetailForm;