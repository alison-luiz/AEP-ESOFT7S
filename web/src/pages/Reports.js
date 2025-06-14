import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
} from "recharts";
import { collectionPointsService } from "../services/api";

function Reports() {
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

	const getStatusCount = (status) => points.filter((point) => point.status === status).length;

	const getWeeklyData = () => {
		const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
		return days.map((day) => ({
			name: day,
			CHEIO: Math.floor(Math.random() * 5) + 1,
			NORMAL: Math.floor(Math.random() * 10) + 5,
			VAZIO: Math.floor(Math.random() * 4) + 1,
		}));
	};

	const getStatusData = () => {
		return [
			{ name: "CHEIO", value: getStatusCount("CHEIO") },
			{ name: "NORMAL", value: getStatusCount("NORMAL") },
			{ name: "VAZIO", value: getStatusCount("VAZIO") },
		];
	};

	const STATUS_COLORS = {
		CHEIO: "#d32f2f",
		NORMAL: "#1976d2",
		VAZIO: "#2e7d32",
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

	const statusByDay = getWeeklyData();
	const statusDistribution = getStatusData();

	const evolutionData = Array.from({ length: 30 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - (29 - i));
		return {
			date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
			CHEIO: Math.floor(Math.random() * 10) + 1,
		};
	});

	const maintenanceByPoint = points.map((p) => ({
		address: p.address.split(",")[0],
		manutencoes: p.maintenanceHistory ? p.maintenanceHistory.length : 0,
	}));

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Relatórios
			</Typography>

			<Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mb: 5, justifyContent: "center" }}>
				<Paper sx={{ p: 3, minWidth: 500, minHeight: 400, flex: 2 }}>
					<Typography variant="h5" gutterBottom>
						Status dos Pontos por Dia da Semana
					</Typography>
					<ResponsiveContainer width="100%" height={320}>
						<BarChart data={statusByDay} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis allowDecimals={false} />
							<Tooltip formatter={(value, name) => [`${value} ponto(s)`, name]} />
							<Legend verticalAlign="top" height={36} iconType="circle" />
							<Bar dataKey="CHEIO" fill={STATUS_COLORS.CHEIO} name="Cheio" />
							<Bar dataKey="NORMAL" fill={STATUS_COLORS.NORMAL} name="Normal" />
							<Bar dataKey="VAZIO" fill={STATUS_COLORS.VAZIO} name="Vazio" />
						</BarChart>
					</ResponsiveContainer>
				</Paper>
				<Paper sx={{ p: 3, minWidth: 500, minHeight: 400, flex: 2 }}>
					<Typography variant="h5" gutterBottom>
						Distribuição de Status
					</Typography>
					<ResponsiveContainer width="100%" height={320}>
						<PieChart>
							<Pie
								data={statusDistribution}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={110}
								label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
							>
								{statusDistribution.map((entry, idx) => (
									<Cell key={`cell-${idx}`} fill={STATUS_COLORS[entry.name]} />
								))}
							</Pie>
							<Tooltip formatter={(value, name) => [`${value} ponto(s)`, name]} />
							<Legend verticalAlign="bottom" iconType="circle" />
						</PieChart>
					</ResponsiveContainer>
				</Paper>
			</Box>

			<Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mb: 5, justifyContent: "center" }}>
				<Paper sx={{ p: 3, minWidth: 500, minHeight: 400, flex: 2 }}>
					<Typography variant="h5" gutterBottom>
						Evolução de Pontos Cheios (últimos 30 dias)
					</Typography>
					<ResponsiveContainer width="100%" height={320}>
						<LineChart data={evolutionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="CHEIO" stroke={STATUS_COLORS.CHEIO} name="Cheio" strokeWidth={3} />
						</LineChart>
					</ResponsiveContainer>
				</Paper>
				<Paper sx={{ p: 3, minWidth: 500, minHeight: 400, flex: 2 }}>
					<Typography variant="h5" gutterBottom>
						Manutenções por Ponto de Coleta
					</Typography>
					<ResponsiveContainer width="100%" height={320}>
						<BarChart data={maintenanceByPoint} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="number" allowDecimals={false} />
							<YAxis dataKey="address" type="category" width={180} />
							<Tooltip />
							<Legend />
							<Bar dataKey="manutencoes" fill="#1976d2" name="Manutenções" />
						</BarChart>
					</ResponsiveContainer>
				</Paper>
			</Box>
		</Box>
	);
}

export default Reports;
