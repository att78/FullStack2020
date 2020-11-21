import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}

const erase = (id) => {

    return axios.delete(`${baseUrl}/${id}`)
}


export default {
    getAll: getAll,
    create: create,
    update: update,
    erase: erase
}