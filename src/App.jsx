// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnunciosPage from './pages/AnunciosPage';
import ComentariosPage from './pages/ComentariosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnunciosPage />} />
        <Route path="/anuncio/:postId/comentarios" element={<ComentariosPage />} />
      </Routes>
    </Router>
  );
}

export default App;