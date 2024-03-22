(function($) {
    let request = function () {
    }
    request.prototype = {
        post: function (url, data) {
            return new Promise((resolve,reject)=> {
                $.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/json",
                    data: data,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
        put: function (url, data) {
            return new Promise((resolve,reject)=> {
                $.ajax({
                    type: "PUT",
                    url: url,
                    contentType: "application/json",
                    data: data,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
        get: function (url) {
            return new Promise((resolve,reject)=> {
                $.ajax({
                    type: "GET",
                    url: url,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
        delete: function (url) {
            return new Promise((resolve,reject)=> {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
    }
    window.request = new request();
})(window.jQuery);