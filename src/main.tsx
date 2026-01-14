import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ColorsCanvas from './ColorCanvas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorsCanvas />
  </StrictMode>,
)
