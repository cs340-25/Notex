import React, { useState, useContext, useEffect } from 'react';
import './Settings.scss';
import Switch from '../../components/Switch/Switch';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

function Settings() {
  const { toggleTheme } = useContext(ThemeContext);
  const [isCustomOpen, setIsCustomOpen] = useState(false);


  const defaultColors = {
    '--PrimaryColor': '#494343',
    '--SecondaryColor': '#272020',
    '--TertiaryColor': '#7b1e1e',
    '--PrimaryTextColor': '#DFDFDF',
    '--SecondaryTextColor': '#767676'
  };

  /* custom colors  */
  const [customColors, setCustomColors] = useState({
    '--PrimaryColor': localStorage.getItem('--PrimaryColor') || '#494343',
    '--SecondaryColor': localStorage.getItem('--SecondaryColor') || '#272020',
    '--TertiaryColor': localStorage.getItem('--TertiaryColor') || '#7b1e1e',
    '--PrimaryTextColor': localStorage.getItem('--PrimaryTextColor') || '#DFDFDF',
    '--SecondaryTextColor': localStorage.getItem('--SecondaryTextColor') || '#767676'
  });

  /* labels for the custom options*/
  const labelMap = {
    '--PrimaryColor': 'Primary Color',
    '--SecondaryColor': 'Secondary Color',
    '--TertiaryColor': 'Tertiary Color',
    '--PrimaryTextColor': 'Primary Text Color',
    '--SecondaryTextColor': 'Secondary Text Color'
  };

  const resetColors = () => {
    Object.keys(defaultColors).forEach((key) => {
      document.documentElement.style.setProperty(key, defaultColors[key]);
      localStorage.setItem(key, defaultColors[key]);
    });
    setCustomColors(defaultColors);
  };


  const updateTheme = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
    localStorage.setItem(variable, value); //save values
    setCustomColors((prev) => ({ ...prev, [variable]: value }));
  };



  // useEffect(() => {
  //   Object.keys(customColors).forEach((key) => {
  //     document.documentElement.style.setProperty(key, customColors[key]);
  //   });
  // }, []); //weird autoformatting, but sets property for each key 

  return (
    <div className="SettingsCont">
      <h1 className="SettingsTitle">Settings</h1>
      <div className="SettingsOptions">

        {/* toggle dark  */}
        <div className="Option" id="DarkMode">
          <p>Dark Mode</p>
          <Switch onChange={toggleTheme} />
        </div>

        <div className="Option">Option 2</div>

        {/* custom theme settings, dropdown add anim to it */}
        <div className="Option CustomToggle" onClick={() => setIsCustomOpen(!isCustomOpen)}>
          <p>Custom Theme</p>
          <span>{isCustomOpen ? <FiChevronDown /> : <FiChevronRight />}</span>
        </div>


        {isCustomOpen && (
          <div className="CustomColors">
            {Object.keys(customColors).map((key) => (
              <div key={key} className="ColorPicker">
                <label>{labelMap[key]}</label>
                <input type="color" value={customColors[key]} onChange={(e) => updateTheme(key, e.target.value)} />
              </div>
            ))}

            <button className="ResetButton" onClick={resetColors}>Reset to Default</button>
          </div>

        )}


        <div>Lorem Ipsum</div>

      </div>
    </div>
  );
}

export default Settings;