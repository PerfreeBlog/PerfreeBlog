export function categoryPageApi(data) {
    return axios.post('/api/auth/category/pageList', data);
}

export function categoryAddApi(data) {
    return axios.post('/api/auth/category/add', data);
}

export function categoryUpdateApi(data) {
    return axios.put('/api/auth/category/update', data);
}

export function categoryGetApi(id) {
    return axios.get('/api/auth/category/get?id=' + id);
}

export function categoryDelApi(id) {
    return axios.delete('/api/auth/category/del?id=' + id);
}
