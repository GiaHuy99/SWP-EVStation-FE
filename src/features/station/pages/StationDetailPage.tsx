import React from "react";
import { useParams } from "react-router-dom";
import StationDetail from "../components/StationDetailForm";

const StationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return <StationDetail id={Number(id)} />;
};

export default StationDetailPage;
