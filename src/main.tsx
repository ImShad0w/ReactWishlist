import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' //For creating the DOM and adding the 
import "./index.css"; //TailwindCSS
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
