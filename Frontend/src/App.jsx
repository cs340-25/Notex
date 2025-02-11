import { useState } from 'react'
import Folderbar from '../Components/Folderbar/Folderbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Workspace from '../Components/Workspace/Workspace'
import './App.scss'

function App() {

  return (
    <div id="App">
      <Sidebar />
      <Folderbar />
      <Workspace />
    </div>
  )
}

export default App
