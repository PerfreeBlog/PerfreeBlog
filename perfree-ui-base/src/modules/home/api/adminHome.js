
export function getHomeStatisticApi() {
    return axios.get('/api/auth/adminHome/getHomeStatistic');
}


export function getLatestArticleApi(num) {
    return axios.get('/api/article/getLatestArticle?num=' + num);
}

export function getLatestCommentApi(num) {
    return axios.get('/api/comment/getLatestComment?num=' + num);
}
