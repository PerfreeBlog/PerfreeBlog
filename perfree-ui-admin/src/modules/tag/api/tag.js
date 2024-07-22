export function tagPageApi(data) {
    return axios.post('/api/auth/tag/page', data);
}

export function tagAddApi(data) {
    return axios.post('/api/auth/tag/add', data);
}

export function tagGetApi(id) {
    return axios.get('/api/auth/tag/get?id=' + id);
}

export function tagUpdateApi(data) {
    return axios.put('/api/auth/tag/update', data);
}

export function tagDelApi(id) {
    return axios.delete('/api/auth/tag/del?id=' + id);
}
