<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
    <link href="/admin/pages/user/css/user_center.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body">
<div class="p-container ">
    <div class="layui-card">
        <div class="layui-card-header">设置资料</div>
        <div class="layui-card-body">
            <form class="layui-form" lay-filter="editForm">
                <input type="hidden" name="id" class="layui-input" value="${userForm.id}">
                <div class="layui-form-item">
                    <label class="layui-form-label">
                        用户名:
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" name="userName" value="${userForm.userName}" required lay-verify="required"  placeholder="请输入用户名" autocomplete="off" class="layui-input" minlength="2" maxlength="16">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">
                        账户:
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" name="account" disabled value="${userForm.account}" required minlength="3" maxlength="12"  lay-verify="required" placeholder="请输入账户" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">邮箱:</label>
                    <div class="layui-input-inline">
                        <input type="text" name="email" placeholder="请输入邮箱" value="${userForm.email!''}" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">性别: </label>
                    <div class="layui-input-inline">
                        <select name="sex">
                            <option value="">请选择</option>
                            <option value="0" <#if (userForm.sex)== 0>selected</#if>>女</option>
                            <option value="1" <#if (userForm.sex)== 1>selected</#if>>男</option>
                        </select>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">头像:</label>
                    <div class="layui-input-inline">
                        <input type="hidden" name="avatar" id="avatar" value="${userForm.avatar}">
                        <div class="upload-box">
                            <div class="upload-panel" id="upload" <#if (userForm.avatar)?? && (userForm.avatar) != "">style="display: none"</#if>>
                                <i class="fa fa-upload" aria-hidden="true"></i>
                            </div>
                            <div class="upload-success-panel" id="uploadSuccessPanel" <#if (userForm.avatar)?? && (userForm.avatar) != "">style="display: block"</#if>>
                                <img src="${userForm.avatar}">
                                <div class="delete-img-box" id="deleteImg">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label"></label>
                    <div class="layui-input-inline">
                        <button type="submit" lay-submit lay-filter="editForm" class="layui-btn layui-btn-normal">确认修改</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="layui-card">
        <div class="layui-card-header">修改密码</div>
        <div class="layui-card-body">
            <form class="layui-form" lay-filter="passwordForm">
                <div class="layui-form-item">
                    <label class="layui-form-label">
                        旧密码:
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" name="userName" required lay-verify="required"  placeholder="请输入用户名" autocomplete="off" class="layui-input" minlength="2" maxlength="16">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">
                        新密码:
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" name="userName" required lay-verify="required"  placeholder="请输入用户名" autocomplete="off" class="layui-input" minlength="2" maxlength="16">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label"></label>
                    <div class="layui-input-inline">
                        <button type="submit" lay-submit lay-filter="passwordForm" class="layui-btn layui-btn-normal">确认修改</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
<script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
<script src="/admin/pages/user/js/user_center.js"></script>
</body>
</html>