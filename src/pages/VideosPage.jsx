import React, { useEffect, useState } from 'react';
import { useApi } from '../Api/Context'; // Importando o contexto
import { Box, Grid, CircularProgress, Card, CardContent, Typography, CardMedia, Paper, Button } from '@mui/material';
import '../styles/VideosPage.css'; // Importando o CSS

const VideosPage = () => {
  const { fetchVideos, loadingVideos, error, videos } = useApi();

  const [visibleVideos, setVisibleVideos] = useState(9); // Estado para controlar o número de vídeos visíveis

  useEffect(() => {
    fetchVideos(); // Chama a função para buscar os vídeos
  }, []);

  const handleRedirectToYouTube = (videoLink) => {
    window.open(videoLink, '_blank'); // Redireciona para o YouTube
  };

  const handleSeeMoreClick = () => {
    window.open("https://www.youtube.com/@Formula1/videos", "_blank"); // Redireciona para o YouTube
  };

  if (loadingVideos) {
    return <CircularProgress className="loading" />; // Indicador de carregamento
  }

  if (error) {
    return <div>Erro: {error}</div>; // Exibe erro se houver
  }

  return (
    <Box className="videos-container">
      <Typography className="videos-title" sx={{marginBottom: 3}}>
        Últimos Vídeos do Canal Oficial F1
      </Typography>
      <Grid container spacing={3}>
        {videos.length === 0 ? (
          <div>Nenhum vídeo encontrado.</div>
        ) : (
          videos.slice(0, visibleVideos).map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.guid}>
              <Paper elevation={3} className="video-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={video.thumbnail} // Usando a thumbnail do vídeo
                  alt={video.title}
                  onClick={() => handleRedirectToYouTube(video.link)} // Redireciona ao clicar
                  className="video-card-media"
                />
                <CardContent className="video-card-content">
                  <Typography className="video-card-title" component="div">
                    {video.title}
                  </Typography>
                  <Typography className="video-card-date" variant="body2">
                    {new Date(video.pubDate).toLocaleString()} {/* Exibindo data formatada */}
                  </Typography>
                </CardContent>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

        <Box className="toggle-buttons">
          <Button
            onClick={handleSeeMoreClick}
            className="toggle-buttons-button"
            variant="contained"
          >
            Ver Mais
          </Button>
        </Box>

    </Box>
  );
};

export default VideosPage;
