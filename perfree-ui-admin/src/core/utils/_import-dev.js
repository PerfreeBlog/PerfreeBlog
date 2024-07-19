import axios_config from "@/core/api/axios_config.js";

/**
 * 导入开发环境模块
 * @param moduleInfo 模块信息
 * @param name 模块名称
 * @returns {Promise<*>}
 */
export default (moduleInfo, name) => {
    if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
        return import(/* @vite-ignore */`${moduleInfo.pluginFrontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`)
    }
    if (moduleInfo.pluginId) {
        return import(/* @vite-ignore */`/plugin-dev/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js`)
    }
    return import(/* @vite-ignore */`../../modules/${name}/index.js`)
};