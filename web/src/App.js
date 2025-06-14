import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CollectionPoints from "./pages/CollectionPoints";
import Reports from "./pages/Reports";
import Maintenance from "./pages/Maintenance";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#dc004e",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Box sx={{ display: "flex" }}>
					<Sidebar />
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - 240px)` },
						}}
					>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/collection-points" element={<CollectionPoints />} />
							<Route path="/reports" element={<Reports />} />
							<Route path="/maintenance/:id" element={<Maintenance />} />
						</Routes>
					</Box>
				</Box>
			</Router>
		</ThemeProvider>
	);
}

export default App;
