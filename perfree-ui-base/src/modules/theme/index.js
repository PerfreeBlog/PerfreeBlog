const modules = import.meta.glob('./view/*.vue');
export default module => {
    return {
        router: (menusRouter, moduleName) => {
            let router = [
                {
                    path: '/admin/theme/edit/:themePath',
                    name: 'themeEdit',
                    component: modules[`./view/ThemeEditView.vue`],
                    meta: {
                        moduleName: moduleName,
                        title: "编辑主题",
                        keepAlive: false
                    }
                },
            ];
            // 动态路由
            for (let item of menusRouter){
                if (item.url && item.component) {
                    router.push({
                        name: item.componentName,
                        path: item.url,
                        component: modules[`.${item.component}.vue`],
                        meta: {
                            moduleName: moduleName,
                            title: item.name,
                            keepAlive: true
                        }
                    });
                }
            }
            return router;
        },
    };
};
