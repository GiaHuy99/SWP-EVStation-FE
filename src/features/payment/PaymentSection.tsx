// components/CommonPayment.tsx
import React, { useState } from 'react';
import axiosInstance from "../../shared/utils/AxiosInstance";
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';

interface CommonPaymentProps {
    invoiceId: number;
    amount: number;                    // Số tiền cần thanh toán (VND)
    description?: string;              // Mô tả ngắn: "Thanh toán gói GNL02", "Gia hạn thuê pin",...
    buttonText?: string;               // Text nút, mặc định "Thanh toán với VNPay"
    size?: 'sm' | 'md' | 'lg' | 'full'; // Kích thước nút
    variant?: 'default' | 'outline' | 'ghost';
    hideDetails?: boolean;             // Ẩn phần chi tiết số tiền, invoice (dùng khi chỉ cần nút)
    onBeforeRedirect?: () => void;     // Callback trước khi redirect
    onError?: (message: string) => void;
    onSuccessUrlCreated?: (url: string) => void; // Nếu muốn xử lý URL trước khi redirect
}

const CommonPayment: React.FC<CommonPaymentProps> = ({
                                                         invoiceId,
                                                         amount,
                                                         description = 'Thanh toán hóa đơn',
                                                         buttonText = 'Thanh toán với VNPay',
                                                         size = 'lg',
                                                         variant = 'default',
                                                         hideDetails = false,
                                                         onBeforeRedirect,
                                                         onError,
                                                         onSuccessUrlCreated,
                                                     }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.post('/payment/create-vnpay-url', // hoặc full URL
                { invoiceId },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const { success, paymentUrl, message } = response.data;

            if (success && paymentUrl) {
                onSuccessUrlCreated?.(paymentUrl);
                onBeforeRedirect?.();

                // Redirect đến VNPay
                window.location.href = paymentUrl;
                // Hoặc mở tab mới: window.open(paymentUrl, '_blank');
            } else {
                throw new Error(message || 'Không nhận được link thanh toán');
            }
        } catch (err: any) {
            console.error('Payment error:', err);
            const msg = err.response?.data?.message || err.message || 'Lỗi hệ thống thanh toán';
            onError?.(msg);
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    // Kích thước nút
    const sizeClasses = {
        sm: 'h-9 text-sm px-4',
        md: 'h-11 text-base px-6',
        lg: 'h-14 text-lg px-8',
        full: 'h-14 w-full text-lg',
    };

    const variantClasses = {
        default: 'bg-red-600 hover:bg-red-700 text-white shadow-lg',
        outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
        ghost: 'text-red-600 hover:bg-red-50',
    };

    if (hideDetails) {
        // Chỉ hiện nút (dùng trong table, card nhỏ...)
        return (
            <button
                onClick={handlePayment}
                disabled={loading}
                className={`flex items-center justify-center gap-2 font-medium rounded-lg transition ${sizeClasses[size]} ${variantClasses[variant]} disabled:opacity-70`}
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <CreditCard className="h-4 w-4" />
                )}
                {loading ? 'Đang xử lý...' : buttonText}
            </button>
        );
    }

    // Hiện đầy đủ thông tin + nút to (dùng sau khi tạo hóa đơn)
    return (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-amber-600" />
            </div>

            <h3 className="text-xl font-bold text-amber-900 mb-2">
                {description}
            </h3>

            <div className="my-6">
                <p className="text-gray-600 text-sm">Hóa đơn số</p>
                <p className="text-2xl font-bold">#{invoiceId}</p>
            </div>

            <div className="my-8">
                <p className="text-5xl font-extrabold text-red-600">
                    {amount.toLocaleString('vi-VN')} ₫
                </p>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`flex items-center justify-center gap-3 font-semibold rounded-lg transition ${sizeClasses.full} bg-red-600 hover:bg-red-700 text-white shadow-lg disabled:opacity-70`}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Đang chuyển đến VNPay...
                    </>
                ) : (
                    <>
                        <CreditCard className="h-6 w-6" />
                        {buttonText}
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 mt-4">
                Bạn sẽ được chuyển đến cổng thanh toán an toàn của VNPay
            </p>
        </div>
    );
};

export default CommonPayment;