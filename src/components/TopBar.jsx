import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Tooltip, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom'; // Se for usar React Router para navegação
import { FaFlagCheckered, FaVideo } from "react-icons/fa"; // Ícone de Bandeira de Corrida
import { GiPodium } from "react-icons/gi"; // Ícone de Troféu
import { Menu as MenuIcon } from '@mui/icons-material'; // Ícone de menu hamburguer

import logo from '../assets/header_image2.png'; // Logo da sua aplicação
import '../styles/TopBar.css'; // Arquivo de estilos

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Usando o hook useMediaQuery para verificar o tamanho da tela
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar className="toolbar">
        {/* Logo no canto esquerdo, agora com link para a home */}
        <Box className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </Box>

        {/* Itens de navegação no canto direito */}
        <Box className="nav-buttons">
          {/* Exibe o menu hamburguer somente em telas pequenas */}
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
              className="menu-button"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Exibe os itens de navegação para desktop
            <>
              <Tooltip title="Corridas" arrow>
                <Button color="inherit" component={Link} to="/races">
                  <FaFlagCheckered style={{ fontSize: '30px' }} />
                </Button>
              </Tooltip>
              <Tooltip title="Classificação" arrow>
                <Button color="inherit" component={Link} to="/classification">
                  <GiPodium style={{ fontSize: '35px' }} />
                </Button>
              </Tooltip>
              <Tooltip title="Vídeos" arrow>
                <Button color="inherit" component={Link} to="/videos">
                  <FaVideo style={{ fontSize: '30px' }} />
                </Button>
              </Tooltip>

            </>
          )}

          {/* Menu de navegação para mobile */}
          {isMobile && (
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem component={Link} to="/races" onClick={handleMenuClose}>
                <FaFlagCheckered style={{ fontSize: '30px', marginRight: '10px' }} />
                Corridas
              </MenuItem>
              <MenuItem component={Link} to="/classification" onClick={handleMenuClose}>
                <GiPodium style={{ fontSize: '35px', marginRight: '10px' }} />
                Classificação
              </MenuItem>
              <MenuItem component={Link} to="/videos" onClick={handleMenuClose}>
                <FaVideo style={{ fontSize: '35px', marginRight: '10px' }} />
                Videos Oficiais
              </MenuItem>
            </Menu>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
