export function pluginsPageApi(data) {
    return axios.post('/api/auth/plugins/page', data);
}
