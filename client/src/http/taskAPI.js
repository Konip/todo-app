import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const createTask = async (obj) => {
    const {data} = await instance.post('api/task', obj)
    return data
}

export const getOneTask = async (id) => {
    const {data} = await instance.get(`api/task/${id}`)
    return data
}

export const getAllTasks = async () => {
    const {data} = await instance.get('api/tasks')
    return data
}

export const renameTask = async (id, name) => {
    const {data} = await instance.put(`api/task/${id}`, {name})
    return data
}

export const completedTask = async (id, status) => {
    const {data} = await instance.put(`api/completedTask/${id}`, {status})
    return data
}

export const deleteTask = async (id) => {
    const {data} = await instance.delete(`api/task/${id}`)
    return data
}