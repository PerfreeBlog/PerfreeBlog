export function attachLibraryPageApi(data) {
    return axios.post('/api/auth/attachLibrary/page', data);
}

export function attachLibraryAddApi(data){
    return axios.post('/api/auth/attachLibrary/add', data);
}

export function attachLibraryUpdateApi(data){
    return axios.post('/api/auth/attachLibrary/update', data);
}

export function attachLibraryDelApi(id) {
    return axios.delete('/api/auth/attachLibrary/del?id=' + id);
}

export function attachLibraryGetApi(id) {
    return axios.get('/api/auth/attachLibrary/get?id=' + id);
}

export function attachLibraryListAllApi() {
    return axios.get('/api/auth/attachLibrary/listAll');
}

export function attachLibraryExportExcelApi(data) {
    return axios.post('/api/auth/attachLibrary/export', data, {responseType: 'blob'});
}