import axios from "axios";

const baseURL = "";

/*
    Canvas{
        'user_id' : user_id_val,
        'folder_id' : folder_id_val, 
        'image_data' : image_data_bytes_val, 
        'filename' : filename_val
    }

    Folder{
        'user_id': user_id_val,
        'name': folder_name_val,
        'parent_folder_id': parent_folder_id_val (optional)
    }

    Note{
        'user_id' : user_id_val,
        'folder_id' : folder_id_val,
        'title' : title_val,
        'content' : content_val
    }
*/

async function getData(username) {
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

async function postData(username, data) {
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

async function putData(username, password, data) {
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

async function deleteData(username, password, data) {
    const response = await axios.delete(`${baseURL}/data`, data,{
        params: {
            username: username,
        }
    })
        .catch((error) => {
            console.error("Error deleting data:", error);
        });
    return response.data;
}