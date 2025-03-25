import React from "react";
import { Box } from "@mui/material";
import "../styles/Home.css";
import f1Video from "../assets/f1videohome.mp4"; 

const Home = () => {
  return (
    <Box className="home-container">
      <video autoPlay loop muted playsInline preload="auto" className="background-video">
        <source src={f1Video} type="video/mp4" />
      </video>
      <Box className="overlay"></Box>
        <Box className="content">
          <h2 className="title">
            Bem-vindo ao F1 Connect!
          </h2>
          <h3 className="subtitle">
            Site não-oficial para acompanhar as últimas corridas e classificações da Fórmula 1.
          </h3>
        </Box>
    </Box>
  );
};

export default Home;
