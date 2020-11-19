<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>面板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="/public/libs/editormd/css/editormd.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
    <link href="/admin/pages/article/css/article_create.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body">
    <div class="p-container">
        <div class="layui-row">
            <form class="layui-form" action="">
                <div class="layui-col-xs12 layui-col-sm12 layui-col-md8">
                    <div class="layui-card">
                        <div class="layui-card-body">
                            <input type="hidden" name="id" value="${article.id}">
                            <div class="layui-form-item">
                                <span class="p-form-tip">标题:</span>
                                <input type="text" name="title" value="${article.title}" required  lay-verify="required" placeholder="请输入文章标题" autocomplete="off" class="layui-input">
                            </div>

                            <div class="layui-form-item" style="margin: 0">
                                <span class="p-form-tip">文章内容:</span>
                            </div>
                            <div id="editorBox">
                                <input type="hidden" value="${article.content}" id="articleContent">
                                <div id="editor">
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="layui-col-xs12 layui-col-sm12 layui-col-md4 p-container-right">
                    <div class="layui-card">
                        <div class="layui-card-header">
                            <div class="p-article-btn-box">
                                <button type="submit" lay-submit lay-filter="publishForm" class="layui-btn layui-btn-normal">发布</button>
                                <button type="submit" lay-submit lay-filter="draftForm" class="layui-btn layui-btn-primary">保存到草稿箱</button>
                            </div>
                        </div>
                        <div class="layui-card-body">
                            <div class="layui-form-item">
                                <input type="hidden" value="${article.categoryId!''}" id="categorySelectValue">
                                <span class="p-form-tip">分类:</span>
                                <div id="category" ></div>
                            </div>

                            <div class="layui-form-item">
                                <input type="hidden" value="<#list article.tags as tag>${tag.id},</#list>" id="tagSelectValue">
                                <span class="p-form-tip">标签:</span>
                                <div id="tag" ></div>
                            </div>

                            <div class="layui-form-item">
                                <span class="p-form-tip">文章摘要:</span>
                                <textarea name="summary" placeholder="请输入文章摘要" class="article-textarea layui-textarea" style="resize: none">${article.summary ! ''}</textarea>
                            </div>

                            <div class="layui-form-item">
                                <span class="p-form-tip">SEO关键字:</span>
                                <input type="text" name="metaKeywords" placeholder="请输入SEO关键字" autocomplete="off" class="layui-input" value="${article.metaKeywords ! ''}">
                            </div>

                            <div class="layui-form-item">
                                <span class="p-form-tip">SEO描述:</span>
                                <textarea name="metaDescription" placeholder="请输入SEO描述" class="layui-textarea article-textarea" style="resize: none">${article.metaDescription!''}</textarea>
                            </div>

                            <div class="layui-form-item article-switch">
                                <span class="p-form-tip">允许评论:</span>
                                <input type="checkbox" name="isComment" lay-text="允许|不允许" lay-skin="switch" <#if (article.isComment)== 1>checked</#if>>

                                <span class="p-form-tip">置顶:</span>
                                <input type="checkbox" name="isTop" lay-text="置顶|不置顶" lay-skin="switch" <#if (article.isTop)== 1>checked</#if>>
                            </div>
                            <div class="layui-form-item">
                                <span class="p-form-tip">访问密码:</span>
                                <input type="text" name="password" placeholder="请输入访问密码" autocomplete="off" class="article-password-input layui-input" value="${article.password}">
                            </div>

                            <div class="layui-form-item">
                                <span class="p-form-tip">缩略图:</span>
                                <div class="p-upload-box" id="thumbnail">
                                    <input type="hidden" name="thumbnail" value="${article.thumbnail!''}">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
    <script src="/public/libs/editormd/editormd.js"></script>
    <script src="/public/libs/wangeditor/wangEditor.js"></script>
    <script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
    <script src="/public/js/main.js"></script>
    <script src="/admin/pages/article/js/article_update.js"></script>
</body>
</html>