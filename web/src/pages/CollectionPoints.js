import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Snackbar,
	Alert,
	IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import { collectionPointsService } from "../services/api";

function CollectionPoints() {
	const [open, setOpen] = useState(false);
	const [points, setPoints] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [newPoint, setNewPoint] = useState({
		address: "",
		lat: "",
		lng: "",
	});

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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewPoint({
			address: "",
			lat: "",
			lng: "",
		});
	};

	const handleSubmit = async () => {
		try {
			await collectionPointsService.create({
				...newPoint,
				lat: parseFloat(newPoint.lat),
				lng: parseFloat(newPoint.lng),
				status: "normal", // Status inicial sempre normal
			});
			handleClose();
			loadPoints();
			setError(null);
		} catch (err) {
			setError("Erro ao criar ponto de coleta");
		}
	};

	const handleMaintenance = (pointId) => {
		// Redirecionar para a página de manutenção
		window.location.href = `/maintenance/${pointId}`;
	};

	if (loading) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography>Carregando...</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Pontos de Coleta</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
					Novo Ponto
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Endereço</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Latitude</TableCell>
							<TableCell>Longitude</TableCell>
							<TableCell>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{points.map((point) => (
							<TableRow key={point.id}>
								<TableCell>{point.id}</TableCell>
								<TableCell>{point.address}</TableCell>
								<TableCell>
									<Box
										sx={{
											backgroundColor:
												point.status === "cheio" ? "#d32f2f" : point.status === "normal" ? "#1976d2" : "#2e7d32",
											color: "white",
											px: 1,
											py: 0.5,
											borderRadius: 1,
											display: "inline-block",
										}}
									>
										{point.status}
									</Box>
								</TableCell>
								<TableCell>{point.lat}</TableCell>
								<TableCell>{point.lng}</TableCell>
								<TableCell>
									<IconButton color="primary" onClick={() => handleMaintenance(point.id)} title="Manutenção">
										<BuildIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Novo Ponto de Coleta</DialogTitle>
				<DialogContent>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
						<TextField
							label="Endereço"
							fullWidth
							value={newPoint.address}
							onChange={(e) => setNewPoint({ ...newPoint, address: e.target.value })}
						/>
						<TextField
							label="Latitude"
							fullWidth
							type="number"
							value={newPoint.lat}
							onChange={(e) => setNewPoint({ ...newPoint, lat: e.target.value })}
						/>
						<TextField
							label="Longitude"
							fullWidth
							type="number"
							value={newPoint.lng}
							onChange={(e) => setNewPoint({ ...newPoint, lng: e.target.value })}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleSubmit} variant="contained">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
				<Alert severity="error" onClose={() => setError(null)}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default CollectionPoints;
