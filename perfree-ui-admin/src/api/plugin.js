export function pluginsPageApi(data) {
    return axios.post('/api/auth/plugins/page', data);
}


export function disablePluginApi(id) {
    return axios.post('/api/auth/plugins/disablePlugin?id=' + id);
}

export function enablePluginApi(id) {
    return axios.post('/api/auth/plugins/enablePlugin?id=' + id);
}
