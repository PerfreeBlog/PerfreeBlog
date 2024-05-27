export function menuPageApi(data) {
    return axios.post('/api/menu/page', data);
}


export function menuGetApi(id) {
    return axios.get('/api/menu/get?id=' + id);
}

export function menuAddApi(data) {
    return axios.post('/api/menu/add', data);
}

export function menuUpdateApi(data) {
    return axios.post('/api/menu/update', data);
}

export function menuDelApi(id) {
    return axios.delete('/api/menu/del?id=' + id);
}

export function getRoleMenusApi(id) {
    return axios.get('/api/role/getRoleMenus?id=' + id);
}

export function assignRoleMenuApi(data) {
    return axios.post('/api/role/assignRoleMenu', data);
}

export function menuListApi(data) {
    return axios.post('/api/menu/list', data);
}