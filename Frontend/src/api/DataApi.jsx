import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

/*
    Canvas{
        'user_id' : id_val
        'layout' : json_layout_val
        'title' : title_val
    }

    Folder{
        'user_id': user_id_val,
        'name': folder_name_val,
        'favorite': true/false, (optional)
        'parent_folder_id': parent_folder_id_val (optional)
    }

    Note{
        'user_id' : user_id_val,
        'folder_id' : folder_id_val,
        'title' : title_val,
        'content' : content_val,
        'favorite' : true/false (optional)
    }
*/

export async function getData(username) {
    const response = await axios.get(`${baseURL}/data`, {
        params: {
            username: username
        }
    })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    return response.data;
}

export async function getNoteID(username, folder_id, title) {
    const response = await axios.get(`${baseURL}/data/noteid`, {
        params: {
            username: username,
            folder_id: folder_id,
            title: title
        }
    })
        .catch((error) => {
            console.error("Error fetching note ID:", error);
        });
    return response.data;
}

export async function getFolderID(username, folder_name, parent_folder_id) {
    const response = await axios.get(`${baseURL}/data/folderid`, {
        params: {
            username: username,
            folder_name: folder_name,
            parent_folder_id: parent_folder_id
        }
    })
        .catch((error) => {
            console.error("Error fetching folder ID:", error);
        });
    return response.data;

}

export async function postData(username, data) {
    const response = await axios.post(`${baseURL}/data`, data, {
        params: {
            username: username
        }
    })
        .catch((error) => {
            console.error("Error creating data:", error);
        });
    return response.data;
}

export async function putData(username, data) {
    const response = await axios.put(`${baseURL}/data`, data, {
        params: {
            username: username,
        }
    })
        .catch((error) => {
            console.error("Error updating data:", error);
        });
    return response.data;
}

export async function deleteData(username, data) {
    const response = await axios.delete(`${baseURL}/data`,{
        params: {
            username: username,
            name: data.name? data.name : null,
            parent_folder_id: data.parent_folder_id? data.parent_folder_id : null,
            folder_id: data.folder_id? data.folder_id : null,
            title: data.title? data.title : null,
            type: data.type,
        }
    })
        .catch((error) => {
            console.error("Error deleting data:", error);
        });
    return response.data;
}