import React from 'react';
import { LinkedIn, Api } from '@mui/icons-material'; // Ícones do Material UI
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-header">
        <a href="https://www.linkedin.com/in/paulo-fritsch/" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <LinkedIn fontSize="large" />
        </a>
        <a href="https://f1api.dev/pt" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <Api fontSize="large" />
        </a>
      </div>
      <p>
        Este site não é oficial e não está associado de forma alguma às empresas de Fórmula 1. F1, FÓRMULA UM, FÓRMULA 1, CAMPEONATO MUNDIAL DE FÓRMULA UM DA FIA, GRANDE PRÊMIO e marcas relacionadas são marcas registradas da Formula One Licensing BV.
      </p>
    </div>
  );
};

export default Footer;
