import React from "react";
import CreateSubscriptionPlanForm from "../components/CreateSubscriptionPlanForm";
import { PageContainer, FormCard } from "../styles/SubscriptionPlanStyles";

const CreateSubscriptionPlanPage: React.FC = () => {
    return (
        <PageContainer>
            <FormCard>
                <h2>Create Subscription Plan</h2>
                <CreateSubscriptionPlanForm />
            </FormCard>
        </PageContainer>
    );
};

export default CreateSubscriptionPlanPage;
