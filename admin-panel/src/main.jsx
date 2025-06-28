import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext.jsx'
import {  AuthProvider } from './context/AuthContext.jsx'
import { CareerProvider } from './context/CareerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <PortfolioProvider>
      <AuthProvider>
        <CareerProvider>
    <App />
    </CareerProvider>
    </AuthProvider>
    </PortfolioProvider>
    </HashRouter>
  </StrictMode>,
)
