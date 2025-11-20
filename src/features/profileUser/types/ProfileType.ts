// src/features/profile/types/ProfileType.ts
export interface UserProfile {
    username: string;
    email: string;
    phone: string | null;
    address: string | null;
}

export interface UpdateProfileRequest {
    phone?: string;
    address?: string;
}