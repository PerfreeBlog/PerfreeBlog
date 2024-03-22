(function($) {
    let common = function () {
    }
    common.prototype = {
        formatDate: function (time, format) {
            let t = new Date(time);
            let tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                    case 'MM':
                        return tf(t.getMonth() + 1);
                    case 'mm':
                        return tf(t.getMinutes());
                    case 'dd':
                        return tf(t.getDate());
                    case 'HH':
                        return tf(t.getHours());
                    case 'ss':
                        return tf(t.getSeconds());
                }
            })
        },
        layerArea: function (clientWidth, width, height) {
            if (height !== 'auto') {
                height += 'px';
            }
            var a = clientWidth - width;
            if(a > 10) {
                return [width + 'px', height]
            } else{
                return ['100%', height]
            }
        },
        handleTree: function (data, id, parentId, children, rootId) {
            id = id || 'id'
            parentId = parentId || 'parentId'
            children = children || 'children'
            rootId = rootId || Math.min.apply(Math, data.map(item => {
                return item[parentId]
            })) || 0
            //对源数据深度克隆
            const cloneData = JSON.parse(JSON.stringify(data))
            //循环所有项
            const treeData = cloneData.filter(father => {
                let branchArr = cloneData.filter(child => {
                    //返回每一项的子级数组
                    return father[id] === child[parentId]
                });
                branchArr.length > 0 ? father.children = branchArr : '';
                //返回第一层
                return father[parentId] === rootId;
            });
            return treeData !== '' ? treeData : data;
        },
        layer: window.top.layer,
        toast: window.top.toast,
        activePage: window.top.document.getElementById(window.top.activeFrameId ) ?  window.top.document.getElementById(window.top.activeFrameId ).contentWindow : null
    }
    window.common = new common();
})(window.jQuery);