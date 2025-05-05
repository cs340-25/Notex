import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { WorkspaceProvider } from './Providers/WorkspaceProvider.jsx'
import { ThemeProvider } from './Providers/ThemeProvider.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Providers/AuthContext.jsx' 


createRoot(document.getElementById('root')).render(
  <Router>
  <StrictMode>
    <ThemeProvider>
    <WorkspaceProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </WorkspaceProvider>
    </ThemeProvider>
  </StrictMode>
  </Router>,
)
