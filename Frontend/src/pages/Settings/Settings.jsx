import React from 'react';
import './Settings.scss';
import Switch from '../../components/Switch/Switch';
function Settings() {
  return (
    <div className="SettingsCont">
      <h1 className="SettingsTitle">Settings</h1>
      <div className="SettingsOptions">
        <div className="Option" id="DarkMode">
          <p>Dark Mode</p>
          <Switch />
        </div>
        <div className="Option">Option 2</div>
      </div>
    </div>
  );
}

export default Settings;