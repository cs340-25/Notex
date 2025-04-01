import axios from "axios";

const baseURL = "";

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

async function putData(username, data) {
    const response = await axios.put(`${baseURL}/data`, data, {
        params: {
            username: username
        }
    })
        .catch((error) => {
            console.error("Error updating data:", error);
        });
    return response.data;
}

async function deleteData(username, data) {
    const response = await axios.delete(`${baseURL}/data`, data,{
        params: {
            username: username
        }
    })
        .catch((error) => {
            console.error("Error deleting data:", error);
        });
    return response.data;
}