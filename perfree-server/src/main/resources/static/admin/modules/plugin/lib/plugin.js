function n(i) {
  return axios.post("/api/auth/plugins/page", i);
}
function u(i) {
  return axios.post("/api/auth/plugins/disablePlugin?pluginId=" + i);
}
function t(i) {
  return axios.post("/api/auth/plugins/enablePlugin?pluginId=" + i);
}
function a(i) {
  return axios.post("/api/auth/plugins/uninstallPlugin?pluginId=" + i);
}
function p(i) {
  return axios.get("/api/auth/plugins/getPluginSetting?pluginId=" + i);
}
export {
  u as d,
  t as e,
  p as g,
  n as p,
  a as u
};
