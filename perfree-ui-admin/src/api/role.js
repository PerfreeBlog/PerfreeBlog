export function rolePageApi(data) {
    return axios.post('/api/role/page', data);
}

export function roleGetRoleApi(id) {
    return axios.get('/api/role/get?id=' + id);
}

export function roleAddOrUpdateApi(data){
    return axios.post('/api/role/addOrUpdate', data);
}

export function roleDelApi(id) {
    return axios.delete('/api/role/del?id=' + id);
}