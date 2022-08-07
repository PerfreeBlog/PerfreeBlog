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
        }
    }
    window.common = new common();
})(window.jQuery);