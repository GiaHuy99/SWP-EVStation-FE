import { useAppDispatch } from '../../../app/Hooks'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'

// ✨ 1. Import các styled components từ file style dùng chung của bạn
import {
    PageContainer,
    FormCard,
    FormBox,
    FullWidthBox,
    StyledTextField,
    Title,
} from '../styles/CreateBatteryForm' // <-- Thay đổi đường dẫn này cho đúng

// ✨ 2. Import các types và thunks cần thiết
import { CreateBatteryTypePayload } from '../types/BatteryTypes' // <-- Sửa lại tên file nếu cần
import { createBatteryType } from '../BatteryThunk' // <-- Sửa lại tên file nếu cần
import { showNotification } from '../../../shared/utils/notification/notificationSlice'

// --- Component chính ---

const CreateBatteryTypeForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState<CreateBatteryTypePayload>({
        name: '',
        type: '',
        designCapacity: 0.0,
        description: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        const processedValue = type === 'number' ? parseFloat(value) || 0 : value
        setForm({ ...form, [name]: processedValue })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(createBatteryType(form))
            .unwrap()
            .then(() => {
                dispatch(
                    showNotification({
                        message: 'Battery type created successfully!',
                        type: 'success',
                    }),
                )
                navigate('/battery-types') // Điều hướng đến trang danh sách loại pin
            })
            .catch((error) => {
                dispatch(
                    showNotification({
                        message: error || 'Failed to create battery type.',
                        type: 'error',
                    }),
                )
            })
    }

    return (
        // ✨ 3. Áp dụng các styled components đã import
        <PageContainer>
            <FormCard>
                <Title variant="h5" gutterBottom>
                    Create New Battery Type
                </Title>
                <form onSubmit={handleSubmit}>
                    {/* ✨ 4. Sử dụng FormBox để thay thế Grid container cho layout gọn hơn */}
                    <FormBox>
                        {/* Các trường input nằm trong FormBox sẽ tự động chia cột */}
                        <StyledTextField
                            label="Model Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <StyledTextField
                            label="Vehicle Type (e.g., Scooter)"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        {/* ✨ 5. Sử dụng FullWidthBox cho các phần tử chiếm toàn bộ chiều rộng */}
                        <FullWidthBox>
                            <StyledTextField
                                type="number"
                                label="Design Capacity (Ah)"
                                name="designCapacity"
                                value={form.designCapacity}
                                onChange={handleChange}
                                required
                                fullWidth
                                inputProps={{ step: '0.1', min: '0' }}
                            />
                        </FullWidthBox>
                        <FullWidthBox>
                            <StyledTextField
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </FullWidthBox>
                        <FullWidthBox>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ mt: 2, py: 1.5, borderRadius: '8px', fontWeight: 'bold' }}
                            >
                                Save Battery Type
                            </Button>
                        </FullWidthBox>
                    </FormBox>
                </form>
            </FormCard>
        </PageContainer>
    )
}

export default CreateBatteryTypeForm