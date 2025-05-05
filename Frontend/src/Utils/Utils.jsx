import {Note, Folder, Image, Canvas} from '../Models/DataTypes'
export function unPackDataFilename(Folders){
    let allData = [];
    
    Folders.forEach((folder) => {
        allData.push(folder.name);
        if (folder.folders){
            allData.push(...unPackDataFilename(folder.folders));
        }
        if (folder.files){
            folder.files.forEach((file) => {
                allData.push(file.name);
            })
        }
    })

    // return allData;
} 

export function appendFilePath(Folders, path=""){
    return Folders.map((folder) => {
        folder.path = path + folder.name + "/";
        if (folder.folders){
            folder.folders = appendFilePath(folder.folders, path + folder.name + "/");
        }
        if (folder.files){
            folder.files.forEach((file) => {
                file.path = path + folder.name + "/" + file.name;
            })
        }
        return folder;
                
    })
}



export function formatRawData(rawData) {
    let root = rawData.folders.find((folder) => {
        return folder.parent_folder_id === null && folder.name === "root";
    });

    if (root) {
        root = new Folder(rawData.user.id, root.id, root.name, root.favorite, root.parent_folder_id);
    }
    
    let rootFolder = FormatDataRecur(rawData, root, rawData.user.id);
    if(rootFolder){
        return rootFolder;
    }

    return null; // Return null if no root folder is found
}

function FormatDataRecur(rawData, folder, user_id) {
    let folderObjects = addFolders(rawData.folders, folder.id, user_id);
    let noteObjects = addNotes(rawData.notes, folder.id, user_id);
    let imageObjects = addImages(rawData.images, folder.id, user_id);
    let canvasObjects = addCanvas(rawData.canvas, folder.id, user_id);

    folder.folders = folderObjects;
    folder.notes = noteObjects;
    folder.images = imageObjects;
    folder.canvas = canvasObjects;
    if(folder.folders.length != 0){
        folder.folders.forEach((subfolder) => {
            FormatDataRecur(rawData, subfolder, user_id);
        });
    }
    return folder;

}

function addImages(images, folder_id, user_id) {
    let imageObjects = [];
    images.forEach((image) => {
        // console.log("Comparing image folder id: ", image.folder_id, " with root folder id: ", folder_id);
        if(image.folder_id == folder_id){
            imageObjects.push(new Image(user_id, folder_id, image.image_data, image.filename));
        }
    })
    return imageObjects;
}

function addCanvas(canvas, folder_id, user_id) {
    let canvasObjects = [];
    canvas.forEach((canv) => {
        // console.log("Comparing canvas folder id: ", canv.folder_id, " with root folder id: ", folder_id);
        if(canv.folder_id == folder_id){
            canvasObjects.push(new Canvas(user_id, folder_id, canv.layout, canv.title));
        }
    })
    return canvasObjects;
}

function addFolders(folders, parent_folder_id, user_id) {
    let folderObjects = [];
    folders.forEach((folder) => {
        // console.log("Comparing folder parent id: ", folder.parent_folder_id, " with root folder id: ", parent_folder_id);
        if(folder.parent_folder_id == parent_folder_id){
            folderObjects.push(new Folder(user_id, folder.id, folder.name, folder.favorite, folder.parent_folder_id));
        }
    })

    return folderObjects;
}

function addNotes(notes, folder_id, user_id) {
    let noteObjects = [];
    notes.forEach((note) => {
        // console.log("Comparing note folder id: ", note.folder_id, " with root folder id: ", folder_id);
        if(note.folder_id == folder_id){
            noteObjects.push(new Note(user_id, note.id, note.title, note.content, note.favorite, folder_id));
        }
    })
    return noteObjects;
}

export function getFarthestAncestor(element, selector) {
    let current = element;
    let farthestMatch = null;
  
    while (current) {
      if (current.matches && current.matches(selector)) {
        farthestMatch = current; // keep updating until the top
      }
      current = current.parentElement;
    }
  
    return farthestMatch;
  }