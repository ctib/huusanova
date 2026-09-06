import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Lokal gebundelt statt per CDN, damit die Formeln im Grundlagen-Bereich
// auch offline und hinter restriktiven Netzen rendern.
import 'katex/dist/katex.min.css'
import './index.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
