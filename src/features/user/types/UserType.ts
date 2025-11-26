export interface User {
    id: number;
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
    role: "ADMIN" | "STAFF" | "USER";
}

export interface CreateUserPayload {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserPayload {
    phone?: string;
    address?: string;
    role?: "ADMIN" | "STAFF" | "USER";
}
export interface UserReputation {
    currentReputation: number;
    maxReputation: number;
    cancelledCount: number;
    expiredCount: number;
    usedCount: number;
    canReserve: boolean;
    message: string;
}

// Cập nhật interface User nếu cần hiển thị reputation trong danh sách
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role: "ADMIN" | "STAFF" | "USER";
    // Thêm reputation vào user nếu backend trả về cùng lúc
    reputation?: UserReputation;
}