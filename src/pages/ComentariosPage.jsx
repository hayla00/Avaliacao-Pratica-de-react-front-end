import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom'; // Renomeie Link
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
} from '@mui/material';

function ComentariosPage() {
  const { postId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComentarios(response.data);
      } catch (err) {
        setError('Erro ao carregar os comentários.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComentarios();
  }, [postId]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress size={60} sx={{ color: 'secondary.main' }} />
        <Typography variant="h6" sx={{ mt: 3 }}>Carregando comentários...</Typography>
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
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: 'secondary.dark' }}>
        Comentários do Anúncio #{postId}
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        color="primary"
        sx={{ mb: 4 }}
      >
        Voltar para a Lista de Anúncios
      </Button>

      {comentarios.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>Informação</AlertTitle>
          Nenhum comentário encontrado para este anúncio.
        </Alert>
      ) : (
        <Box>
          {comentarios.map(comentario => (
            <Box
              key={comentario.id}
              sx={{
                p: 3,
                mb: 3,
                boxShadow: 1,
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Typography variant="h6" component="h3" sx={{ color: 'info.main' }}>
                {comentario.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Email: {comentario.email}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                {comentario.body}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default ComentariosPage;