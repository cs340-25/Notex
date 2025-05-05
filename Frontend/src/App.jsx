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
import { getFarthestAncestor } from './Utils/Utils'
function App() {
  const {WorkspaceState, setWorkspaceState, FolderData, setFolderData, rawData, setRawData} = useContext(WorkspaceContext);
  const [SidebarOpen, setSidebarOpen] = useState(true);
  const [RightClickMenuOpt, setRightClickMenuOpt] = useState({x: 0, y: 0, show: false});
  const [SelectedFolderID, setSelectedFolderID] = useState(null);
  const [DeleteObj, setDeleteObj] = useState(null);
  const testLogin = {
    username: "testuser",
    password: "testpass"
  }
  useEffect(() => {
    if(FolderData && rawData){
      setFolderData(formatRawData(rawData));
    }
  }, [rawData]);
  
  useEffect(() => {
    let FormatData;

    const fetchData = async () => {
      const data = await getData(testLogin.username);
      console.log(data);
      setRawData(data);
      FormatData = formatRawData(data);
      console.log(FormatData);
      setFolderData(FormatData);
    };
    fetchData();


    const showMenu = (e) => {
      if(e.target.closest("[data-folder-id]")){
        const folderID = e.target.closest("[data-folder-id]").getAttribute("data-folder-id");
        console.log("Folder ID: ", folderID);
        setSelectedFolderID(folderID);
      }else if(e.target.closest("[is-root]")){
        console.log("Root folder clicked");
        const folderID = e.target.closest("[is-root]").getAttribute("is-root");
        setSelectedFolderID(folderID);
      }
      if(e.target.closest("[delete-id]")){
        // const element = getFarthestAncestor(e.target, "[delete-id]")
        const element = e.target.closest("[delete-id]");
        const deleteID = element.getAttribute("delete-id");
        const deleteType = element.getAttribute("type");
        console.log("Delete ID: ", deleteID, "Type: ", deleteType);
        setDeleteObj({deleteID: deleteID, type: deleteType});
      }
      e.preventDefault();
      setRightClickMenuOpt({ x: e.pageX, y: e.pageY, show: true });
    };
  
    const hideMenu = () => setRightClickMenuOpt({ ...RightClickMenuOpt, show: false });
  
    window.addEventListener("contextmenu", showMenu);
    window.addEventListener("click", hideMenu);
    

    return () => {
      window.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("click", hideMenu);
    };
  },[])

  return (
    <div id="AppCont">
      <Toolbar/>
        <div className="RightClickMenu">
          <RightClickMenu 
          x={RightClickMenuOpt.x} 
          y={RightClickMenuOpt.y} 
          show={RightClickMenuOpt.show} 
          SelectedID={SelectedFolderID} 
          DeleteObj={DeleteObj}/>
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
