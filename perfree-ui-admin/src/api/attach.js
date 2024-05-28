export function attachPageApi(data) {
    return axios.post('/api/attach/page', data);
}

export function getAllAttachGroupApi() {
    return axios.get('/api/attach/getAllAttachGroup');
}

export function attachUpdateApi(data) {
    return axios.put('/api/attach/update', data);
}

export function getAttachApi(id) {
    return axios.get('/api/attach/get?id=' + id);
}

export function attachDelApi(id) {
    return axios.delete('/api/attach/del?id=' + id);
}

export function attachDownloadApi(id) {
    return axios.delete('/api/role/del?id=' + id);
}