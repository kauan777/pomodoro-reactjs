import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {CounterContextProvider } from './context/CountContext'
import { ThemeContextProvider } from './context/ThemeContext'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CounterContextProvider>
      <App />
    </CounterContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
)
