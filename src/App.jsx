import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCheckins } from './hooks/useCheckins';
import { useDiario } from './hooks/useDiario';
import { useRecompensas } from './hooks/useRecompensas';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Carregando } from './components/Carregando';

import { Entrar } from './pages/Entrar';
import { Home } from './pages/Home';
import { Checkin } from './pages/Checkin';
import { Diario } from './pages/Diario';
import { Conversa } from './pages/Conversa';
import { Personalidade } from './pages/Personalidade';
import { Recompensas } from './pages/Recompensas';

function RotaPrivada({ usuario, children }) {
  if (!usuario) return <Navigate to="/" replace />;
  return children;
}

export function App() {
  const { usuario, carregando: carregandoAuth, entrarOuCadastrar, atualizarPersonalidade, logout } = useAuth();
  const checkinsHook = useCheckins(usuario?.id);
  const diarioHook = useDiario(usuario?.id);
  const recompensaData = useRecompensas(checkinsHook.checkins, diarioHook.entradas);

  if (carregandoAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Carregando texto="Carregando Bimo Web..." />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar usuario={usuario} onLogout={logout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={usuario ? <Navigate to="/home" replace /> : <Entrar onEntrar={entrarOuCadastrar} />} />
            
            <Route path="/home" element={
              <RotaPrivada usuario={usuario}>
                <Home 
                  usuario={usuario} 
                  checkinHoje={checkinsHook.checkinHoje} 
                  checkins={checkinsHook.checkins}
                  diario={diarioHook.entradas}
                  recompensaData={recompensaData}
                />
              </RotaPrivada>
            } />

            <Route path="/checkin" element={
              <RotaPrivada usuario={usuario}>
                <Checkin usuario={usuario} checkinsHook={checkinsHook} />
              </RotaPrivada>
            } />

            <Route path="/diario" element={
              <RotaPrivada usuario={usuario}>
                <Diario usuario={usuario} diarioHook={diarioHook} />
              </RotaPrivada>
            } />

            <Route path="/conversa" element={
              <RotaPrivada usuario={usuario}>
                <Conversa usuario={usuario} checkinHoje={checkinsHook.checkinHoje} />
              </RotaPrivada>
            } />

            <Route path="/personalidade" element={
              <RotaPrivada usuario={usuario}>
                <Personalidade usuario={usuario} aoAtualizarPersonalidade={atualizarPersonalidade} />
              </RotaPrivada>
            } />

            <Route path="/recompensas" element={
              <RotaPrivada usuario={usuario}>
                <Recompensas recompensaData={recompensaData} />
              </RotaPrivada>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;