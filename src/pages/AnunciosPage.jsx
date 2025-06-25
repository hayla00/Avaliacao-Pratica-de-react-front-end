import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'; // Renomeie Link para evitar conflito com MUI Link
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Grid,
} from '@mui/material';

function AnunciosPage() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setAnuncios(response.data);
      } catch (err) {
        setError('Erro ao carregar os anúncios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnuncios();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ mt: 3 }}>Carregando anúncios...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Alert severity="error">
          <AlertTitle>Erro</AlertTitle>
          {error} — <strong>Verifique sua conexão!</strong>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: 'primary.dark' }}>
        Listagem de Anúncios
      </Typography>
      <Grid container spacing={3}>
        {anuncios.map(anuncio => (
          <Grid item xs={12} sm={6} md={4} key={anuncio.id}>
            <Box
              sx={{
                p: 3,
                boxShadow: 3, // Elevação do Material UI
                borderRadius: 2,
                bgcolor: 'background.paper', // Cor de fundo do tema
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                {anuncio.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {anuncio.body}
              </Typography>
              <Button
                component={RouterLink} // Use RouterLink para navegação interna
                to={`/anuncio/${anuncio.id}/comentarios`}
                variant="contained"
                color="primary"
                size="small"
                fullWidth
              >
                Ver Comentários
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AnunciosPage;