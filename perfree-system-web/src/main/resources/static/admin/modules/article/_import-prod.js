const p = (i, r) => i.pluginId && i.pluginIsDev ? import(
  /* @vite-ignore */
  `${i.pluginFrontDevAddress}/plugin/${i.pluginId}/src/modules/${r}/index.js`
) : i.pluginId ? import(
  /* @vite-ignore */
  `/plugin-static/${i.pluginId}/modules/${r}/index.js`
) : import(
  /* @vite-ignore */
  `/modules/${r}/index.js`
);
export {
  p as default
};
