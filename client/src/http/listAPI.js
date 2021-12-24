import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const createList = async (name, color) => {
    const {data} = await instance.post('api/list', {name, color})
    return data
}

export const getLists = async () => {
    const {data} = await instance.get('api/list')
    return data
}

export const renameLists = async (id, name) => {
    const {data} = await instance.put(`api/list/${id}`, {name})
    return data
}

export const deleteLists = async (id) => {
    const {data} = await instance.delete(`api/list/${id}`)
    return data
}
