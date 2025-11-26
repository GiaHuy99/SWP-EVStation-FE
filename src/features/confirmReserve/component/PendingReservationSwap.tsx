// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Autocomplete,
//     CircularProgress,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
// import {
//     fetchPendingReservations,
//     confirmReservationSwap,
//     rejectReservationSwap,
// } from "../ConfirmReserveThunks";
//
// export default function PendingReservationSwap() {
//     const dispatch = useAppDispatch();
//     const { reservations = [], loading, actionLoading = {} } = useAppSelector((s) => s.reservationSwap);
//
//     const [open, setOpen] = useState(false);
//     const [selected, setSelected] = useState<any>(null);
//     const [selectedBattery, setSelectedBattery] = useState<any>(null);
//
//     useEffect(() => {
//         dispatch(fetchPendingReservations());
//     }, [dispatch]);
//
//     const handleOpen = (item: any) => {
//         setSelected(item);
//         setSelectedBattery(null);
//         setOpen(true);
//     };
//
//     const handleConfirm = () => {
//         if (!selected || !selectedBattery) return;
//
//         dispatch(
//             confirmReservationSwap({
//                 transactionId: selected.id,
//                 newBatterySerialId: selectedBattery.batterySerialId,
//                 endPercent: selectedBattery.chargePercent,
//             })
//         );
//         setOpen(false);
//     };
//
//     const handleReject = (id: number) => {
//         dispatch(rejectReservationSwap(id));
//     };
//
//     if (loading) return <CircularProgress />;
//
//     return (
//         <div>
//             <h2>Pending Reservation Swap</h2>
//
//             {reservations.length === 0 && <p>Không có yêu cầu đặt trước</p>}
//
//             {reservations.map((item: any) => (
//                 <div key={item.id} className="border p-3 my-3 rounded-md shadow-sm">
//                     <h3>{item.username}</h3>
//                     <p>Vehicle: {item.vehicleVin}</p>
//                     <p>Station: {item.stationName}</p>
//
//                     <Button
//                         onClick={() => handleOpen(item)}
//                         variant="contained"
//                         color="success"
//                         disabled={actionLoading[item.id]}
//                     >
//                         {actionLoading[item.id] ? <CircularProgress size={20} /> : "Duyệt"}
//                     </Button>
//
//                     <Button
//                         onClick={() => handleReject(item.id)}
//                         color="error"
//                         variant="outlined"
//                         style={{ marginLeft: 10 }}
//                         disabled={actionLoading[item.id]}
//                     >
//                         Từ chối
//                     </Button>
//                 </div>
//             ))}
//
//             {/* DIALOG CONFIRM */}
//             <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//                 <DialogTitle>Chọn pin đã đặt trước</DialogTitle>
//
//                 <DialogContent>
//                     <Autocomplete
//                         fullWidth
//                         options={Array.isArray(selected?.reservation?.batteries) ? selected.reservation.batteries : []}
//                         getOptionLabel={(opt) =>
//                             `${opt.serialNumber} | ${opt.chargePercent}% | SoH ${opt.stateOfHealth}%`
//                         }
//                         value={selectedBattery}
//                         onChange={(e, val) => setSelectedBattery(val)}
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Batteries RESERVED"
//                                 placeholder={
//                                     selected?.reservation?.batteries?.length === 0
//                                         ? "Không có pin đã đặt trước"
//                                         : ""
//                                 }
//                             />
//                         )}
//                     />
//                 </DialogContent>
//
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Huỷ</Button>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         onClick={handleConfirm}
//                         disabled={!selectedBattery}
//                     >
//                         Xác nhận
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default function PendingReservationSwap() {
//     const dispatch = useAppDispatch();
//     const { reservations, loading, actionLoading = {} } = useAppSelector(
//         (s) => s.reservationSwap
//     );
//
//     const [open, setOpen] = useState(false);
//     const [selected, setSelected] = useState<any>(null);
//     const [selectedBattery, setSelectedBattery] = useState<any>(null);
//
//     useEffect(() => {
//         dispatch(fetchPendingReservations());
//     }, [dispatch]);
//
//     const handleOpen = (item: any) => {
//         setSelected(item);
//         setSelectedBattery(null);
//         setOpen(true);
//     };
//
//     const handleConfirm = () => {
//         if (!selected || !selectedBattery) return;
//
//         dispatch(
//             confirmReservationSwap({
//                 transactionId: selected.id,
//                 newBatterySerialId: selectedBattery.batterySerialId,
//                 endPercent: selectedBattery.chargePercent,
//             })
//         );
//         setOpen(false);
//     };
//
//     const handleReject = (id: number) => {
//         dispatch(rejectReservationSwap(id));
//     };
//
//     if (loading) return <CircularProgress />;
//
//     // ✅ Ép kiểu an toàn
//     const safeReservations = Array.isArray(reservations) ? reservations : [];
//
//     // Nếu rỗng, không hiển thị gì
//     if (safeReservations.length === 0) return null;
//
//     return (
//         <div>
//             <h2>Pending Reservation Swap</h2>
//
//             {safeReservations.map((item: any) => (
//                 <div key={item.id} className="border p-3 my-3 rounded-md shadow-sm">
//                     <h3>{item.username}</h3>
//                     <p>Vehicle: {item.vehicleVin}</p>
//                     <p>Station: {item.stationName}</p>
//
//                     <Button
//                         onClick={() => handleOpen(item)}
//                         variant="contained"
//                         color="success"
//                         disabled={actionLoading[item.id]}
//                     >
//                         {actionLoading[item.id] ? <CircularProgress size={20} /> : "Duyệt"}
//                     </Button>
//
//                     <Button
//                         onClick={() => handleReject(item.id)}
//                         color="error"
//                         variant="outlined"
//                         style={{ marginLeft: 10 }}
//                         disabled={actionLoading[item.id]}
//                     >
//                         Từ chối
//                     </Button>
//                 </div>
//             ))}
//
//             {/* DIALOG CONFIRM */}
//             <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//                 <DialogTitle>Chọn pin đã đặt trước</DialogTitle>
//
//                 <DialogContent>
//                     <Autocomplete
//                         fullWidth
//                         options={
//                             Array.isArray(selected?.reservation?.batteries)
//                                 ? selected.reservation.batteries
//                                 : []
//                         }
//                         getOptionLabel={(opt) =>
//                             `${opt.serialNumber} | ${opt.chargePercent}% | SoH ${opt.stateOfHealth}%`
//                         }
//                         value={selectedBattery}
//                         onChange={(e, val) => setSelectedBattery(val)}
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Batteries RESERVED"
//                                 placeholder={
//                                     selected?.reservation?.batteries?.length === 0
//                                         ? "Không có pin đã đặt trước"
//                                         : ""
//                                 }
//                             />
//                         )}
//                     />
//                 </DialogContent>
//
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Huỷ</Button>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         onClick={handleConfirm}
//                         disabled={!selectedBattery}
//                     >
//                         Xác nhận
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks";
import {
    fetchPendingReservations,
    confirmReservationSwap,
    rejectReservationSwap,
} from "../ConfirmReserveThunks";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Autocomplete,
    Alert,
    Box,
    Stack,
    Typography,
    Chip,
} from "@mui/material";

