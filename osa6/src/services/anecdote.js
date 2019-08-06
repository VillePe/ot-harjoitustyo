import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const createNew = async (data) => {
    const response = await axios.post(baseUrl, data);
    return response.data;
}

const deleteItem = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response;
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
}

export default {getAll, createNew, deleteItem, update}