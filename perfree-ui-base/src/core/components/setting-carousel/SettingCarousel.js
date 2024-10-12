import uniqueId from "@form-create/utils/lib/unique.js";

export const SettingCarouselRule = {
    //插入菜单位置
    menu: 'main',
    //图标
    icon: 'icon-refresh',
    //名称
    label: '轮播设置项',
    //id,唯一!
    name: 'SettingCarousel',
    //是否可以操作, 除了容器类组件建议为true !
    mask: true,
    //支持组件验证, 值的类型
    validate: ['string'],
    //定义组件的事件
    event: ['change'],
    //定义组件的渲染规则
    rule({t}) {
        //组件的生成规则
        return {
            type: 'SettingCarousel',
            //field不能重复!!!
            field: uniqueId(),
            title: '轮播设置项',
            info: '',
            $required: false,
            props: {},
        };
    },
    //组件的属性配置
    props(_, {t}) {
        return [];
    }
};
