(function ($) {
    var perfreeComment = function () { }

    perfreeComment.prototype = {
        options: {
            // 提交评论api
            submitApi: '/comments/submitComment',
            // 评论列表api
            commentListApi: '/comments/getCommentByArticleId',
            // 获取当前登录用户
            loginUserApi: '/user/getLoginUser',
            // 是否显示评论列表
            isShowCommentList: true,
            // 表情按钮的svg
            emjoiBtnIcon: '<svg t="1661157759312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3077" width="48" height="48"><path d="M510.4 1007.5c-265.1 0-480.8-215.8-480.8-481.1S245.3 45.2 510.4 45.2 991.1 261 991.1 526.3 775.5 1007.5 510.4 1007.5zM510.4 93.3c-238.6 0-432.7 194.3-432.7 433.1s194.1 433.1 432.7 433.1 432.7-194.3 432.7-433.1S749 93.3 510.4 93.3z" p-id="3078" fill="#777e85"></path><path d="M659.9 534.2c-49.3 0-89.4-40.1-89.4-89.4s40.1-89.4 89.4-89.4 89.4 40.1 89.4 89.4S709.2 534.2 659.9 534.2zM659.9 403.5c-22.8 0-41.3 18.5-41.3 41.3s18.5 41.3 41.3 41.3 41.3-18.5 41.3-41.3S682.6 403.5 659.9 403.5z" p-id="3079" fill="#777e85"></path><path d="M318.6 550.2 293.2 509.4 385.8 451.8 291.1 378.1 320.6 340.1 469.8 456.1Z" p-id="3080" fill="#777e85"></path><path d="M514.1 800c-1 0-1.9 0-2.9 0C375.6 798.1 280 669.1 276 663.6l38.8-28.4c0.8 1.2 85.8 115.3 197.3 116.6 0.7 0 1.3 0 2 0 65.6 0 129.2-39.4 189.1-117.1l38.1 29.3C671.8 754.3 595.4 800 514.1 800z" p-id="3081" fill="#777e85"></path></svg>',
            // 是否登录
            isLogin: false,
            // 表情包资源
            emjoiList: [
                {"url":"/public/libs/perfree-comment/imgs/aini.png","id":"aini"},
                {"url":"/public/libs/perfree-comment/imgs/baibai.png","id":"baibai"},
                {"url":"/public/libs/perfree-comment/imgs/baiyan.png","id":"baiyan"},
                {"url":"/public/libs/perfree-comment/imgs/baobao.png","id":"baobao"},
                {"url":"/public/libs/perfree-comment/imgs/beishang.png","id":"beishang"},
                {"url":"/public/libs/perfree-comment/imgs/bingbujiandan.png","id":"bingbujiandan"},
                {"url":"/public/libs/perfree-comment/imgs/bishi.png","id":"bishi"},
                {"url":"/public/libs/perfree-comment/imgs/bizui.png","id":"bizui"},
                {"url":"/public/libs/perfree-comment/imgs/chanzui.png","id":"chanzui"},
                {"url":"/public/libs/perfree-comment/imgs/chigua.png","id":"chigua"},
                {"url":"/public/libs/perfree-comment/imgs/chijing.png","id":"chijing"},
                {"url":"/public/libs/perfree-comment/imgs/chongjing.png","id":"chongjing"},
                {"url":"/public/libs/perfree-comment/imgs/dalian.png","id":"dalian"},
                {"url":"/public/libs/perfree-comment/imgs/ding.png","id":"ding"},
                {"url":"/public/libs/perfree-comment/imgs/doge.png","id":"doge"},
                {"url":"/public/libs/perfree-comment/imgs/erha.png","id":"erha"},
                {"url":"/public/libs/perfree-comment/imgs/feijie.png","id":"feijie"},
                {"url":"/public/libs/perfree-comment/imgs/ganbei.png","id":"ganbei"},
                {"url":"/public/libs/perfree-comment/imgs/ganmao.png","id":"ganmao"},
                {"url":"/public/libs/perfree-comment/imgs/geili.png","id":"geili"},
                {"url":"/public/libs/perfree-comment/imgs/geinixiaoxinxin.png","id":"geinixiaoxinxin"},
                {"url":"/public/libs/perfree-comment/imgs/good.png","id":"good"},
                {"url":"/public/libs/perfree-comment/imgs/guile.png","id":"guile"},
                {"url":"/public/libs/perfree-comment/imgs/guzhang.png","id":"guzhang"},
                {"url":"/public/libs/perfree-comment/imgs/haixiu.png","id":"haixiu"},
                {"url":"/public/libs/perfree-comment/imgs/han.png","id":"han"},
                {"url":"/public/libs/perfree-comment/imgs/haqian.png","id":"haqian"},
                {"url":"/public/libs/perfree-comment/imgs/heixian.png","id":"heixian"},
                {"url":"/public/libs/perfree-comment/imgs/heng.png","id":"heng"},
                {"url":"/public/libs/perfree-comment/imgs/huaixiao.png","id":"huaixiao"},
                {"url":"/public/libs/perfree-comment/imgs/hufen.png","id":"hufen"},
                {"url":"/public/libs/perfree-comment/imgs/jiayou.png","id":"jiayou"},
                {"url":"/public/libs/perfree-comment/imgs/jiyan.png","id":"jiyan"},
                {"url":"/public/libs/perfree-comment/imgs/keai.png","id":"keai"},
                {"url":"/public/libs/perfree-comment/imgs/kelian.png","id":"kelian"},
                {"url":"/public/libs/perfree-comment/imgs/ku.png","id":"ku"},
                {"url":"/public/libs/perfree-comment/imgs/kun.png","id":"kun"},
                {"url":"/public/libs/perfree-comment/imgs/lai.png","id":"lai"},
                {"url":"/public/libs/perfree-comment/imgs/lei.png","id":"lei"},
                {"url":"/public/libs/perfree-comment/imgs/NO.png","id":"NO"},
                {"url":"/public/libs/perfree-comment/imgs/nu.png","id":"nu"},
                {"url":"/public/libs/perfree-comment/imgs/numa.png","id":"numa"},
                {"url":"/public/libs/perfree-comment/imgs/ok.png","id":"ok"},
                {"url":"/public/libs/perfree-comment/imgs/qian.png","id":"qian"},
                {"url":"/public/libs/perfree-comment/imgs/qinqin.png","id":"qinqin"},
                {"url":"/public/libs/perfree-comment/imgs/quantou.png","id":"quantou"},
                {"url":"/public/libs/perfree-comment/imgs/se.png","id":"se"},
                {"url":"/public/libs/perfree-comment/imgs/shangxin.png","id":"shangxin"},
                {"url":"/public/libs/perfree-comment/imgs/shayan.png","id":"shayan"},
                {"url":"/public/libs/perfree-comment/imgs/shengbing.png","id":"shengbing"},
                {"url":"/public/libs/perfree-comment/imgs/shiwang.png","id":"shiwang"},
                {"url":"/public/libs/perfree-comment/imgs/shuai.png","id":"shuai"},
                {"url":"/public/libs/perfree-comment/imgs/shui.png","id":"shui"},
                {"url":"/public/libs/perfree-comment/imgs/sikao.png","id":"sikao"},
                {"url":"/public/libs/perfree-comment/imgs/taikaixin.png","id":"taikaixin"},
                {"url":"/public/libs/perfree-comment/imgs/taiyang.png","id":"taiyang"},
                {"url":"/public/libs/perfree-comment/imgs/tanshou.png","id":"tanshou"},
                {"url":"/public/libs/perfree-comment/imgs/tianping.png","id":"tianping"},
                {"url":"/public/libs/perfree-comment/imgs/touxiao.png","id":"touxiao"},
                {"url":"/public/libs/perfree-comment/imgs/tu.png","id":"tu"},
                {"url":"/public/libs/perfree-comment/imgs/wabi.png","id":"wabi"},
                {"url":"/public/libs/perfree-comment/imgs/weiqu.png","id":"weiqu"},
                {"url":"/public/libs/perfree-comment/imgs/weixiao.png","id":"weixiao"},
                {"url":"/public/libs/perfree-comment/imgs/woshou.png","id":"woshou"},
                {"url":"/public/libs/perfree-comment/imgs/wu.png","id":"wu"},
                {"url":"/public/libs/perfree-comment/imgs/xiaocry.png","id":"xiaocry"},
                {"url":"/public/libs/perfree-comment/imgs/xiaoerbuyu.png","id":"xiaoerbuyu"},
                {"url":"/public/libs/perfree-comment/imgs/xixi.png","id":"xixi"},
                {"url":"/public/libs/perfree-comment/imgs/xu.png","id":"xu"},
                {"url":"/public/libs/perfree-comment/imgs/ye.png","id":"ye"},
                {"url":"/public/libs/perfree-comment/imgs/yinxian.png","id":"yinxian"},
                {"url":"/public/libs/perfree-comment/imgs/yiwen.png","id":"yiwen"},
                {"url":"/public/libs/perfree-comment/imgs/youhengheng.png","id":"youhengheng"},
                {"url":"/public/libs/perfree-comment/imgs/yueliang.png","id":"yueliang"},
                {"url":"/public/libs/perfree-comment/imgs/yun.png","id":"yun"},
                {"url":"/public/libs/perfree-comment/imgs/yunbei.png","id":"yunbei"},
                {"url":"/public/libs/perfree-comment/imgs/zhuakuang.png","id":"zhuakuang"},
                {"url":"/public/libs/perfree-comment/imgs/zuohengheng.png","id":"zuohengheng"},
                {"url":"/public/libs/perfree-comment/imgs/zuoyi.png","id":"zuoyi"}
            ]
        },
        /**
         * 初始化
         */
        init: function() {
            let that = this;
            // 获取当前登录用户 
            $.get(that.options.loginUserApi, function(res) {
                if (res && res.data) {
                    that.options.isLogin = true;
                }
                let commentContainers = $('.perfree-comment');
                for (const commentContainer of commentContainers) {
                    $(commentContainer).addClass('perfree-comment-container');;
                    that.initComment(commentContainer);
                    that.initCommentList(commentContainer);
                }
            });
        },

        /**
         * 指定容器加载评论
         */
        customInit: function(ele) {
            let that = this;
            $.get(that.options.loginUserApi, function(res) {
                if (res && res.data) {
                    that.options.isLogin = true;
                }
                $(ele).addClass('perfree-comment-container');;
                that.initComment(ele);
                that.initCommentList(ele);
            });
        },

        /**
         * 初始化评论
         * @param {*} ele 
         */
        initComment: function(ele) {
            if ($(ele).attr('data-show-comment') === 'false') {
                return;
            }
            let pid = $(ele).attr('data-pid') ? $(ele).attr('data-pid') : '';
            let topPid = $(ele).attr('data-top-pid') ? $(ele).attr('data-top-pid') : '';
            $(ele).html(`<div class='comment-box' data-article-id='${$(ele).attr('data-article-id')}' data-pid='${pid}' data-top-pid='${topPid}'></div>`);
            let commentHtml = `
                <div class='comment-content-box'>
                    <label>评论<span class='required'> *</span></label>
                    <div placeholder='评论内容' class='comment-editor' contenteditable="true"></div>
                    <div class='comment-content-footer'>
                        <a href='javascript:;' class='comment-emjoi-btn'>${this.options.emjoiBtnIcon} 表情</a>
                        <span class='comment-msg'></span>
                        <ul class='comment-emjoi-panel'>
                            ${renderEmjoiPanel(this.options.emjoiList)}
                        </ul>
                    </div>
                </div>
            `;
            if (!this.options.isLogin) {
                let userName = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
                let email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
                let website = localStorage.getItem('website') ? localStorage.getItem('website') : '';
                commentHtml += `
                    <div class='comment-info-box'>
                        <div class='comment-input-box'>
                            <label>名字<span class='required'> *</span></label>
                            <input type='text' placeholder='姓名或昵称(必填)' class='comment-name-input' value='${userName}'>
                        </div>
                        <div class='comment-input-box'>
                            <label>邮箱<span class='required'> *</span></label>
                            <input type='email' placeholder='接收回复和获取头像(必填,将保密)' class='comment-email-input' value=${email}>
                        </div>
                        <div class='comment-input-box'>
                            <label>网站</label> 
                            <input type='text' placeholder='个人网站(选填)' class='comment-website-input' value=${website}>
                        </div>
                    </div>
                `;
            }
            commentHtml += `<div class='comment-submit-box'>`;
            if (pid && pid !== '' && topPid && topPid !== '') {
                commentHtml += `<button class='comment-cancel-btn'>取消回复</button>`;
            }
            commentHtml += `<button class='comment-submit-btn'>发表评论</button></div>`;
            $(ele).children('.comment-box').html(commentHtml);
            let that = this;

            $(ele).on('click','.comment-emjoi-btn', function(e) {
                e.stopPropagation();
                emjouBtnClick($(this));
            });

            $(ele).on('click','.comment-emjoi', function(e) {
                e.stopPropagation();
                emjouClick($(this));
            });

            $(ele).on('click','.comment-submit-btn', function(e) {
                e.stopPropagation();
                that.submitComment($(this));
            });

            $(ele).on('click','.comment-cancel-btn', function(e) {
                e.stopPropagation();
                cancelReply($(this));
            });

            $(ele).on('click','.comment-close-msg', function(e) {
                e.stopPropagation();
                $(this).parent().removeClass('comment-msg-show');
                $(this).parent().html('')
            });
        },

        /**
         * 提交评论
         */
        submitComment(e) {
            let articleId = $(e).parents('.comment-box').attr('data-article-id');
            let pid = $(e).parents('.comment-box').attr('data-pid');
            let topPid = $(e).parents('.comment-box').attr('data-top-pid');
            let content = $(e).parents('.comment-box').find('.comment-editor').html();
            let userName = $(e).parents('.comment-box').find('.comment-name-input').val();
            let email = $(e).parents('.comment-box').find('.comment-email-input').val();
            let website = $(e).parents('.comment-box').find('.comment-website-input').val();
            let commentMsgBox = $(e).parents('.comment-box').find('.comment-msg')
            if(!content || content === '') {
                commentMsg(commentMsgBox, '内容不能为空', 'warning');
                return;
            }
            if(!this.options.isLogin){
                if (!userName || userName === '' || !email || email == '') {
                    commentMsg(commentMsgBox, '名字和邮箱为必填项', 'warning');
                    return;
                }

                localStorage.setItem('userName',userName);
                localStorage.setItem('email',email);
                localStorage.setItem('website',website);
            } else {
                userName = ''; email ='';website='';
            }

            let that = this;
            $.post(that.options.submitApi,{articleId, pid, topPid, content,userName, email, website}, function(res){
                if (res.code === 200) {
                    $(e).parents('.comment-box').find('.comment-editor').html('');
                    if (pid && pid !== '' && topPid && topPid !== '') {
                        commentMsg(commentMsgBox, '回复成功,即将刷新评论列表', 'success');
                        setTimeout(function() {
                            that.loadCommentList($(e).parents('.perfree-comment-container'));
                        }, 2000)
                    } else {
                        commentMsg(commentMsgBox, res.msg, 'success');
                        that.loadCommentList($(e).parents('.perfree-comment-container'));
                    }
                } else if (res.code === 201) {
                    commentMsg(commentMsgBox, '评论成功,管理员审核成功后将自动展示在评论列表', 'success');
                }else {
                    commentMsg(commentMsgBox, res.msg, 'error');
                }
            })
        },


        /**
         * 初始化评论列表
         */
        initCommentList: function(ele) {
            if ($(ele).attr('data-show-comment-list') === 'false') {
                return;
            }
            $(ele).append( `<div class='comment-list-box'></div>`);
            $(ele).children('.comment-list-box').html(`<div class='comment-list'></div><ul class='comment-pagination' data-page-index='1'> </ul>`);
            this.loadCommentList(ele);
        },

        /**
         * 加载评论
         * @param {*} ele 
         */
        loadCommentList: function(ele) {
            let pageIndex = $(ele).find('.comment-pagination').attr('data-page-index');
            let that = this;
            let showReplyBtn = true;
            if ($(ele).attr('data-show-comment') === 'false') {
                showReplyBtn = false;
            }
            $(ele).find('.comment-list').html('');
            $.post(that.options.commentListApi, {articleId: $(ele).attr('data-article-id'), pageIndex, pageSize: 6}, function(res) {
                let commentHtml = '';
                if (!res.data || res.data.length <= 0) {
                    $(ele).find('.comment-list').html(`<div class='comment-not-list'>暂无评论</div>`);
                    return;
                }
                res.data.forEach(comment => {
                    commentHtml += `
                      <div class='comment-detail-container'>
                            <div class='comment-detail-box'>
                                <div class='comment-detail-avatar-box'>
                                <img src='${comment.avatar}' width='42px'>
                                </div>
                                <div class='comment-detail-msg-box'>
                                <div class='comment-detail-info'>
                                    <span class='comment-detail-name'>${comment.userName}</span>
                                    <span class='comment-detail-time'>${diaplayTime(comment.createTime)}</span>
                                    ${that.renderRepolyBtn(showReplyBtn, comment)}
                                </div>
                                <div class='comment-detail-content'>${comment.content}</div>
                            </div>
                        </div>
                        ${that.renderChildComment(showReplyBtn, comment)}
                      </div>
                    `;
                });
                $(ele).find('.comment-list').html(commentHtml);

                // 回复按钮点击事件
                $(ele).on('click','.comment-detail-reply-btn', function() {
                    $(this).parents('.comment-list').find('.comment-reply-box').remove();
                    let replyHtml = `<div class='comment-reply-box' data-article-id="${$(this).attr('data-article-id')}" data-pid="${$(this).attr('data-pid')}" data-top-pid="${$(this).attr('data-top-pid')}"></div>`;
                    $(this).parents('.comment-detail-box').append(replyHtml);
                    that.initComment( $(this).parents('.comment-detail-box').find('.comment-reply-box')[0]);
                });
                $(ele).find('.comment-pagination').jqPaginator({
                    totalPages: Math.ceil(res.total / res.pageSize) == 0 ? 1 : Math.ceil(res.total / res.pageSize),
                    visiblePages: 5,
                    currentPage: res.pageIndex,
                    first: '<li class="first page">首页</li>',
                    prev: '<li class="prev page">上一页</li>',
                    next: '<li class="next page">下一页</li>',
                    last: '<li class="last page">末页</li>',
                    page: '<li class="page">{{page}}</li>',
                    onPageChange: function (num, type) {
                       if(type !== 'init') {
                        $(ele).find('.comment-pagination').attr('data-page-index', num);
                        that.loadCommentList(ele);
                       }
                    }
                });
            });
        },

        renderChildComment: function (showReplyBtn, parentComment) {
            if (!parentComment.child || parentComment.child.length <= 0) {
                return '';
            }
            let childCommentHtml = '';
            parentComment.child.forEach(comment => {
                childCommentHtml += `
                    <div class='comment-detail-box comment-child-detail-box'>
                        <div class='comment-detail-avatar-box'>
                            <img src='${comment.avatar}' width='42px'>
                        </div>
                        <div class='comment-detail-msg-box'>
                            <div class='comment-detail-info'>
                            <span class='comment-detail-name'>${comment.userName}</span>
                            <span class='comment-detail-time'>${diaplayTime(comment.createTime)}</span>
                            ${this.renderRepolyBtn(showReplyBtn, comment)}
                            </div>
                            <div class='comment-detail-content'><span class='comment-mention'>@${comment.parent.userName} </span>${comment.content}</div>
                        </div>
                    </div>
                `;
            });
            return childCommentHtml;
        },

        renderRepolyBtn: function (showReplyBtn, comment) {
            if(!showReplyBtn) {
                return '';
            }
            if(!comment.parent) {
                return `<span class='comment-detail-reply-btn' data-pid='${comment.id}' data-top-pid='${comment.id}' data-article-id='${comment.articleId}'>回复</span>`;
            }
           return `<span class='comment-detail-reply-btn' data-pid='${comment.id}' data-top-pid='${comment.topPid}' data-article-id='${comment.articleId}'>回复</span>`;
        }

    }

    /**
     * 表情按钮点击事件
     * @param {*} e 
     */
    function emjouBtnClick(e) {
        if ($(e).siblings('.comment-emjoi-panel').attr('class').indexOf('comment-emjoi-panel-show') >= 0) {
            $(e).siblings('.comment-emjoi-panel').removeClass('comment-emjoi-panel-show');
        } else {
            $(e).siblings('.comment-emjoi-panel').addClass('comment-emjoi-panel-show');
        }
    }

    /**
     * 渲染表情面板
     */
    function renderEmjoiPanel(emjoiList) {
        let html = '';
        for (const emjoi of emjoiList) {
            html += `<li data-id='${emjoi.id}' title='${emjoi.id}' class='comment-emjoi'><img src='${emjoi.url}' alt='${emjoi.id}' class='emjoi' width='26px' loading='lazy'></li>`;
        }
        return html;
    }

    /**
     * 点击emjoi事件
     */
    function emjouClick(e) {
        let insertStr = $(e).html();
        let obj = $(e).parents('.comment-content-box').children('.comment-editor')[0];
        $(obj).insertAtCaret(insertStr);
        obj.focus();
    }

    /**
     * 评论信息
     */
    function commentMsg(ele, content, type) {
        $(ele).html(content + ` <span class='comment-close-msg'>X</span>`);
        if($(ele).attr('class').indexOf('comment-msg-show') < 0) {
            $(ele).addClass('comment-msg-show');
        }
        $(ele).removeClass('comment-msg-success');
        $(ele).removeClass('comment-msg-warning');
        $(ele).removeClass('comment-msg-error');
        if (type === 'success') {
            $(ele).addClass('comment-msg-success');
        }
        if (type === 'error') {
            $(ele).addClass('comment-msg-error');
        }
        if (type === 'warning') {
            $(ele).addClass('comment-msg-warning');
        }
    }

    /**
     * 取消回复
     */
    function cancelReply(e) {
        $(e).parents('.comment-reply-box').remove();
    }

    function diaplayTime(data) {
      var str = data;
      var timePublish = new Date(str);
      var timeNow = new Date();
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var month = day * 30;
      var diffValue = timeNow - timePublish;
      var diffMonth = diffValue / month;
      var diffWeek = diffValue / (7 * day);
      var diffDay = diffValue / day;
      var diffHour = diffValue / hour;
      var diffMinute = diffValue / minute;
      if (diffValue < 0) {
        result = "刚刚发表";
      }else if (diffMonth > 3) {
          result = timePublish.getFullYear()+"-";
          result += timePublish.getMonth() + "-";
          result += timePublish.getDate();
      }else if (diffMonth > 1) {
          result = parseInt(diffMonth) + "月前";
      }else if (diffWeek > 1) {
          result = parseInt(diffWeek) + "周前";
      }else if (diffDay > 1) {
          result = parseInt(diffDay) + "天前";
      }else if (diffHour > 1) {
          result = parseInt(diffHour) + "小时前";
      }else if (diffMinute > 1) {
          result = parseInt(diffMinute) + "分钟前";
      }else {
          result = "刚刚发表";
      }
      return result;
  }

    $.fn.extend({
        insertAtCaret: function(myValue){
            var obj = $(this)[0];
            var range, node;
            if (!obj.hasfocus) {
                obj.focus();
            }
            
            if (document.selection && document.selection.createRange) {
                this.focus();
                document.selection.createRange().pasteHTML(myValue);
                this.focus();
            } else if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.collapse(false);
                node = range.createContextualFragment(myValue);
                var c = node.lastChild;
                range.insertNode(node);
                if (c) {
                    range.setEndAfter(c);
                    range.setStartAfter(c)
                }
                var j = window.getSelection();
                j.removeAllRanges();
                j.addRange(range);
                this.focus();
            }
        }
    });

    $.jqPaginator = function (el, options) {
        if (!(this instanceof $.jqPaginator)) {
          return new $.jqPaginator(el, options)
        }
    
        var self = this;
    
        self.$container = $(el);
    
        self.$container.data('jqPaginator', self);
    
        self.init = function () {
          if (options.first || options.prev || options.next || options.last || options.page) {
            options = $.extend(
              {},
              {
                first: '',
                prev: '',
                next: '',
                last: '',
                page: ''
              },
              options
            );
          }
    
          self.options = $.extend({}, $.jqPaginator.defaultOptions, options);
    
          self.verify();
    
          self.extendJquery();
    
          self.render();
    
          self.fireEvent(this.options.currentPage, 'init');
        };
    
        self.verify = function () {
          var opts = self.options;
    
          if (!self.isNumber(opts.totalPages)) {
            throw new Error('[jqPaginator] type error: totalPages')
          }
    
          if (!self.isNumber(opts.totalCounts)) {
            throw new Error('[jqPaginator] type error: totalCounts')
          }
    
          if (!self.isNumber(opts.pageSize)) {
            throw new Error('[jqPaginator] type error: pageSize')
          }
    
          if (!self.isNumber(opts.currentPage)) {
            throw new Error('[jqPaginator] type error: currentPage')
          }
    
          if (!self.isNumber(opts.visiblePages)) {
            throw new Error('[jqPaginator] type error: visiblePages')
          }
    
          if (!opts.totalPages && !opts.totalCounts) {
            throw new Error('[jqPaginator] totalCounts or totalPages is required')
          }
    
          if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
            throw new Error('[jqPaginator] pageSize is required')
          }
    
          if (opts.totalCounts && opts.pageSize) {
            opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
          }
    
          if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
            throw new Error('[jqPaginator] currentPage is incorrect')
          }
    
          if (opts.totalPages < 1) {
            throw new Error('[jqPaginator] totalPages cannot be less currentPage')
          }
        };
    
        self.extendJquery = function () {
          $.fn.jqPaginatorHTML = function (s) {
            return s
              ? this.before(s).remove()
              : $('<p>')
                .append(this.eq(0).clone())
                .html()
          };
        };
    
        self.render = function () {
          self.renderHtml();
          self.setStatus();
          self.bindEvents();
        };
    
        self.renderHtml = function () {
          var html = [];
    
          var pages = self.getPages();
          for (var i = 0, j = pages.length; i < j; i++) {
            html.push(self.buildItem('page', pages[i]));
          }
    
          self.isEnable('prev') && html.unshift(self.buildItem('prev', self.options.currentPage - 1));
          self.isEnable('first') && html.unshift(self.buildItem('first', 1));
          self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
          self.isEnable('next') && html.push(self.buildItem('next', self.options.currentPage + 1));
          self.isEnable('last') && html.push(self.buildItem('last', self.options.totalPages));
    
          if (self.options.wrapper) {
            self.$container.html(
              $(self.options.wrapper)
                .html(html.join(''))
                .jqPaginatorHTML()
            );
          } else {
            self.$container.html(html.join(''));
          }
        };
    
        self.buildItem = function (type, pageData) {
          var html = self.options[type]
            .replace(/{{page}}/g, pageData)
            .replace(/{{totalPages}}/g, self.options.totalPages)
            .replace(/{{totalCounts}}/g, self.options.totalCounts);
    
          return $(html)
            .attr({
              'jp-role': type,
              'jp-data': pageData
            })
            .jqPaginatorHTML()
        };
    
        self.setStatus = function () {
          var options = self.options;
    
          if (!self.isEnable('first') || options.currentPage === 1) {
            $('[jp-role=first]', self.$container).addClass(options.disableClass);
          }
          if (!self.isEnable('prev') || options.currentPage === 1) {
            $('[jp-role=prev]', self.$container).addClass(options.disableClass);
          }
          if (!self.isEnable('next') || options.currentPage >= options.totalPages) {
            $('[jp-role=next]', self.$container).addClass(options.disableClass);
          }
          if (!self.isEnable('last') || options.currentPage >= options.totalPages) {
            $('[jp-role=last]', self.$container).addClass(options.disableClass);
          }
    
          $('[jp-role=page]', self.$container).removeClass(options.activeClass);
          $('[jp-role=page][jp-data=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
        };
    
        self.getPages = function () {
          var pages = [];
    
          var visiblePages = self.options.visiblePages;
    
          var currentPage = self.options.currentPage;
    
          var totalPages = self.options.totalPages;
    
          if (visiblePages > totalPages) {
            visiblePages = totalPages;
          }
    
          var half = Math.floor(visiblePages / 2);
          var start = currentPage - half + 1 - (visiblePages % 2);
          var end = currentPage + half;
    
          if (start < 1) {
            start = 1;
            end = visiblePages;
          }
          if (end > totalPages) {
            end = totalPages;
            start = 1 + totalPages - visiblePages;
          }
    
          var itPage = start;
          while (itPage <= end) {
            pages.push(itPage);
            itPage++;
          }
    
          return pages
        };
    
        self.isNumber = function (value) {
          var type = typeof value;
          return type === 'number' || type === 'undefined'
        };
    
        self.isEnable = function (type) {
          return self.options[type] && typeof self.options[type] === 'string'
        };
    
        self.switchPage = function (pageIndex) {
          self.options.currentPage = pageIndex;
          self.render();
        };
    
        self.fireEvent = function (pageIndex, type) {
          return typeof self.options.onPageChange !== 'function' || self.options.onPageChange(pageIndex, type) !== false
        };
    
        self.callMethod = function (method, options) {
          switch (method) {
            case 'option':
              self.options = $.extend({}, self.options, options);
              self.verify();
              self.render();
              break
            case 'destroy':
              self.$container.empty();
              self.$container.removeData('jqPaginator');
              break
            default:
              throw new Error('[jqPaginator] method "' + method + '" does not exist')
          }
    
          return self.$container
        };
    
        self.bindEvents = function () {
          var opts = self.options;
    
          self.$container.off();
          self.$container.on('click', '[jp-role]', function () {
            var $el = $(this);
            if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
              return
            }
    
            var pageIndex = +$el.attr('jp-data');
            if (self.fireEvent(pageIndex, 'change')) {
              self.switchPage(pageIndex);
            }
          });
        };
    
        self.init();
    
        return self.$container
      };
    
      $.jqPaginator.defaultOptions = {
        wrapper: '',
        first: '<li class="first"><a href="javascript:;">First</a></li>',
        prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
        next: '<li class="next"><a href="javascript:;">Next</a></li>',
        last: '<li class="last"><a href="javascript:;">Last</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 7,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
      };
    
      $.fn.jqPaginator = function () {
        var self = this;
    
        var args = Array.prototype.slice.call(arguments);
    
        if (typeof args[0] === 'string') {
          var $instance = $(self).data('jqPaginator');
          if (!$instance) {
            throw new Error('[jqPaginator] the element is not instantiated')
          } else {
            return $instance.callMethod(args[0], args[1])
          }
        } else {
          return new $.jqPaginator(this, args[0])
        }
      };
    window.perfreeComment = perfreeComment;
    let comment = new perfreeComment();
    comment.init();
}(jQuery))