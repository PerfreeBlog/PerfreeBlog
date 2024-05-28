export function attachConfigPageApi(data) {
    return axios.post('/api/attachConfig/page', data);
}


export function attachConfigAddApi(data) {
    return axios.post('/api/attachConfig/add', data);
}

export function attachConfigUpdateApi(data) {
    return axios.put('/api/attachConfig/update', data);
}

export function getAttachConfigApi(id) {
    return axios.get('/api/attachConfig/get?id=' + id);
}

export function attachConfigUpdateMasterApi(data){
    return axios.put('/api/attachConfig/updateMaster', data);
}

export function attachConfigDelApi(id) {
    return axios.delete('/api/attachConfig/del?id=' + id);
}

export function getAllAttachConfigApi() {
    return axios.get('/api/attachConfig/getAll');
}