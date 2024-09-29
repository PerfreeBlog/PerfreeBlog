// 日期格式化
import { useCommonStore } from "@/core/stores/commonStore.js";
import { menuAdminList } from "@/core/api/system.js";

export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.\d{3}/gm),'');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}



/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
    id = id || 'id';
    parentId = parentId || 'parentId';
    children = children || 'children';
    rootId = rootId || Math.min.apply(Math, data.map(item => {
        return item[parentId];
    })) || 0;

    // 深度克隆源数据
    const cloneData = JSON.parse(JSON.stringify(data));

    // 查找根节点，如果不存在根节点，则直接返回数据
    const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            // 返回每一项的子级数组
            return father[id] === child[parentId];
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        // 返回第一层
        return father[parentId] === rootId;
    });

    // 如果没有找到根节点，并且数据不是空的，直接返回原始数据
    if (treeData.length === 0 && data.length > 0) {
        return data;  // 返回没有根节点的数据（如搜索结果只包含子节点）
    }

    return treeData.length > 0 ? treeData : data;
}



// 初始化菜单
export function initMenu(){
    return new Promise((resolve, reject)=> {
        const commonStore = useCommonStore()
        menuAdminList().then((res) => {
            if (res.code === 200) {
                let menuList = res.data;
                menuList.unshift(
                {
                        "name": "首页",
                        "url": "/admin",
                        "icon": "fa-solid fa-home",
                        "seq": 0,
                        "type": 1,
                        "target": 0,
                        "status": 0,
                        "pluginId": null,
                        "flag": null,
                        "component": "/view/Home",
                        "componentName": "home",
                        "moduleName": "home",
                        "menuType": 1,
                        "perms": "",
                        "isFrame": 1,
                        "id": "home",
                        "pid": "-1",
                        "children": []
                    }
                );
                commonStore.setMenuList(menuList)
                resolve()
            }
        })
    })
}


export function getAllRouter(menus, result) {
    for(let item of menus) {
        if (item.children && item.children.length > 0){
            getAllRouter(item.children, result)
        } else if (item.url && item.component && item.moduleName){
            result.push(item);
        }
    }
}

export function displayTime(data) {
    const timePublish = new Date(data);
    const timeNow = new Date();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // 继续使用30天的概念简化计算
    const diffValue = timeNow - timePublish;

    if (diffValue < 0) {
        return "刚刚发表";
    }

    const diffMonth = diffValue / month;
    const diffWeek = diffValue / week;
    const diffDay = diffValue / day;
    const diffHour = diffValue / hour;
    const diffMinute = diffValue / minute;

    let result;

    if (diffMonth >= 3) {
        result = `${timePublish.getFullYear()}-${(timePublish.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${timePublish
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    } else if (diffMonth >= 1) {
        result = `${Math.floor(diffMonth)}月前`;
    } else if (diffWeek >= 1) {
        result = `${Math.floor(diffWeek)}周前`;
    } else if (diffDay >= 1) {
        result = `${Math.floor(diffDay)}天前`;
    } else if (diffHour >= 1) {
        result = `${Math.floor(diffHour)}小时前`;
    } else if (diffMinute >= 1) {
        result = `${Math.floor(diffMinute)}分钟前`;
    } else {
        result = "刚刚发表";
    }

    return result;
}

export function dialogWidth(defaultWidth) {
    return window.document.body.clientWidth < defaultWidth ? window.document.body.clientWidth : defaultWidth
}
