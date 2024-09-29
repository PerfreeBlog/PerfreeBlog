export function attachLibraryItemsPageApi(data) {
    return axios.post('/api/auth/attachLibraryItems/page', data);
}

export function attachLibraryItemsBatchAddApi(data) {
    return axios.post('/api/auth/attachLibraryItems/batchAdd', data);
}
export function attachLibraryItemsAddApi(data){
    return axios.post('/api/auth/attachLibraryItems/add', data);
}

export function attachLibraryItemsUpdateApi(data){
    return axios.post('/api/auth/attachLibraryItems/update', data);
}

export function attachLibraryItemsDelApi(id) {
    return axios.delete('/api/auth/attachLibraryItems/del?id=' + id);
}

export function attachLibraryItemsGetApi(id) {
    return axios.get('/api/auth/attachLibraryItems/get?id=' + id);
}

export function attachLibraryItemsListAllApi() {
    return axios.get('/api/auth/attachLibraryItems/listAll');
}

export function attachLibraryItemsExportExcelApi(data) {
    return axios.post('/api/auth/attachLibraryItems/export', data, {responseType: 'blob'});
}
