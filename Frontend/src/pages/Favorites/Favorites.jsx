import React from 'react';
import './Favorites.scss';
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import Image from "../../assets/Images/general-img-square.png"; 

function Favorites() {
  const favoriteFolders = ["folder1", "folder2", "folder3"];
  // const favoriteFolders = [];
  const favoriteFiles = ["file4", "file5", "file6"];
  function getFavoriteFolders(){
    if(favoriteFolders.length === 0){
      return <div className="NoFavorites">
          <h3 className="NoFavTitle">No favorite folders yet :(</h3>
        </div>
    }
    return favoriteFolders.map((folder, index) => {
      return (
        <div className="FolderCont" key={index}>
          <IoIosStar className="StarIcon" />
          <h3 className="FolderName">{folder}</h3>
        </div>
      );
    });
    
  }

  function getFavoriteFiles(){
    if(favoriteFiles.length === 0){
      return <div className="NoFavorites">
          <h3 className="NoFavTitle">No favorite files yet :(</h3>
        </div>
    }
    return favoriteFiles.map((file, index) => {
      return (
        <div className="FileCont" key={index}>
          <h3 className="FileName">{file}</h3>
          <img src={Image} alt="File" className="FileImage" />
        </div>
      );
    });
  }
  return (
    <div className="FavoritesCont">
      <h1 className="FavoritesTitle">Favorites</h1>
      <div className="FavoritesMainCont">
        <h2 className="FoldersTitle">Favorite Folders</h2>
        <div className="FoldersCont">
          {getFavoriteFolders()}  
        </div>
        <h2 className="FilesTitle">Favorite Files</h2>
        <div className="FilesCont">

          {getFavoriteFiles()}
        </div>
      </div>
    </div>
  );
}

export default Favorites;