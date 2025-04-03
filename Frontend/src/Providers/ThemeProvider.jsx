import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(true);

    /* get the custom colors saved, else, use default dark mode settings*/
    const [customColors, setCustomColors] = useState({
        primary: localStorage.getItem('--PrimaryColor') || '#494343',
        secondary: localStorage.getItem('--SecondaryColor') || '#272020',
        background: localStorage.getItem('--BackgroundColor') || '#1b1313',
        tertiary: localStorage.getItem('--TertiaryColor') || '#7b1e1e',
        text: localStorage.getItem('--PrimaryTextColor') || '#DFDFDF'
    });


    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        
    };

    useEffect(() =>{
        document.documentElement.style.setProperty(
            '--PrimaryColor',
            isDarkMode ? '#494343' : '#e3d5ca'
        );
        document.documentElement.style.setProperty(
            '--SecondaryColor',
            isDarkMode ? '#272020' : '#f5ebe0'
        );
        document.documentElement.style.setProperty(
            '--BackgroundColor',
            isDarkMode ? '#1b1313' : '#d6ccc2'
        );
        document.documentElement.style.setProperty(
            '--TertiaryColor',
            isDarkMode ? '#804F4F' : '#cf9963'
        );
        document.documentElement.style.setProperty(
            '--TertiaryColorDark',
            isDarkMode ? '#432a2a' : '#4f3a24'
        );
        document.documentElement.style.setProperty(
            '--PrimaryTextColor',
            isDarkMode ? '#DFDFDF' : '#382c26'
        );
        document.documentElement.style.setProperty(
            '--SecondaryTextColor',
            isDarkMode ? '#767676' : '#73655d'
        );
        document.documentElement.style.setProperty(
            '--BoxShadow',
            isDarkMode ? '-2px -2px 5px rgba(255, 255, 255, .1)' : '2px 2px 5px rgba(0, 0, 0, .1)'
        );

    }, [isDarkMode])
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};