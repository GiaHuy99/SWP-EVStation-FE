import React, { useEffect, useState } from "react";
import {
    CircularProgress,
    Alert,
    Typography,
    Button,
    // ⚡️ Import các component cho Dropdown
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    SelectChangeEvent,
    TextField // ⚡️ Dùng TextField chuẩn cho % Pin
} from "@mui/material";
// (Bỏ SearchIcon vì không cần nữa)

// 1. ⚡️ Import hooks (đường dẫn giả định)
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
// 2. ⚡️ Import thunk/action (đã cập nhật)
import {
    swapBattery,
    getAllVehicles, // Thunk mới
    getAllStations  // Thunk mới
} from "../SwapThunks"; // Giả định đường dẫn
import {
    clearSwapResult
    // ⛔️ Đã Bỏ: clearBatteries
} from "../SwapSlice"; // Giả định đường dẫn

// 3. ⚡️ Import types (đã cập nhật)
import {
    SwapBatteryPayload,
    VehicleDetail,
    Battery,
    StationDetail
} from "../types/SwapBatteryType";

// 4. ⚡️ Import style (giả định)
import { PageContainer, FormCard, Title, FormBox, FullWidthBox } from "../Style/Styles";
import {RootState} from "../../../app/Store";

// 5. ⚡️ Lấy RootState (Cần thiết cho TypeScript)
// (Bạn cần import RootState từ file store của mình)
// import { RootState } from '../../../app/Store';


