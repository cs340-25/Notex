import React from 'react';
import './Search.scss';
import SearchBar from '../../components/SearchBar/SearchBar';

function Search() {
  return (
    <div className="SearchCont">
      <h1 className="SearchTitle">Search</h1>
      <div className="SearchBarCont">
        <SearchBar/>
      </div>
    </div>
  );
}

export default Search;