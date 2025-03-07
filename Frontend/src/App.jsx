import { useState, useContext } from 'react'
import Folderbar from './components/Folderbar/Folderbar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import Search from './pages/Search/Search'
import NotesEditor from './pages/NoteEditor/NoteEditor'
import Settings from './pages/Settings/Settings'
import Profile from './pages/Profile/Profile'
import { WorkspaceContext } from './Providers/WorkspaceProvider'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import './App.scss'

function App() {
  const {WorkspaceState, setWorkspaceState} = useContext(WorkspaceContext);
  const [SidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div id="App">
      <div className={`SideColumn ${SidebarOpen ? "" : "SCClosed"}`}>
        <Sidebar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Folderbar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
      </div>
      <div className="Workspace">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Favorites" element={<Favorites />}/>
          <Route path="/Search" element={<Search />}/>
          <Route path="/NoteEditor" element={<NotesEditor />}/>
          <Route path="/Settings" element={<Settings />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="*" element={<Home/>}/>
        </Routes>

      </div>

    </div>
  )
}

export default App
