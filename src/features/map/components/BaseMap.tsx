import React from 'react';

// 1. Import các component của react-leaflet
import { MapContainer, TileLayer } from 'react-leaflet';

// 2. Import MUI (dùng Paper để bọc bản đồ cho đẹp)
import { Paper } from '@mui/material';

// 3. Import kiểu của Leaflet (để dùng cho tọa độ)
import L from 'leaflet';

// 4. Định nghĩa tọa độ trung tâm và mức zoom
const mapCenter: L.LatLngExpression = [10.7769, 106.6954]; // Ví dụ: TP. HCM
const mapZoom = 13;

export function BaseMap() {
    return (
        // 5. Dùng Paper của MUI để bọc và định nghĩa kích thước
        // BẮN BUỘC: Bản đồ phải có kích thước (ví dụ: height 600px)
        <Paper
            elevation={3}
            sx={{
                height: '600px',
                width: '100%'
            }}
        >
            {/* 6. Component MapContainer là "khung" của bản đồ */}
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%' }} // MapContainer cũng cần 100% kích thước
            >
                {/* 7. TileLayer là lớp hình ảnh bản đồ (gọi từ API của OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </Paper>
    );
}