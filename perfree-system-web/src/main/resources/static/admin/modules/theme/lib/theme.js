function t() {
  return axios.get("/api/auth/theme/allTheme");
}
function a(e) {
  return axios.post("/api/auth/theme/swatchTheme?themeName=" + e);
}
function h(e) {
  return axios.delete("/api/auth/theme/unInstallTheme?themeName=" + e);
}
function n() {
  return axios.get("/api/auth/theme/getCurrentThemeSetting");
}
export {
  t as a,
  n as g,
  a as s,
  h as u
};