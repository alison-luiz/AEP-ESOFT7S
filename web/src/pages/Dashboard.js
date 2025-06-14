import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { collectionPointsService } from "../services/api";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Dashboard() {
	const [points, setPoints] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadPoints();
	}, []);

	const loadPoints = async () => {
		try {
			const data = await collectionPointsService.getAll();
			setPoints(data);
			setError(null);
		} catch (err) {
			setError("Erro ao carregar pontos de coleta");
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "CHEIO":
				return "#d32f2f";
			case "NORMAL":
				return "#1976d2";
			case "VAZIO":
				return "#2e7d32";
			default:
				return "#757575";
		}
	};

	const getStatusCount = (status) => {
		return points.filter((point) => point.status === status).length;
	};

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			<Typography variant="h4" gutterBottom>
				Dashboard
			</Typography>

			<Box sx={{ mb: 3 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<DeleteIcon sx={{ color: "#d32f2f", mr: 1 }} />
									<Typography variant="h6">Pontos Cheios</Typography>
								</Box>
								<Typography variant="h4">{getStatusCount("CHEIO")}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<WarningIcon sx={{ color: "#1976d2", mr: 1 }} />
									<Typography variant="h6">Pontos Normais</Typography>
								</Box>
								<Typography variant="h4">{getStatusCount("NORMAL")}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<CheckCircleIcon sx={{ color: "#2e7d32", mr: 1 }} />
									<Typography variant="h6">Pontos Vazios</Typography>
								</Box>
								<Typography variant="h4">{getStatusCount("VAZIO")}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>

			<Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
				<Paper sx={{ p: 2, flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
					<MapContainer center={[-23.6033, -52.0806]} zoom={14} style={{ flexGrow: 1, width: "100%", height: "100%" }}>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						{points.map((point) => (
							<Marker
								key={point.id}
								position={[point.lat, point.lng]}
								icon={L.divIcon({
									className: "custom-icon",
									html: `<div style="
                      background-color: ${getStatusColor(point.status)};
                      width: 12px;
                      height: 12px;
                      border-radius: 50%;
                      border: 2px solid white;
                    "></div>`,
								})}
							>
								<Popup>
									<Typography variant="subtitle2">{point.address}</Typography>
									<Typography variant="body2">Status: {point.status}</Typography>
									<Typography variant="body2">
										Lat: {point.lat} <br />
										Lng: {point.lng}
									</Typography>
								</Popup>
							</Marker>
						))}
					</MapContainer>
				</Paper>
			</Box>
		</Box>
	);
}

export default Dashboard;
