export function sitePageApi(data) {
    return axios.post('/api/auth/site/page', data);
}

export function siteAddApi(data) {
    return axios.post('/api/auth/site/add', data);
}

export function siteGetApi(id) {
    return axios.get('/api/auth/site/get?id=' + id);
}

export function siteUpdateApi(data) {
    return axios.post('/api/auth/site/update', data);
}

export function siteDelApi(id) {
    return axios.delete('/api/auth/site/del?id=' + id);
}
