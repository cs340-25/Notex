import { createContext, useState } from "react";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({children}) => {
    const [WorkspaceState, setWorkspaceState] = useState("Home");
    return (
        <WorkspaceContext.Provider value={{WorkspaceState, setWorkspaceState}}>
            {children}
        </WorkspaceContext.Provider>
    );
};