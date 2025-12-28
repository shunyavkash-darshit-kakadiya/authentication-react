import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import apiService from "../../services/apiService";
import apiList from "../../constants/apiList";

const DashboardPage = () => {
    const [devices, setDevices] = useState([]);

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
