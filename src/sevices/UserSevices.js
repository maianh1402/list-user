import axios from './axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}
const createUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })
}
const updateUser = (name, job, page) => {
    return axios.put(`/api/users/${page}`, { name, job })
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
const loginUser = (email, password) => {
    return axios.post(`/api/login`, { email, password })
}

export { fetchAllUser, createUser, updateUser, deleteUser, loginUser }