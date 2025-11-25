// src/features/staff/staffService.ts
import axiosInstance from '../../../shared/utils/AxiosInstance';
import { Staff, CreateStaffRequest, UpdateStaffRequest } from '../types/StaffTypes';

const API_URL = '/admin/users/staff';

const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return { Authorization: `Bearer ${token}` };
};

export const fetchStaffList = async (): Promise<Staff[]> => {
    const response = await axiosInstance.get(API_URL, {
        headers: getAuthHeader(),
    });
    return response.data;
};


export const updateStaff = async (id: number, data: UpdateStaffRequest): Promise<Staff> => {
    const response = await axiosInstance.put(`${API_URL}/${id}/assign-station`, data, {
        headers: getAuthHeader(),
    });
    return response.data;

};