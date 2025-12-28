import React, { useState, useEffect, use } from "react";
import {
    Typography,
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tab,
    Button,
    IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import apiService from "../../services/apiService";
import apiList from "../../constants/apiList";
import { getVisitorId } from "../../utils/cookie";

const DashboardPage = () => {
    const [devices, setDevices] = useState([]);
    const [visitorId, setVisitorId] = useState(null);

    useEffect(() => {
        const currentVisitorId = getVisitorId();
        setVisitorId(currentVisitorId);
    }, []);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await apiService(apiList.ACTIVE_DEVICE.GET_DEVICES);
                if (response.success) {
                    setDevices(response.data);
                }
            } catch (err) {
                console.error("Error fetching devices:", err);
            }
        };

        fetchDevices();
    }, []);

    const deleteDevice = async (deviceId) => {
        try {
            const deleteUrl = apiList.ACTIVE_DEVICE.DELETE_DEVICE.url.replace(':id', deviceId);
            const deleteConfig = {
                ...apiList.ACTIVE_DEVICE.DELETE_DEVICE,
                url: deleteUrl
            };

            const response = await apiService(deleteConfig);

            if (response.success) {
                setDevices(prevDevices => prevDevices.filter(device => device._id !== deviceId));
            }
        } catch (err) {
            console.error("Error deleting device:", err);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Active Devices
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Browser</TableCell>
                                <TableCell>OS</TableCell>
                                <TableCell>User Agent</TableCell>
                                <TableCell>Logged In</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devices.map((device) => (
                                <TableRow key={device._id}>
                                    <TableCell>{device.browser}</TableCell>
                                    <TableCell>{device.os}</TableCell>
                                    <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {device.userAgent}
                                    </TableCell>
                                    <TableCell>{new Date(device.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteDevice(device._id)} disabled={device.visitorId === visitorId} variant="contained" color="primary" size="small">
                                            Logout
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {devices.length === 0 && (
                    <Typography variant="body1" mt={2}>
                        No active devices found.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default DashboardPage;