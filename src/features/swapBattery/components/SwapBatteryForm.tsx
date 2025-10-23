import React, { useEffect, useState } from "react";
import {
    CircularProgress,
    Alert,
    Typography,
    Button,
    InputAdornment, // ⚡️ Thêm component này
    IconButton      // ⚡️ và component này
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // ⚡️ Thêm icon

// 1. Import hooks và actions từ Redux
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
// ⚡️ Import thunk và action mới
import { swapBattery, getVehicleDetail } from "../SwapThunks";
import { clearSwapResult, clearVehicleDetail } from "../SwapSlice";

// 2. Import type và các styled components
import { SwapBatteryPayload } from "../types/SwapBatteryType";
import { PageContainer, FormCard, Title, FormBox, StyledTextField, FullWidthBox } from "../Style/Styles";

const SwapBatteryForm: React.FC = () => {
    // 3. Kết nối với Redux store
    const dispatch = useAppDispatch();
    const {
        swapLoading: loading,
        swapResult: result,
        swapError: error,
        // ⚡️ Lấy thêm state cho vehicle detail
        vehicleDetail,
        vehicleLoading,
        vehicleError
    } = useAppSelector((state) => state.swapBattery);

    // 4. State để quản lý dữ liệu của form
    const [form, setForm] = useState({
        vehicleId: "",
        batterySerialId: "",
        stationId: "",
        endPercent: "",
    });

    // 5. useEffect để dọn dẹp kết quả cũ khi component bị unmount
    useEffect(() => {
        return () => {
            dispatch(clearSwapResult());
            dispatch(clearVehicleDetail()); // ⚡️ Dọn dẹp cả thông tin xe
        };
    }, [dispatch]);

    // 6. Hàm xử lý khi người dùng nhập liệu
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setForm((prev) => ({ ...prev, [name]: value }));

            // ⚡️ Nếu người dùng đang sửa ID xe, xóa thông tin xe cũ
            if (name === 'vehicleId' && (vehicleDetail || vehicleError)) {
                dispatch(clearVehicleDetail());
            }
        }
    };

    // ⚡️ 7. HÀM MỚI: Xử lý khi nhấn nút "Kiểm tra xe"
    const handleCheckVehicle = () => {
        if (form.vehicleId) {
            dispatch(getVehicleDetail(form.vehicleId));
        }
    };

    // 8. Hàm xử lý khi nhấn nút submit (tên cũ là handleSubmit)
    const handleSubmitSwap = () => {
        const { vehicleId, batterySerialId, stationId, endPercent } = form;

        if (!vehicleId || !batterySerialId || !stationId || !endPercent) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // ⚡️ Khuyến nghị: Kiểm tra xem vehicleId đã được xác thực chưa
        if (!vehicleDetail) {
            alert("Vui lòng nhấn nút 'Kiểm tra' bên cạnh ID Xe trước khi xác nhận.");
            return;
        }

        const payload: SwapBatteryPayload = {
            vehicleId: Number(vehicleId),
            batterySerialId: Number(batterySerialId),
            stationId: Number(stationId),
            endPercent: Number(endPercent),
        };

        dispatch(swapBattery(payload));
    };

    return (
        <PageContainer>
            <FormCard>
                <Title variant="h5">Thực hiện Đổi Pin (Swap)</Title>

                <FormBox>
                    {/* ⚡️ CẬP NHẬT TRƯỜNG "ID XE" */}
                    <StyledTextField
                        label="ID Xe"
                        name="vehicleId"
                        value={form.vehicleId}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nhập ID và nhấn nút tìm kiếm"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Kiểm tra xe"
                                        onClick={handleCheckVehicle}
                                        disabled={vehicleLoading}
                                        edge="end"
                                    >
                                        {vehicleLoading ? <CircularProgress size={20} /> : <SearchIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* ⚡️ HỘP HIỂN THỊ KẾT QUẢ KIỂM TRA XE */}
                    <FullWidthBox sx={{ gridColumn: '1 / -1', minHeight: '40px', mt: -1, mb: 1 }}>
                        {vehicleError && (
                            <Alert severity="warning" sx={{ borderRadius: '8px' }}>
                                {vehicleError} (ID: {form.vehicleId})
                            </Alert>
                        )}
                        {vehicleDetail && (
                            <Alert severity="info" sx={{ borderRadius: '8px', backgroundColor: '#EFF6FF' }}>
                                <Typography variant="body2" fontWeight={600}>
                                    Tên xe: {vehicleDetail.vehicleName}
                                </Typography>
                                <Typography variant="caption">
                                    Gói cước: {vehicleDetail.currentPlan}
                                </Typography>
                            </Alert>
                        )}
                    </FullWidthBox>

                    <StyledTextField
                        label="ID Pin Cũ"
                        name="batterySerialId"
                        value={form.batterySerialId}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nhập ID của pin cũ..."
                        // ⚡️ Chỉ cho phép nhập khi đã xác thực xe
                        disabled={!vehicleDetail}
                    />
                    <StyledTextField
                        label="ID Trạm"
                        name="stationId"
                        value={form.stationId}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nhập ID của trạm..."
                        disabled={!vehicleDetail}
                    />
                    <StyledTextField
                        label="Phần trăm pin cuối (%)"
                        name="endPercent"
                        value={form.endPercent}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nhập phần trăm pin cuối..."
                        disabled={!vehicleDetail}
                    />
                </FormBox>

                {/* Nút Submit */}
                <FullWidthBox sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmitSwap} // Đổi tên hàm
                        disabled={loading || !vehicleDetail} // ⚡️ Tắt nút nếu chưa xác thực xe
                        sx={{
                            px: 5, py: 1.5, borderRadius: "12px", textTransform: "uppercase", fontWeight: 700,
                            backgroundColor: "#22C55E", color: "#fff",
                            "&:hover": { backgroundColor: "#16A34A" },
                            "&.Mui-disabled": { backgroundColor: "#D1D5DB" },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Xác nhận Swap"}
                    </Button>
                </FullWidthBox>

                {/* Hiển thị kết quả thành công */}
                {result && (
                    <Alert severity="success" sx={{ mt: 3, borderRadius: '12px', backgroundColor: '#F0FDF4' }}>
                        <Typography variant="body1" fontWeight={600} mb={1.5}>{result.message}</Typography>
                        <Typography><strong>Pin cũ:</strong> {result.oldSerialNumber}</Typography>
                        <Typography><strong>Pin mới:</strong> {result.newSerialNumber}</Typography>
                        <Typography><strong>Chi phí:</strong> {result.cost.toLocaleString()} VND</Typography>
                        <Typography><strong>Trạng thái pin mới:</strong> {result.status}</Typography>
                    </Alert>
                )}

                {/* Hiển thị lỗi */}
                {error && <Alert severity="error" sx={{ mt: 3, borderRadius: '12px' }}>
                    {error}
                </Alert>}
            </FormCard>
        </PageContainer>
    );
};

export default SwapBatteryForm;