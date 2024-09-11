const modules = import.meta.glob('./view/*.vue');
export default module => {
    return {
        router: (menusRouter, moduleName) => {
            let router = [
                {
                    path: '/admin/article/edit/:id',
                    name: 'updateArticle',
                    component: modules[`./view/ArticleCreateView.vue`],
                    meta: {
                        moduleName: moduleName,
                        title: "修改文章",
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