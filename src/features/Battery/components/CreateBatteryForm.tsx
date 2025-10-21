import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Typography, Alert } from '@mui/material';

// ✨ 1. Import các styled components từ file style dùng chung của bạn
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from '../styles/batteryStyles'; // <-- Thay đổi đường dẫn này cho đúng

// ✨ 2. Import các types và thunks cần thiết cho `Battery`
import { CreateBatteryPayload } from '../types/Battery';
import { createBattery } from '../BatteryThunk';

// ✨ 3. Import thunks từ các feature khác để lấy dữ liệu cho dropdowns
import { fetchBatteryTypes } from '../../batteryType/BatteryThunkType';
import { fetchStations } from '../../station/StationThunks'; // <-- Giả định bạn có feature này

import { showNotification } from '../../../shared/utils/notification/notificationSlice';

// --- Component chính ---

const CreateBatteryForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // ✨ 4. Lấy danh sách `batteryTypes` và `stations` từ Redux store
    const { batteryTypes } = useAppSelector((state) => state.batteryType);
    const { stations } = useAppSelector((state) => state.station); // <-- Giả định state tên là `station`

    // ✨ 5. State của form giờ đây sử dụng `CreateBatteryPayload`
    const [form, setForm] = useState<CreateBatteryPayload>({
        serialNumber: '',
        batteryTypeId: 0, // Dùng 0 hoặc '' làm giá trị mặc định cho "chưa chọn"
        stationId: null,
    });

    // ✨ 6. useEffect để fetch dữ liệu cho các dropdown khi component mount
    useEffect(() => {
        // Chỉ fetch nếu trong store chưa có dữ liệu để tránh gọi API thừa
        if (batteryTypes.length === 0) {
            dispatch(fetchBatteryTypes());
        }
        if (stations.length === 0) {
            dispatch(fetchStations());
        }
    }, [dispatch, batteryTypes.length, stations.length]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const name = e.target.name as keyof CreateBatteryPayload;
        let value = e.target.value;

        // Xử lý giá trị cho các dropdown (select)
        if (name === 'batteryTypeId') {
            value = Number(value);
        }
        if (name === 'stationId') {
            value = value === '' ? null : Number(value);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate đơn giản
        if (form.batteryTypeId === 0) {
            dispatch(showNotification({ message: 'Please select a battery model.', type: 'warning' }));
            return;
        }

        dispatch(createBattery(form))
            .unwrap()
            .then(() => {
                dispatch(
                    showNotification({
                        message: 'Battery created successfully!',
                        type: 'success',
                    }),
                );
                navigate('/batteries'); // Điều hướng đến trang danh sách pin
            })
            .catch((error) => {
                dispatch(
                    showNotification({
                        message: error || 'Failed to create battery.',
                        type: 'error',
                    }),
                );
            });
    };

    return (
        <PageContainer>
            <FormCard>
                <Title variant="h5" gutterBottom>
                    Create New Battery
                </Title>

                {/* Gợi ý: Hiển thị cảnh báo nếu không có BatteryType để tạo */}
                {batteryTypes.length === 0 && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        No battery models found. Please create a battery model first.
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <FormBox>
                        {/* ✨ 7. Các trường input đã được cập nhật cho `Battery` */}
                        <StyledTextField
                            label="Serial Number"
                            name="serialNumber"
                            value={form.serialNumber}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <StyledTextField
                            select
                            label="Battery Model"
                            name="batteryTypeId"
                            value={form.batteryTypeId}
                            onChange={handleChange}
                            required
                            fullWidth
                            SelectProps={{
                                displayEmpty: true
                            }}
                        >
                            <MenuItem value={0} disabled>
                                <em>Select a model...</em>
                            </MenuItem>
                            {batteryTypes.map((bt) => (
                                <MenuItem key={bt.id} value={bt.id}>
                                    {bt.name}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                        <FullWidthBox>
                            <StyledTextField
                                select
                                label="Station (Optional)"
                                name="stationId"
                                value={form.stationId ?? ''} // Dùng '' cho giá trị null trong select
                                onChange={handleChange}
                                fullWidth
                                SelectProps={{
                                    displayEmpty: true
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stations.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </StyledTextField>
                        </FullWidthBox>

                        <FullWidthBox>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                disabled={batteryTypes.length === 0} // Không cho submit nếu chưa có model
                                sx={{ mt: 2, py: 1.5, borderRadius: '8px', fontWeight: 'bold' }}
                            >
                                Save Battery
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    );
};

export default CreateBatteryForm;