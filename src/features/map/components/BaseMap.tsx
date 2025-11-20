import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // 1. Import 'useMap'
import {
    Paper,
    CircularProgress,
    Typography,
    Box,
    TextField,
    Alert // 2. Thêm 'Alert' để thông báo
} from '@mui/material';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';
import customStationIconUrl from '../../../asset/images/charging-station.png';
import StationThunks from '../stationThunks';

// --- (Phần Icon và Map Center giữ nguyên) ---
const mapCenter: L.LatLngExpression = [10.8012, 106.7046];
const mapZoom = 15;

const customStationIcon = L.icon({
    iconUrl: customStationIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// 3. TẠO COMPONENT CON ĐỂ ĐIỀU KHIỂN MAP
// Component này phải nằm trong <MapContainer> để 'useMap()' hoạt động
// Nó sẽ nhận danh sách trạm đã lọc và tự động zoom
function MapController({ stations, searchTerm }: { stations: any[], searchTerm: string }) {
    const map = useMap(); // Lấy 'thể hiện' của bản đồ

    useEffect(() => {
        // Chỉ zoom khi người dùng đang tìm kiếm (searchTerm có chữ)
        // và CÓ kết quả (stations.length > 0)
        if (searchTerm && stations.length > 0) {

            // Nếu chỉ có 1 kết quả, "bay" (flyTo) đến đó
            if (stations.length === 1) {
                map.flyTo([stations[0].latitude, stations[0].longitude], 17, { // 17 là zoom level chi tiết
                    animate: true,
                    duration: 1.5,
                });
            }

            // Nếu có nhiều kết quả, "bay" (flyToBounds) để thấy tất cả
            if (stations.length > 1) {
                // Tạo một 'bounds' (khung) chứa tất cả các trạm
                const bounds = L.latLngBounds(
                    stations.map(s => [s.latitude, s.longitude])
                );

                // Ra lệnh cho bản đồ bay và zoom vừa khít cái khung đó
                map.flyToBounds(bounds.pad(0.1), { // pad(0.1) là thêm 10% lề
                    animate: true,
                    duration: 1.5,
                });
            }
        }
    }, [stations, searchTerm, map]); // Chạy lại khi 3 giá trị này thay đổi

    return null; // Component này không render gì cả
}


// --- COMPONENT CHÍNH CỦA BẠN ---
export function BaseMap() {
    const dispatch = useDispatch<AppDispatch>();
    const { stations, isLoading, error } = useSelector((state: RootState) => state.stationMap);

    const [searchTerm, setSearchTerm] = useState('');

    // (Giữ nguyên) 'filteredStations' được tính toán
    const filteredStations = useMemo(() => {
        if (!searchTerm) {
            return stations;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        return stations.filter(station =>
            station.location.toLowerCase().includes(lowerCaseSearch)
        );
    }, [stations, searchTerm]);

    // Gọi API (Giữ nguyên)
    useEffect(() => {
        dispatch(StationThunks.fetchStations());
    }, [dispatch]);

    // UI Loading/Error (Giữ nguyên)
    if (isLoading) {
        return (
            <Paper elevation={3} sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải dữ liệu trạm...</Typography>
            </Paper>
        );
    }
    if (error) {
        return (
            <Paper elevation={3} sx={{ height: '600px', p: 2 }}>
                <Typography color="error">Lỗi: {error}</Typography>
            </Paper>
        );
    }

    // Render bản đồ
    return (
        <Box>
            {/* Ô TÌM KIẾM */}
            {/* Ô TÌM KIẾM */}
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: '#6B7A42', // <-- MÀU OLIVE CỦA BẠN
                }}
            >
                <TextField
                    fullWidth
                    label="Tìm kiếm theo địa điểm (ví dụ: bình thạnh)"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                    // Style cho label (chữ "Tìm kiếm...")
                    InputLabelProps={{
                        sx: {
                            color: '#e0e0e0', // Màu label xám nhạt
                            '&.Mui-focused': {
                                color: 'white', // Màu label khi focus
                            },
                        }
                    }}
                    // Style cho input (chữ gõ vào và viền)
                    InputProps={{
                        sx: {
                            color: 'white', // Màu chữ người dùng gõ
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.5)', // Viền mờ
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Viền khi hover
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Viền khi focus
                            },
                        }
                    }}
                />

                {/* 4. HIỂN THỊ THÔNG BÁO KẾT QUẢ */}
                {/* (Phần Alert giữ nguyên) */}
                {searchTerm && filteredStations.length === 0 && (
                    <Alert
                        severity="warning"
                        sx={{ mt: 2, backgroundColor: '#fffbe6', color: '#664d03' }} // Tùy chỉnh màu Alert
                    >
                        Không tìm thấy trạm nào khớp với từ khóa của bạn.
                    </Alert>
                )}
                {searchTerm && filteredStations.length > 0 && (
                    <Alert
                        severity="success"
                        sx={{ mt: 2, backgroundColor: '#e6f7ff', color: '#0056b3' }} // Tùy chỉnh màu Alert
                    >
                        Tìm thấy {filteredStations.length} trạm.
                    </Alert>
                )}
            </Paper>

            {/* BẢN ĐỒ */}
            <Paper
                elevation={3}
                sx={{
                    height: '600px',
                    width: '100%'
                }}
            >
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Dùng 'filteredStations' để render marker */}
                    {filteredStations.map(station => (
                        <Marker
                            key={station.id}
                            position={[station.latitude, station.longitude]}
                            icon={customStationIcon}
                        >
                            <Popup>
                                <b>{station.name}</b>
                                <br />
                                {station.location}
                            </Popup>
                        </Marker>
                    ))}

                    {/* 5. ĐẶT COMPONENT ĐIỀU KHIỂN VÀO ĐÂY */}
                    <MapController stations={filteredStations} searchTerm={searchTerm} />

                </MapContainer>
            </Paper>
        </Box>
    );
}