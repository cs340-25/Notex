
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

