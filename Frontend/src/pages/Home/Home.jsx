import React, { useState, useEffect } from 'react';
import './Home.scss';
import data from '../../FakeFolderData/Data.json';
import { IoFolder, IoDocumentText, IoFolderOpen } from "react-icons/io5";


function Home() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (data.Folders) {
      setFolders(data.Folders);
    }
  }, []);

  return (
    <div className="HomeCont">
      <header className="HomeHeader">
        <h1>notex</h1>
        <div className="Menu">
          <button onClick={() => alert('open folder')}><IoFolderOpen />Open Folder</button>
          <button onClick={() => alert('makes a file')}><IoDocumentText />Make File</button>
        </div>
      </header>

      <div className="GridContainer">
        {folders.map((folder) => (
          <div key={folder.id} className="GridItem folder">
            <IoFolder />{folder.name}
          </div>
        ))}

        {folders.flatMap(folder => folder.files || []).map((file) => (
          <div key={file.id} className="GridItem file">
            <IoDocumentText />{file.name}.{file.type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;