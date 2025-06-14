import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Logo from "../assets/Logo.png";

const drawerWidth = 240;

const menuItems = [
	{ text: "Dashboard", icon: <DashboardIcon />, path: "/" },
	{
		text: "Pontos de Coleta",
		icon: <LocationOnIcon />,
		path: "/collection-points",
	},
	{ text: "Relatórios", icon: <AssessmentIcon />, path: "/reports" },
];

function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					backgroundColor: "#1B5E20",
					color: "white",
				},
			}}
		>
			<Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
				<img src={Logo} alt="Coleta+" style={{ maxWidth: 180, width: "100%" }} />
			</Box>
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						onClick={() => navigate(item.path)}
						sx={{
							backgroundColor: location.pathname === item.path ? "rgba(255, 255, 255, 0.1)" : "transparent",
							"&:hover": {
								backgroundColor: "rgba(255, 255, 255, 0.1)",
							},
						}}
					>
						<ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

export default Sidebar;
