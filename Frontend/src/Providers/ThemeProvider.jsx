import { createContext, useState} from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.style.setProperty(
            '--PrimaryColor', 
            isDarkMode ? '#e3d5ca' : '#494343'
        );
        document.documentElement.style.setProperty(
            '--SecondaryColor', 
            isDarkMode ? '#f5ebe0' : '#272020'
        );
        document.documentElement.style.setProperty(
            '--BackgroundColor', 
            isDarkMode ? '#d6ccc2' : '#1b1313'
        );
        document.documentElement.style.setProperty(
            '--TertiaryColor', 
            isDarkMode ? '#cf9963' : '#7b1e1e'
        );
        document.documentElement.style.setProperty(
            '--TertiaryColorDark', 
            isDarkMode ? '#4f3a24' : '#5a1515'
        );
        document.documentElement.style.setProperty(
            '--PrimaryTextColor', 
            isDarkMode ? '#382c26' : '#DFDFDF'
        );
        document.documentElement.style.setProperty(
            '--SecondaryTextColor', 
            isDarkMode ? '#73655d' : '#767676'
        );
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};