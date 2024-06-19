export function articleAddApi(data) {
    return axios.post('/api/auth/article/createArticle', data);
}
