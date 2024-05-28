export function userPageApi(data) {
    return axios.post('/api/user/page', data);
}

export function getUserApi(id) {
    return axios.get('/api/user/get?id=' + id);
}

export function addUserApi(data){
    return axios.post('/api/user/add', data);
}

export function updateUserApi(data){
    return axios.post('/api/user/update', data);
}
export function delUserApi(id) {
    return axios.delete('/api/user/del?id=' + id);
}

export function updateUserRoleApi(data) {
    return axios.post('/api/user/updateUserRole', data);
}

export function getUserRoleApi(id) {
    return axios.get('/api/user/getUserRole?id=' + id);
}


export function resetPasswordApi(data) {
    return axios.post('/api/user/resetPassword', data);
}