import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Snackbar,
	Alert,
	CircularProgress,
} from "@mui/material";
import { collectionPointsService } from "../services/api";

function Maintenance() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [point, setPoint] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [maintenance, setMaintenance] = useState({
		status: "normal",
		lastMaintenance: new Date().toISOString().split("T")[0],
		notes: "",
	});

	useEffect(() => {
		loadPoint();
	}, [id]);

	const loadPoint = async () => {
		try {
			const data = await collectionPointsService.getOne(id);
			setPoint(data);
			setMaintenance({
				status: data.status,
				lastMaintenance: new Date().toISOString().split("T")[0],
				notes: "",
			});
			setError(null);
		} catch (err) {
			setError("Erro ao carregar ponto de coleta");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		try {
			await collectionPointsService.update(id, {
				...point,
				status: maintenance.status,
				lastMaintenance: maintenance.lastMaintenance,
				maintenanceHistory: [
					...(point.maintenanceHistory || []),
					{
						date: maintenance.lastMaintenance,
						status: maintenance.status,
						notes: maintenance.notes,
					},
				],
			});
			navigate("/collection-points");
		} catch (err) {
			setError("Erro ao atualizar ponto de coleta");
		}
	};

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!point) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography color="error">Ponto de coleta não encontrado</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Manutenção do Ponto de Coleta
			</Typography>

			<Paper sx={{ p: 3, mb: 3 }}>
				<Typography variant="h6" gutterBottom>
					Informações do Ponto
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography>
							<strong>Endereço:</strong> {point.address}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>
							<strong>Latitude:</strong> {point.lat}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>
							<strong>Longitude:</strong> {point.lng}
						</Typography>
					</Grid>
				</Grid>
			</Paper>

			<Paper sx={{ p: 3 }}>
				<Typography variant="h6" gutterBottom>
					Registro de Manutenção
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<FormControl fullWidth>
							<InputLabel>Status</InputLabel>
							<Select
								value={maintenance.status}
								label="Status"
								onChange={(e) => setMaintenance({ ...maintenance, status: e.target.value })}
							>
								<MenuItem value="cheio">Cheio</MenuItem>
								<MenuItem value="normal">Normal</MenuItem>
								<MenuItem value="vazio">Vazio</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							label="Data da Manutenção"
							type="date"
							fullWidth
							value={maintenance.lastMaintenance}
							onChange={(e) => setMaintenance({ ...maintenance, lastMaintenance: e.target.value })}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Observações"
							fullWidth
							multiline
							rows={4}
							value={maintenance.notes}
							onChange={(e) => setMaintenance({ ...maintenance, notes: e.target.value })}
						/>
					</Grid>
				</Grid>

				<Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
					<Button variant="outlined" onClick={() => navigate("/collection-points")}>
						Cancelar
					</Button>
					<Button variant="contained" onClick={handleSubmit}>
						Salvar
					</Button>
				</Box>
			</Paper>

			{point.maintenanceHistory && point.maintenanceHistory.length > 0 && (
				<Paper sx={{ p: 3, mt: 3 }}>
					<Typography variant="h6" gutterBottom>
						Histórico de Manutenções
					</Typography>
					<Grid container spacing={2}>
						{point.maintenanceHistory.map((record, index) => (
							<Grid item xs={12} key={index}>
								<Paper sx={{ p: 2, bgcolor: "grey.100" }}>
									<Typography>
										<strong>Data:</strong> {record.date}
									</Typography>
									<Typography>
										<strong>Status:</strong> {record.status}
									</Typography>
									{record.notes && (
										<Typography>
											<strong>Observações:</strong> {record.notes}
										</Typography>
									)}
								</Paper>
							</Grid>
						))}
					</Grid>
				</Paper>
			)}

			<Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
				<Alert severity="error" onClose={() => setError(null)}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default Maintenance;
