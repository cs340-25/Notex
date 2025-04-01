import axios from "axios";

const baseURL = "";

async function getAuth() {

}

async function getUser(username, password) {
    const response = await axios.get(`${baseURL}/user`,
        {
            params: {
                username: username,
                password: password
            }
        }
    )
        .catch((error) => {
            console.error("Error fetching user:", error);
        });
    return response.data;
}

async function postUser(data) {
    const response = await axios.post(`${baseURL}/user`, data)
        .catch((error) => {
            console.error("Error creating user:", error);
        });
    return response.data;
}

async function putUser(username, password, newData) {
    const response = await axios.put(`${baseURL}/user`, newData, 
        {
            params: {
                username: username,
                password: password
            }
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    return response.data;
}

async function deleteUser(username, password) {
    const response = await axios.delete(`${baseURL}/user`, 
        {
            params: {
                username: username,
                password: password
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    return response.data;
}

