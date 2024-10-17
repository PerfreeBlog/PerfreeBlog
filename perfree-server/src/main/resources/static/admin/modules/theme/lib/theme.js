function t() {
  return axios.get("/api/auth/theme/allTheme");
}
function a(e) {
  return axios.post("/api/auth/theme/swatchTheme?themePath=" + e);
}
function n(e) {
  return axios.delete("/api/auth/theme/unInstallTheme?themePath=" + e);
}
function h() {
  return axios.get("/api/auth/theme/getCurrentThemeSetting");
}
function i(e) {
  return axios.get("/api/auth/theme/getThemeFilesByName?themePath=" + e);
}
function m(e) {
  return axios.post("/api/auth/theme/getThemeFileContent", e);
}
function s(e) {
  return axios.post("/api/auth/theme/saveThemeFileContent", e);
}
export {
  m as a,
  h as b,
  t as c,
  a as d,
  i as g,
  s,
  n as u
};
