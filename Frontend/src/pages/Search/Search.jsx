import React, { useEffect, useState, useRef } from 'react';
import './Search.scss';
import { Folders } from '../../FakeFolderData/Data.json';
import { appendFilePath } from '../../Utils/Utils.jsx';
import SearchItem from '../../components/SearchItem/SearchItem.jsx';
function Search() {
  const data = Folders;
  const [options, setOptions] = useState([]);
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  let pathData = [];

  
  function generateOptions(options) {
    return options.map((option, index) => (

      <SearchItem key={option} index={index} item={option}/>
    ));
  }

  function getOptions(data){
    let allData = [];
    data.forEach((folder) => {
      allData.push(folder.path);
      if (folder.folders) {
        allData.push(...getOptions(folder.folders));
      }
      if (folder.files) {
        folder.files.forEach((file) => {
          allData.push(file.path);
        });
      }
    });
    return allData;
  }

  function filterOptions(searchTerm) {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }

  function handleSearchChange(event) {
    const searchValue = event.target.value;
    filterOptions(searchValue);
    setSearchTerm(searchValue);
    filterOptions(searchValue);
  }
  useEffect(() =>{
    pathData = appendFilePath(data, "");
    const allOptions = getOptions(pathData);
    setOptions(allOptions);
    setFilteredOptions(allOptions);
  },[])
  
  return (
    <div className="SearchCont">
      <h1 className="SearchTitle">Search</h1>
      <div className="SearchBarCont">
        <input ref={searchRef} type="search" value={searchTerm} placeholder="Search..." className="SearchInput" onChange={handleSearchChange} />
      </div>
        <div className="SearchResultsCont">
          {generateOptions(filteredOptions)}
        </div>
    </div>
  );
}

export default Search;