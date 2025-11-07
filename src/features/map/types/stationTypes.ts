// Định nghĩa kiểu dữ liệu cho 1 station
export interface Station {
    id: number;
    name: string;
    location: string;
    status: string; // Bạn có thể dùng: 'ACTIVE' | 'INACTIVE'
    capacity: number;
    phone: string;
    latitude: number;
    longitude: number;
}