export function allThemeApi() {
    return axios.get('/api/auth/theme/allTheme');
}

export function swatchThemeApi(themeName) {
    return axios.post('/api/auth/theme/swatchTheme?themeName=' + themeName);
}

export function unInstallThemeApi(themeName) {
    return axios.delete('/api/auth/theme/unInstallTheme?themeName=' + themeName);
}

export function getCurrentThemeSettingApi() {
    return axios.get('/api/auth/theme/getCurrentThemeSetting');
}