const SwapBatteryForm: React.FC = () => {
    const dispatch = useAppDispatch();

    // 6. ⚡️ Lấy State từ Redux (đã cập nhật)
    const {
        swapLoading: loading,
        swapResult: result,
        swapError: error,

        // Danh sách xe (đã bao gồm pin)
        vehicles,
        vehiclesLoading,
        vehiclesError,

        // Danh sách trạm
        stations,
        stationsLoading,
        stationsError

        // ⛔️ Đã Bỏ: 'batteries' state
    } = useAppSelector((state: RootState) => state.swapBattery); // ⚡️ Sửa (state: RootState)

    // 7. ⚡️ State cho Form (Lưu ID đã chọn)
    const [form, setForm] = useState({
        vehicleId: "",       // Lưu ID xe (ví dụ: 5)
        batterySerialId: "", // Lưu ID pin (ví dụ: 11)
        stationId: "",       // Lưu ID trạm (ví dụ: 1)
        endPercent: "",      // Lưu % pin
    });

    // 8. ⚡️ State Cục bộ (MỚI): Lưu danh sách pin của xe đã chọn
    const [selectedVehicleBatteries, setSelectedVehicleBatteries] = useState<Battery[]>([]);

    // 9. ⚡️ State cho Lỗi Cục bộ (thay cho alert)
    const [localError, setLocalError] = useState<string | null>(null);

    // 10. ⚡️ useEffect: Tải dữ liệu ban đầu (Tải Xe và Trạm)
    useEffect(() => {
        dispatch(getAllVehicles());
        dispatch(getAllStations());
    }, [dispatch]);

    // 11. useEffect để dọn dẹp
    useEffect(() => {
        return () => {
            dispatch(clearSwapResult());
        };
    }, [dispatch]);

    // 12. ⚡️ Hàm xử lý thay đổi Dropdown & Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        // Xóa lỗi local khi người dùng bắt đầu nhập lại
        if (localError) setLocalError(null);

        // Cập nhật state của form
        setForm((prev) => ({ ...prev, [name as string]: value as string }));

        // ----------------------------------------------------
        // ⚡️ LOGIC MỚI: Xử lý khi chọn XE
        // ----------------------------------------------------
        if (name === 'vehicleId') {
            // Tìm xe đầy đủ trong danh sách 'vehicles'
            const selectedVehicle = vehicles.find(v => v.id === Number(value));

            if (selectedVehicle) {
                // Lưu lại danh sách pin của xe đó
                setSelectedVehicleBatteries(selectedVehicle.batteries);
            } else {
                // Nếu không tìm thấy (ví dụ: chọn "None"), xóa danh sách pin
                setSelectedVehicleBatteries([]);
            }
            // Reset pin đã chọn
            setForm(prev => ({ ...prev, batterySerialId: "" }));
        }
        // ----------------------------------------------------
    };

    // 13. Hàm xử lý khi nhấn nút submit
    const handleSubmitSwap = () => {
        setLocalError(null); // Xóa lỗi cũ
        const { vehicleId, batterySerialId, stationId, endPercent } = form;

        if (!vehicleId || !batterySerialId || !stationId || !endPercent) {
            setLocalError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Kiểm tra % pin (API của bạn nhận 0.8, nhưng component cũ gửi 80?)
        // Tạm thời gửi 80 (nếu bạn cần 0.8, hãy chia 100)
        const percentValue = Number(endPercent);
        if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
            setLocalError("Phần trăm pin phải là số từ 0 đến 100.");
            return;
        }

        const payload: SwapBatteryPayload = {
            vehicleId: Number(vehicleId),
            batterySerialId: Number(batterySerialId),
            stationId: Number(stationId),
            endPercent: percentValue, // ⚡️ Gửi 80
            // endPercent: percentValue / 100, // ⚡️ Gửi 0.8
        };

        dispatch(swapBattery(payload));
    };

    // 14. Hàm render (JSX)
    return (
        <PageContainer>
            <FormCard>
                <Title variant="h5">Thực hiện Đổi Pin (Swap)</Title>

                <FormBox>
                    {/* ----------------------------------- */}
                    {/* ⚡️ 1. Dropdown CHỌN XE             */}
                    {/* ----------------------------------- */}
                    <FormControl
                        fullWidth
                        disabled={vehiclesLoading}
                        error={!!vehiclesError}
                    >
                        <InputLabel id="vehicle-select-label">Chọn Xe</InputLabel>
                        <Select
                            labelId="vehicle-select-label"
                            name="vehicleId"
                            value={form.vehicleId}
                            label="Chọn Xe"
                            onChange={handleChange}
                        >
                            {vehiclesLoading && <MenuItem disabled value=""><em>Đang tải danh sách xe...</em></MenuItem>}
                            {vehiclesError && <MenuItem disabled value=""><em>Lỗi tải danh sách xe</em></MenuItem>}
                            {!vehiclesLoading && vehicles.map((vehicle: VehicleDetail) => (
                                <MenuItem key={vehicle.id} value={vehicle.id}>
                                    {vehicle.vehicleName} (Gói: {vehicle.currentPlan})
                                </MenuItem>
                            ))}
                        </Select>
                        {vehiclesError && <FormHelperText>{vehiclesError}</FormHelperText>}
                    </FormControl>

                    {/* ----------------------------------- */}
                    {/* ⚡️ 2. Dropdown CHỌN PIN            */}
                    {/* ----------------------------------- */}
                    <FormControl
                        fullWidth
                        // ⚡️ Tắt khi chưa chọn xe
                        disabled={!form.vehicleId || selectedVehicleBatteries.length === 0}
                    >
                        <InputLabel id="battery-select-label">Chọn Pin Cần Đổi</InputLabel>
                        <Select
                            labelId="battery-select-label"
                            name="batterySerialId"
                            value={form.batterySerialId}
                            label="Chọn Pin Cần Đổi"
                            onChange={handleChange}
                        >
                            {/* ⚡️ Hiển thị pin từ state cục bộ 'selectedVehicleBatteries' */}
                            {selectedVehicleBatteries.map((battery: Battery) => (
                                <MenuItem key={battery.id} value={battery.id}>
                                    {battery.serialNumber}
                                </MenuItem>
                            ))}
                        </Select>
                        {selectedVehicleBatteries.length === 0 && form.vehicleId && <FormHelperText>Xe này không có pin nào.</FormHelperText>}
                    </FormControl>

                    {/* ----------------------------------- */}
                    {/* ⚡️ 3. Dropdown CHỌN TRẠM           */}
                    {/* ----------------------------------- */}
                    <FormControl
                        fullWidth
                        disabled={stationsLoading}
                        error={!!stationsError}
                    >
                        <InputLabel id="station-select-label">Chọn Trạm Swap</InputLabel>
                        <Select
                            labelId="station-select-label"
                            name="stationId"
                            value={form.stationId}
                            label="Chọn Trạm Swap"
                            onChange={handleChange}
                        >
                            {stationsLoading && <MenuItem disabled value=""><em>Đang tải danh sách trạm...</em></MenuItem>}
                            {stationsError && <MenuItem disabled value=""><em>Lỗi tải danh sách trạm</em></MenuItem>}
                            {!stationsLoading && stations.map((station: StationDetail) => (
                                <MenuItem key={station.id} value={station.id}>
                                    {station.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {stationsError && <FormHelperText>{stationsError}</FormHelperText>}
                    </FormControl>

                    {/* ----------------------------------- */}
                    {/* ⚡️ 4. Input % PIN                  */}
                    {/* ----------------------------------- */}
                    <TextField
                        label="Phần trăm pin cuối (%)"
                        name="endPercent"
                        value={form.endPercent}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Nhập % pin (ví dụ: 80)"
                        // Chỉ bật khi đã chọn xong 3 mục trên
                        disabled={!form.vehicleId || !form.batterySerialId || !form.stationId}
                        // ⚡️ Đảm bảo chỉ nhập số
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            type: 'number'
                        }}
                    />
                </FormBox>

                {/* ⚡️ Hiển thị lỗi local (thay cho alert) */}
                {localError && <Alert severity="warning" sx={{ mt: 3, borderRadius: '12px' }}>
                    {localError}
                </Alert>}


                {/* Nút Submit */}
                <FullWidthBox sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmitSwap}
                        // ⚡️ Cập nhật điều kiện disabled
                        disabled={loading || !form.vehicleId || !form.batterySerialId || !form.stationId || !form.endPercent}
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

                {/* Hiển thị kết quả (Không đổi) */}
                {result && (
                    <Alert severity="success" sx={{ mt: 3, borderRadius: '12px', backgroundColor: '#F0FDF4' }}>
                        <Typography variant="body1" fontWeight={600} mb={1.5}>{result.message}</Typography>
                        <Typography><strong>Pin cũ:</strong> {result.oldSerialNumber}</Typography>
                        <Typography><strong>Pin mới:</strong> {result.newSerialNumber}</Typography>
                        <Typography><strong>Chi phí:</strong> {result.cost.toLocaleString()} VND</Typography>
                        <Typography><strong>Trạng thái pin mới:</strong> {result.status}</Typography>
                    </Alert>
                )}

                {/* Hiển thị lỗi (Không đổi) */}
                {error && <Alert severity="error" sx={{ mt: 3, borderRadius: '12px' }}>
                    {error}
                </Alert>}
            </FormCard>
        </PageContainer>
    );
};

export default SwapBatteryForm;

