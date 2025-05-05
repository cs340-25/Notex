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
import { formatRawData } from './Utils/Utils'
import RightClickMenu from './components/RightClickMenu/RightClickMenu'

function App() {
  const {WorkspaceState, setWorkspaceState, FolderData, setFolderData, rawData, setRawData} = useContext(WorkspaceContext);
  const [SidebarOpen, setSidebarOpen] = useState(true);
  const [RightClickMenuOpt, setRightClickMenuOpt] = useState({x: 0, y: 0, show: false});
  const [SelectedFolderID, setSelectedFolderID] = useState(null);
  const testLogin = {
    username: "testuser",
    password: "testpass"
  }
  useEffect(() => {
    
  }, []);
  
  useEffect(() => {
    const showMenu = (e) => {
      if(e.target.closest("[data-folder-id]")){
        const folderID = e.target.closest("[data-folder-id]").getAttribute("data-folder-id");
        console.log("Folder ID: ", folderID);
        setSelectedFolderID(folderID);
      }
      e.preventDefault();
      setRightClickMenuOpt({ x: e.pageX, y: e.pageY, show: true });
    };
  
    const hideMenu = () => setRightClickMenuOpt({ ...RightClickMenuOpt, show: false });
  
    window.addEventListener("contextmenu", showMenu);
    window.addEventListener("click", hideMenu);
    

    const fetchData = async () => {
      const data = await getData(testLogin.username);
      console.log(data);
      setRawData(data);
      let FormatData = formatRawData(data);
      console.log(FormatData);
      setFolderData(FormatData);
    };
    fetchData();

    return () => {
      window.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("click", hideMenu);
    };
  },[])

  function handleRightClickMenuClick(e) {
    console.log("Right click menu clicked", e);
    console.log(SelectedFolderID)
    const folder = rawData.folders.find((folder) => folder.id == SelectedFolderID);
    if(folder){
      console.log("Folder: ", folder);
    }
  }
  return (
    <div id="AppCont">
      <Toolbar/>
        <div className="RightClickMenu">
          <RightClickMenu x={RightClickMenuOpt.x} y={RightClickMenuOpt.y} show={RightClickMenuOpt.show} onClick={handleRightClickMenuClick} SelectedID={SelectedFolderID}/>
        </div>
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
