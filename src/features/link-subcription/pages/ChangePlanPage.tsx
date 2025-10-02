// src/features/subscription/pages/ChangePlanPage.tsx
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/Hooks";
import { fetchSubscriptionPlans } from "../ChangeSubscriptionThunks";
import ChangePlanForm from "../components/ChangePlanForm";

const ChangePlanPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    return <ChangePlanForm subscriptionId={1} />;
};

export default ChangePlanPage;
