let axiosInstance = axios.create({
    // 默认请求的接口
    url: "/",
    // 服务器地址
    baseURL: "",
    // 设置超时时间 ms
    timeout: 60 * 1000,
    // 是否跨站点访问控制请求
    withCredentials: false // default
});


// 请求拦截器
axiosInstance.interceptors.request.use(
    function(config) {
        let token_info = localStorage.getItem('token_info');
        if (token_info) {
            token_info = JSON.parse(token_info);
            config.headers["Authorization"] = "Bearer " + token_info.accessToken;
        }
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    function(response) {
        if (response.status === 200) {
            if (response.data.code === 401) {
                ElementPlus.ElMessage.error("登录状态已过期，请重新登陆")
                localStorage.removeItem('token_info');
                window.location.href = "/login";
            }
            if (response.data.code === 403) {
                ElementPlus.ElMessage.error(response.data.msg)
                return Promise.reject(new Error(response.data.msg));
            }
            return response.data;
        }
        ElementPlus.ElMessage.error('错误信息')
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

class VueSetup{
    constructor(options, ele, useElementPlusIconsVue) {
        const app = Vue.createApp(options);
        app.use(ElementPlus);
        app.component("myComponent", myComponent)
        if (useElementPlusIconsVue) {
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                app.component(key, component)
            }
        }
        app.mount(ele);
        return app
    }
}