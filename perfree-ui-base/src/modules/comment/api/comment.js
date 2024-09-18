export function commentPageApi(data) {
    return axios.post('/api/auth/comment/page', data);
}

export function updateStatusApi(data){
    return axios.post('/api/auth/comment/updateStatus', data);
}

export function roleGetRoleApi(id) {
    return axios.get('/api/auth/role/get?id=' + id);
}

export function roleAddApi(data){
    return axios.post('/api/auth/role/add', data);
}

export function roleUpdateApi(data){
    return axios.post('/api/auth/role/update', data);
}

export function commentDelApi(id) {
    return axios.delete('/api/auth/comment/del?id=' + id);
}

export function queryChildCommentPageApi(data) {
    return axios.post('/api/auth/comment/queryChildCommentPage', data);
}

export function submitCommentApi(data) {
    return axios.post('/api/comment/submitComment', data);
}

