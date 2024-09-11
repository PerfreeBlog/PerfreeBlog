export function getCodeImg() {
    return axios.post('/api/captchaImage', {});
}

export function login(data) {
    return axios.post('/api/login', data);
}

export function menuAdminList() {
    return axios.get('/api/auth/menuAdminList');
}

export function isDemoModelApi() {
    return axios.get('/api/isDemoModel');
}

export function userInfo() {
    return axios.get('/api/auth/userInfo');
}

export function getOptionByNoAuth() {
    return axios.get('/api/getOptionByNoAuth');
}

export function register(data) {
    return axios.post('/api/register', data);
}

export function refreshTokenApi(data) {
    return axios.post('/api/refreshToken', data);
}

