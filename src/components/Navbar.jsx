import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import {Menu} from '@mui/icons-material'
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const MenuButton = styled(Typography)(({ theme }) => ({
	marginRight: theme.spacing(2),
}));

const Container = styled(Typography)(({ theme }) => ({
	offset: theme.mixins.toolbar
}));

const Navbar = ({names}) =>{
    const navigate = useNavigate();

    const navegador = (data) => {
        navigate(data, {state: names});
    };

    return (
			<div>
				<AppBar position="fixed" color="primary">
					<Toolbar>
						<Box
							sx={{ flexGrow: 3, display: "flex", alignItems: "center" }}
						>
							<IconButton color="inherit" aria-label="menu" sx={{ spacing: 2 }}>
								<Menu />
							</IconButton>
							{names.map((name, idx) => {
								return (
									<MenuButton
										key={idx}
										onClick={() => {
											navegador(name[1]);
										}}
										variant="h6"
									>
										{name[0]}
									</MenuButton>
								);
							})}
						</Box>
						<MenuButton variant="h6">Mi cuenta</MenuButton>
						<Typography variant="h6">Cerrar Sesión</Typography>
					</Toolbar>
				</AppBar>
				<Container></Container>
			</div>
		);
}

export default Navbar;