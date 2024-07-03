export function saveCurrentThemeSettingApi(data) {
    return axios.post('/api/auth/option/saveCurrentThemeSetting', data);
}



