export function saveCurrentThemeSettingApi(data) {
    return axios.post('/api/auth/option/saveCurrentThemeSetting', data);
}

export function getCurrentThemeSettingValueApi() {
    return axios.get('/api/auth/option/getCurrentThemeSettingValue');
}

