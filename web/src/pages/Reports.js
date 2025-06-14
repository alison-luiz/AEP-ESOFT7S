import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
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

  const getStatusCount = (status) => {
    return points.filter((point) => point.status === status).length;
  };

  const getWeeklyData = () => {
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    return days.map((day) => ({
      name: day,
      cheio: Math.floor(Math.random() * 5) + 1,
      normal: Math.floor(Math.random() * 10) + 5,
      vazio: Math.floor(Math.random() * 4) + 1,
    }));
  };

  const getStatusData = () => {
    return [
      { name: "Cheio", value: getStatusCount("cheio") },
      { name: "Normal", value: getStatusCount("normal") },
      { name: "Vazio", value: getStatusCount("vazio") },
    ];
  };

  const COLORS = ["#d32f2f", "#1976d2", "#2e7d32"];

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
    <Box>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Status dos Pontos por Dia da Semana
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getWeeklyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cheio" fill="#d32f2f" />
                <Bar dataKey="normal" fill="#1976d2" />
                <Bar dataKey="vazio" fill="#2e7d32" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getStatusData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total de Pontos
                  </Typography>
                  <Typography variant="h4">{points.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Média de Coletas por Dia
                  </Typography>
                  <Typography variant="h4">
                    {Math.floor(points.length / 7)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Tempo Médio de Coleta
                  </Typography>
                  <Typography variant="h4">45 min</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;
