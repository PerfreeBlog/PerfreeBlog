export function articleAddApi(data) {
    return axios.post('/api/auth/page/createArticle', data);
}

export function articlePageApi(data) {
    return axios.post('/api/auth/article/page', data);
}

export function articleUpdateIsCommentApi(data) {
    return axios.post('/api/auth/page/updateIsComment', data);
}

export function articleUpdateIsTopApi(data) {
    return axios.post('/api/auth/page/updateIsTop', data);
}

export function articleUpdateStatusApi(data) {
    return axios.post('/api/auth/page/updateStatus', data);
}

export function articleDelApi(id) {
    return axios.delete('/api/auth/page/del?id=' + id);
}

export function articleGetApi(id) {
    return axios.get('/api/auth/article/get?id=' + id);
}

export function updateArticleApi(data) {
    return axios.put('/api/auth/page/updateArticle', data);
}
