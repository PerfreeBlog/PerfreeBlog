/**
 * 导入生产环境js
 * @param type
 * @param name
 * @returns {Promise<unknown>}
 */

export default (type, name) => {
   /* if (type === "1") {
        return import(`http://localhost:5173/src/modules/demo02/index.js`)
    }*/
    return  import(`/modules/${name}/index.js`)
}