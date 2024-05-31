export function sitePageApi(data) {
    return axios.post('/api/site/page', data);
}

export function siteAddApi(data) {
    return axios.post('/api/site/add', data);
}

export function siteGetApi(id) {
    return axios.get('/api/site/get?id=' + id);
}

export function siteUpdateApi(data) {
    return axios.post('/api/site/update', data);
}

export function siteDelApi(id) {
    return axios.delete('/api/site/del?id=' + id);
}
