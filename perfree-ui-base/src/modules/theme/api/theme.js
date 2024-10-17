export function allThemeApi() {
    return axios.get('/api/auth/theme/allTheme');
}

export function swatchThemeApi(themePath) {
    return axios.post('/api/auth/theme/swatchTheme?themePath=' + themePath);
}

export function unInstallThemeApi(themePath) {
    return axios.delete('/api/auth/theme/unInstallTheme?themePath=' + themePath);
}

export function getCurrentThemeSettingApi() {
    return axios.get('/api/auth/theme/getCurrentThemeSetting');
}

export function getThemeFilesByName(themePath) {
    return axios.get('/api/auth/theme/getThemeFilesByName?themePath=' + themePath);
}

export function getThemeFileContent(data) {
    return axios.post('/api/auth/theme/getThemeFileContent', data);
}

export function saveThemeFileContent(data){
    return axios.post('/api/auth/theme/saveThemeFileContent', data);
}
