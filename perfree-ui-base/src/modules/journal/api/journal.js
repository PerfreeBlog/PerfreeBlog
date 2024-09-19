export function journalPageApi(data) {
    return axios.post('/api/auth/journal/page', data);
}

export function articleUpdateIsCommentApi(data) {
    return axios.post('/api/auth/article/updateIsComment', data);
}

export function articleUpdateIsTopApi(data) {
    return axios.post('/api/auth/article/updateIsTop', data);
}

export function articleDelApi(id) {
    return axios.delete('/api/auth/article/del?id=' + id);
}
