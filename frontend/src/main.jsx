import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 👈 importante
import App from './App.jsx'

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
