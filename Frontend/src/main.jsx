import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { WorkspaceProvider } from './Providers/WorkspaceProvider.jsx'
import { ThemeProvider } from './Providers/ThemeProvider.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
  <StrictMode>
    <ThemeProvider>
    <WorkspaceProvider>
      <App />
    </WorkspaceProvider>
    </ThemeProvider>
  </StrictMode>
  </Router>,
)
