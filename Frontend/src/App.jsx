import { useState, useContext, useEffect } from 'react'
import Toolbar from './components/Toolbar/Toolbar'
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
import { getData } from './api/DataApi'
import { Note, Folder, Image, Canvas } from './Models/DataTypes'
import { formatRawData } from './Utils/Utils'

function App() {
  const {WorkspaceState, setWorkspaceState, FolderData, setFolderData} = useContext(WorkspaceContext);
  const [SidebarOpen, setSidebarOpen] = useState(true);
  const testLogin = {
    username: "testuser",
    password: "testpass"
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(testLogin.username);
      console.log(data);
      let FormatData = formatRawData(data);
      console.log(FormatData);
      setFolderData(FormatData);
    };
    fetchData();
  },[])
  useEffect(() => {
    console.log("Folder data: ", FolderData);
  }, [FolderData])
  return (
    <div id="AppCont">
      <Toolbar/>
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
    </div>
  )
}

export default App
