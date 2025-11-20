import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import { deleteUser, fetchUsers, updateUser } from "../UserThunks";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
    PageContainer,
    ListCard,
    Title,
    TableWrapper,
    EditButton,
    DeleteButton,
} from "../../../styles/AdminDashboardStyles";
import TablePagination from "../../../components/Pagination/TablePagination";
import { User, UpdateUserPayload } from "../types/UserType";

const UserListForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editFormData, setEditFormData] = useState<UpdateUserPayload>({});
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const handleEditOpen = (user: User) => {
        setEditingUser(user);
        setEditFormData({
            phone: user.phone || "",
            address: user.address || "",
            role: user.role,
        });
    };

    const handleEditClose = () => {
        setEditingUser(null);
        setEditFormData({});
    };

    const handleEditSubmit = () => {
        if (editingUser) {
            dispatch(updateUser({ id: editingUser.id, payload: editFormData }));
            handleEditClose();
        }
    };

    if (loading && users.length === 0) {
        return (
            <PageContainer>
                <ListCard>
                    <Box display="flex" justifyContent="center" p={6}>
                        <CircularProgress size={48} thickness={4} />
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <ListCard>
                    <Box p={4}>
                        <Typography color="error" align="center">
                            Lỗi: {error}
                        </Typography>
                    </Box>
                </ListCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ListCard>
                <Box sx={{ p: 4 }}>
                    <Title sx={{ px: 4, pt: 3 }}>Danh Sách Người Dùng</Title>

                    <TableWrapper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Tên Đăng Nhập</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Số Điện Thoại</strong></TableCell>
                                    <TableCell><strong>Địa Chỉ</strong></TableCell>
                                    <TableCell><strong>Vai Trò</strong></TableCell>
                                    <TableCell align="center"><strong>Thao tác</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "rgba(4, 196, 217, 0.04)",
                                                transform: "translateY(-1px)",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                            },
                                            "& td": {
                                                borderBottom: "1px solid #e2e8f0",
                                            },
                                        }}
                                    >
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone || "—"}</TableCell>
                                        <TableCell sx={{ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {user.address || "—"}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: "12px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 600,
                                                    backgroundColor: user.role === "ADMIN" ? "#fee2e2" : user.role === "STAFF" ? "#fef3c7" : "#dbeafe",
                                                    color: user.role === "ADMIN" ? "#991b1b" : user.role === "STAFF" ? "#92400e" : "#1e40af",
                                                }}
                                            >
                                                {user.role}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                            <EditButton
                                                size="small"
                                                onClick={() => handleEditOpen(user)}
                                                sx={{ mr: 1 }}
                                            >
                                                Sửa
                                            </EditButton>
                                            <DeleteButton
                                                size="small"
                                                onClick={() => dispatch(deleteUser(user.id))}
                                            >
                                                Xóa
                                            </DeleteButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableWrapper>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={users.length}
                        itemsPerPage={itemsPerPage}
                    />
                </Box>

                {/* Edit Dialog */}
                <Dialog open={Boolean(editingUser)} onClose={handleEditClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Chỉnh Sửa Người Dùng
                        <IconButton
                            onClick={handleEditClose}
                            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                        <TextField
                            fullWidth
                            label="Số Điện Thoại"
                            value={editFormData.phone || ""}
                            onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Địa Chỉ"
                            value={editFormData.address || ""}
                            onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Vai Trò</InputLabel>
                            <Select
                                value={editFormData.role || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as any })}
                                label="Vai Trò"
                            >
                                <MenuItem value="USER">USER</MenuItem>
                                <MenuItem value="STAFF">STAFF</MenuItem>
                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <EditButton onClick={handleEditClose}>Hủy</EditButton>
                        <EditButton onClick={handleEditSubmit} variant="contained">
                            Lưu
                        </EditButton>
                    </DialogActions>
                </Dialog>
            </ListCard>
        </PageContainer>
    );
};

export default UserListForm;
