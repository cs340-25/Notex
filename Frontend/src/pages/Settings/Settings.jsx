import React, { useState, useEffect } from 'react';
import './Settings.scss';

function Settings() {
  const [primaryTextColor, setPrimaryTextColor] = useState('#DFDFDF');
  const [secondaryColor, setSecondaryColor] = useState('#272020');

  const updateTheme = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
    localStorage.setItem(variable, value);
  };

  
  useEffect(() => {
    const storedPrimary = localStorage.getItem('--PrimaryTextColor');
    const storedSecondary = localStorage.getItem('--SecondaryColor');

    if (storedPrimary) {
      setPrimaryTextColor(storedPrimary);
      updateTheme('--PrimaryTextColor', storedPrimary);
    }
    if (storedSecondary) {
      setSecondaryColor(storedSecondary);
      updateTheme('--SecondaryColor', storedSecondary);
    }
  }, []); 

  return (
    <div className="SettingsCont">
      <h2>Theme Settings</h2>

      <div className="ColorPicker">
        <label>Primary Text Color:</label>
        <input 
          type="color" 
          value={primaryTextColor} 
          onChange={(e) => {
            setPrimaryTextColor(e.target.value);
            updateTheme('--PrimaryTextColor', e.target.value);
          }} 
        />
      </div>


      <div className="ColorPicker">
        <label>Secondary Color:</label>
        <input 
          type="color" 
          value={secondaryColor} 
          onChange={(e) => {
            setSecondaryColor(e.target.value);
            updateTheme('--SecondaryColor', e.target.value);
          }} 
        />
      </div>
    </div>
  );
}

export default Settings;