export default function PendingReservationSwap() {
    const dispatch = useAppDispatch();
    const { reservations = [], loading, actionLoading = {} } = useAppSelector(
        (s) => s.reservationSwap
    );

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [selectedBattery, setSelectedBattery] = useState<any>(null);
    const [endPercent, setEndPercent] = useState("0");

    useEffect(() => {
        dispatch(fetchPendingReservations());
    }, [dispatch]);

    const handleOpenConfirm = (item: any) => {
        setSelectedItem(item);
        setSelectedBattery(null);
        setEndPercent("0");
        setOpenConfirm(true);
    };

    const handleCloseDialog = () => {
        setOpenConfirm(false);
        setSelectedItem(null);
        setSelectedBattery(null);
        setEndPercent("0");
    };

    const handleConfirm = () => {
        if (!selectedItem || !selectedBattery) return;

        dispatch(
            confirmReservationSwap({
                transactionId: selectedItem.id,
                newBatterySerialId: selectedBattery.batterySerialId,
                endPercent: parseInt(endPercent) || 0,
            })
        );
        handleCloseDialog();
    };

    const safeReservations = Array.isArray(reservations) ? reservations : [];

    if (loading) return <CircularProgress />;
    if (safeReservations.length === 0) return <Alert severity="info">Không có yêu cầu đang chờ xử lý</Alert>;

    return (
        <Box>
            <Table>
                <TableHead sx={{ backgroundColor: "#f0fdf4" }}>
                    <TableRow>
                        <TableCell><strong>Người dùng</strong></TableCell>
                        <TableCell><strong>Trạm</strong></TableCell>
                        <TableCell><strong>Hành động</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {safeReservations.map((item) => (
                        <TableRow key={item.id} hover>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>
                                <Chip label={item.stationName} color="info" size="small" />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleOpenConfirm(item)}
                                    disabled={actionLoading[item.id]}
                                >
                                    {actionLoading[item.id] ? <CircularProgress size={20} /> : "Duyệt"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    sx={{ ml: 1 }}
                                    onClick={() => dispatch(rejectReservationSwap(item.id))}
                                    disabled={actionLoading[item.id]}
                                >
                                    Từ chối
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog confirm */}
            <Dialog open={openConfirm} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ bgcolor: "#10b981", color: "white" }}>
                    Xác nhận đổi pin - ID: {selectedItem?.id}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Alert severity="info">
                            <strong>{selectedItem?.username}</strong> đang đổi pin tại <strong>{selectedItem?.stationName}</strong>
                        </Alert>

                        <Autocomplete
                            options={Array.isArray(selectedItem?.reservation?.batteries) ? selectedItem.reservation.batteries : []}
                            getOptionLabel={(opt: any) =>
                                `${opt.serialNumber} | ${opt.chargePercent || 0}% | SoH ${opt.stateOfHealth || 0}%`
                            }
                            value={selectedBattery}
                            onChange={(_, val) => setSelectedBattery(val)}
                            noOptionsText="Không có pin phù hợp"
                            renderInput={(params) => (
                                <TextField {...params} label="Chọn pin cấp cho khách" />
                            )}
                        />

                        <TextField
                            label="Phần trăm pin cũ khi tháo ra"
                            type="number"
                            value={endPercent}
                            onChange={(e) => setEndPercent(e.target.value)}
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            helperText="Ví dụ: 15"
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleConfirm}
                        disabled={!selectedBattery || actionLoading[selectedItem?.id!]}
                    >
                        {actionLoading[selectedItem?.id!] ? <CircularProgress size={24} /> : "Xác nhận"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
