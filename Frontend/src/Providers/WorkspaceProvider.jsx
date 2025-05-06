import { createContext, useState, useEffect } from "react";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({children}) => {
    const [WorkspaceState, setWorkspaceState] = useState("Home");
    const [FolderData, setFolderData] = useState(null);
    const [rawData, setRawData] = useState(null);
    
    return (
        <WorkspaceContext.Provider value={{WorkspaceState, setWorkspaceState, FolderData, setFolderData, rawData, setRawData}}>
            {children}
        </WorkspaceContext.Provider>
    );
};