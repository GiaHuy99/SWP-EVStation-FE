import React from "react";
import CreateSubscriptionPlanForm from "../components/CreateSubscriptionPlanForm";
import { PageContainer, FormCard } from "../../../styles/SubscriptionPlanStyles";

const CreateSubscriptionPlanPage: React.FC = () => {
    return (
        <PageContainer>
            <FormCard>
                <CreateSubscriptionPlanForm />
            </FormCard>
        </PageContainer>
    );
};

export default CreateSubscriptionPlanPage;
