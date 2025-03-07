import { useState, useContext } from 'react'
import Folderbar from './components/Folderbar/Folderbar'
import Sidebar from './components/Sidebar/Sidebar'
import Workspace from './components/Workspace/Workspace'
import { WorkspaceContext } from './Providers/WorkspaceProvider'
import './App.scss'
import { use } from 'react'

function App() {
  const {WorkspaceState, setWorkspaceState} = useContext(WorkspaceContext);
  const [SidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div id="App">
      <div className={`SideColumn ${SidebarOpen ? "" : "SCClosed"}`}>
        <Sidebar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Folderbar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
      </div>
      <Workspace />
    </div>
  )
}

export default App
