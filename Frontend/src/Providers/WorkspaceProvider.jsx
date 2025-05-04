import { createContext, useState, useEffect } from "react";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({children}) => {
    const [WorkspaceState, setWorkspaceState] = useState("Home");
    const [FolderData, setFolderData] = useState(null);

    
    return (
        <WorkspaceContext.Provider value={{WorkspaceState, setWorkspaceState, FolderData, setFolderData}}>
            {children}
        </WorkspaceContext.Provider>
    );
};