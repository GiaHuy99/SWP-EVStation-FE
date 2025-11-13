import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { getBatteryById } from "../BatteryThunk";
 // Import đúng từ file styled chung
import { CircularProgress, Alert } from "@mui/material";

interface BatteryDetailProps {
    id: number;
}

const BatteryDetail: React.FC<BatteryDetailProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const { selectedBattery, loading, error } = useAppSelector(
        (state) => state.battery
    );

    useEffect(() => {
        if (id) {
            dispatch(getBatteryById(id));
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!selectedBattery) {
        return <div>Không có dữ liệu chi tiết cho battery này.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '20px',
                color: '#1a3681',
                fontSize: '1.5rem',
                fontWeight: 600
            }}>
                Chi tiết Pin
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '12px',
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontWeight: 600, color: '#666' }}>ID:</div>
                <div style={{ color: '#333' }}>{selectedBattery.id}</div>

                <div style={{ fontWeight: 600, color: '#666' }}>Name:</div>
                <div style={{ color: '#333' }}>{selectedBattery.name}</div>


                <div style={{ fontWeight: 600, color: '#666' }}>Ngày Tạo:</div>
                <div style={{ color: '#333' }}>{selectedBattery.createdAt}</div>

            </div>
        </div>
    );
};

export default BatteryDetail;