export function linkPageApi(data) {
    return axios.post('/api/auth/link/page', data);
}

export function linkAddApi(data) {
    return axios.post('/api/auth/link/add', data);
}

export function linkUpdateApi(data) {
    return axios.put('/api/auth/link/update', data);
}

export function getLinkApi(id) {
    return axios.get('/api/auth/link/get?id=' + id);
}

export function linkDelApi(id) {
    return axios.delete('/api/auth/link/del?id=' + id);
}