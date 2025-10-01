import React from "react";
import UserSubscriptionsTable from "../components/UserSubscriptionsTable";

const UserSubscriptionsPage: React.FC = () => {
    return (
        <div style={{ padding: 20 }}>
            <h2>User Subscriptions Management</h2>
            <UserSubscriptionsTable />
        </div>
    );
};

export default UserSubscriptionsPage;
