export function articleAddApi(data) {
    return axios.post('/api/auth/article/createArticle', data);
}

export function articlePageApi(data) {
    return axios.post('/api/auth/article/page', data);
}

export function articleUpdateIsCommentApi(data) {
    return axios.post('/api/auth/article/updateIsComment', data);
}

export function articleUpdateIsTopApi(data) {
    return axios.post('/api/auth/article/updateIsTop', data);
}

export function articleUpdateVisibilityApi(data) {
    return axios.put('/api/auth/article/updateVisibility', data);
}

export function articleUpdateStatusApi(data) {
    return axios.post('/api/auth/article/updateStatus', data);
}

export function articleDelApi(id) {
    return axios.delete('/api/auth/article/del?id=' + id);
}

export function articleGetApi(id) {
    return axios.get('/api/auth/article/get?id=' + id);
}

export function updateArticleApi(data) {
    return axios.put('/api/auth/article/updateArticle', data);
}
