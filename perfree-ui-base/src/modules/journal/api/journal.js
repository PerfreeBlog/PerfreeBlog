export function journalPageApi(data) {
    return axios.post('/api/auth/journal/page', data);
}

export function articleUpdateIsCommentApi(data) {
    return axios.post('/api/auth/journal/updateIsComment', data);
}

export function articleUpdateIsTopApi(data) {
    return axios.post('/api/auth/journal/updateIsTop', data);
}

export function articleDelApi(id) {
    return axios.delete('/api/auth/journal/del?id=' + id);
}
