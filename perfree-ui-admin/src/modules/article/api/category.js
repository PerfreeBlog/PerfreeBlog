export function categoryListTreeApi(data) {
    return axios.post('/api/auth/category/listTree', data);
}