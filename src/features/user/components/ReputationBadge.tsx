import React from "react";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface ReputationBadgeProps {
    reputation: {
        currentReputation: number;
        maxReputation: number;
        cancelledCount: number;
        expiredCount: number;
        usedCount: number;
        canReserve: boolean;
        message: string;
    };
}

const ReputationBadge: React.FC<ReputationBadgeProps> = ({ reputation }) => {
    if (!reputation) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-5 text-center">
                <p className="text-gray-500">Đang tải điểm uy tín...</p>
            </div>
        );
    }
    const { currentReputation, maxReputation, cancelledCount, canReserve, message } = reputation;

    const percentage = (currentReputation / maxReputation) * 100;

    const getColor = () => {
        if (percentage >= 80) return "text-green-600 border-green-600 bg-green-50";
        if (percentage >= 50) return "text-yellow-600 border-yellow-600 bg-yellow-50";
        return "text-red-600 border-red-600 bg-red-50";
    };

    const getIcon = () => {
        if (percentage >= 80) return <CheckCircle2 className="w-5 h-5" />;
        if (percentage >= 50) return <AlertCircle className="w-5 h-5" />;
        return <XCircle className="w-5 h-5" />;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Điểm Uy Tín</h3>
                {getIcon()}
            </div>

            <div className="text-center mb-4">
                <div className={`text-4xl font-bold ${getColor()}`}>
                    {currentReputation} / {maxReputation}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                    {canReserve ? "Có thể đặt lịch" : "Tạm khóa đặt lịch"}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                        percentage >= 80 ? "bg-green-600" :
                            percentage >= 50 ? "bg-yellow-600" : "bg-red-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border-l-4 border-orange-500">
                <strong>Thông báo:</strong> {message}
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
                <div>Hủy lịch: {cancelledCount} lần</div>
                <div>Đã sử dụng: {reputation.usedCount} lịch</div>
                <div>Hết hạn: {reputation.expiredCount} lần</div>
            </div>
        </div>
    );
};

export default ReputationBadge;