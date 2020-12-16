(function($){
    let common = function(){}
    common.prototype = {
        getRandomColor:function(){
            return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 10) + ')';
        },
        isExitsFunction:function(funcName) {
            try {
                if (typeof(eval(funcName)) == "function") {
                    return true;
                }
            } catch (e) {
            }
            return false;
        }
    }
    window.common = new common();
})(window.jQuery);