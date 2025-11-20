import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Paper, CircularProgress, Typography, Box, TextField, Alert, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';
import customStationIconUrl from '../../../asset/images/charging-station.png';
import StationThunks from '../stationThunks';

// Fix icon lỗi mặc định của Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customStationIcon = L.icon({
    iconUrl: customStationIconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [40, 40],
});

const mapCenter: L.LatLngExpression = [10.8012, 106.7046];
const mapZoom = 13;

// Component điều khiển bản đồ (zoom tự động khi tìm kiếm)
function MapController({ stations, searchTerm }: { stations: any[]; searchTerm: string }) {
    const map = useMap();

    useEffect(() => {
        if (!searchTerm || stations.length === 0) return;

        if (stations.length === 1) {
            map.flyTo([stations[0].latitude, stations[0].longitude], 17, {
                animate: true,
                duration: 1.8,
            });
        } else {
            const bounds = L.latLngBounds(stations.map(s => [s.latitude, s.longitude]));
            map.flyToBounds(bounds.pad(0.2), { animate: true, duration: 1.5 });
        }
    }, [stations, searchTerm, map]);

    return null;
}

export function BaseMap() {
    const dispatch = useDispatch<AppDispatch>();
    const { stations, isLoading, error } = useSelector((state: RootState) => state.stationMap);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStations = useMemo(() => {
        if (!searchTerm.trim()) return stations;
        const term = searchTerm.toLowerCase();
        return stations.filter(station =>
            station.location.toLowerCase().includes(term) ||
            station.name.toLowerCase().includes(term)
        );
    }, [stations, searchTerm]);

    useEffect(() => {
        dispatch(StationThunks.fetchStations());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Paper elevation={6} sx={{ height: 600, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <Box textAlign="center">
                    <CircularProgress size={60} thickness={5} color="success" />
                    <Typography variant="h6" sx={{ mt: 3, fontWeight: 600, color: '#22c55e' }}>
                        Đang tải bản đồ trạm sạc...
                    </Typography>
                </Box>
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper elevation={6} sx={{ height: 600, borderRadius: 4, p: 4, background: '#fff5f5' }}>
                <Alert severity="error" sx={{ fontSize: '1.1rem' }}>
                    Không thể tải dữ liệu trạm sạc: {error}
                </Alert>
            </Paper>
        );
    }

    return (
        <Box>
            {/* HEADER + TÌM KIẾM SIÊU ĐẸP */}
            <Paper
                elevation={8}
                sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 3,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #22c55e 100%)',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)',
                }}
            >
                <Typography variant="h4" fontWeight={800} textAlign="center" sx={{ mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    Trạm Sạc Pin VinSwap
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Nhập quận, phường, tên trạm... (VD: Bình Thạnh, Gò Vấp)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="filled"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white', fontSize: 28 }} />
                            </InputAdornment>
                        ),
                        sx: {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: 3,
                            '& .MuiFilledInput-input': {
                                color: 'white',
                                fontSize: '1.1rem',
                                py: 2,
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        },
                    }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                />

                {/* THÔNG BÁO KẾT QUẢ TÌM KIẾM */}
                {searchTerm && (
                    <Box mt={2}>
                        {filteredStations.length === 0 ? (
                            <Alert severity="warning" sx={{ backgroundColor: '#fff3cd', color: '#856404', fontWeight: 600 }}>
                                Không tìm thấy trạm nào phù hợp với "<strong>{searchTerm}</strong>"
                            </Alert>
                        ) : (
                            <Alert severity="success" sx={{ backgroundColor: '#d4edda', color: '#155724', fontWeight: 600 }}>
                                Tìm thấy <strong>{filteredStations.length}</strong> trạm sạc
                            </Alert>
                        )}
                    </Box>
                )}
            </Paper>

            {/* BẢN ĐỒ CHỦ ĐẠO */}
            <Paper elevation={12} sx={{ height: { xs: 500, md: 650 }, borderRadius: 4, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
                <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {filteredStations.map((station) => (
                        <Marker key={station.id} position={[station.latitude, station.longitude]} icon={customStationIcon}>
                            <Popup>
                                <Box sx={{ minWidth: 200 }}>
                                    <Typography variant="h6" fontWeight="bold" color="#22c55e">
                                        {station.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                        {station.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                                        Sức chứa: <span style={{ color: '#22c55e' }}>{station.capacity} pin</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', color: station.status === 'ACTIVE' ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
                                        ● {station.status === 'ACTIVE' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                                    </Typography>
                                </Box>
                            </Popup>
                        </Marker>
                    ))}

                    <MapController stations={filteredStations} searchTerm={searchTerm} />
                </MapContainer>
            </Paper>

            {/* FOOTER NHỎ */}
            <Typography variant="body2" align="center" sx={{ mt: 3, color: '#666', fontStyle: 'italic' }}>
                Tìm kiếm và di chuyển đến trạm sạc nhanh nhất với VinSwap
            </Typography>
        </Box>
    );
}