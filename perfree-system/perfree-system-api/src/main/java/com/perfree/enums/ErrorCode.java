package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 定义错误编码枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum ErrorCode {
    DATASOURCE_INIT_SQL_NOT_EXIST(100000000,"数据库初始化脚本不存在!"),
    ACCOUNT_NOT_FOUNT(100000001,"账号不存在!"),
    ACCOUNT_PASSWORD_ERROR(100000002,"账号或密码错误!"),
    CAPTCHA_IMAGE_ERROR(100000004,"验证码生成失败!"),
    CAPTCHA_EXPIRE(100000005,"验证码已过期!"),
    CAPTCHA_VALID_ERROR(100000006,"验证码错误!"),
    MENU_EXISTS_CHILDREN(100000007, "存在子菜单，无法删除!"),
    USER_PASSWORD_NOT_EMPTY(100000008, "密码不能为空!"),
    ACCOUNT_EXIST(100000009, "账户已存在!"),
    CAPTCHA_IS_NOT_EMPTY(100000010,"请输入验证码!"),
    FILE_HANDLE_ERROR(100000011,"文件上传出错!"),
    MASTER_ATTACH_CONFIG_EMPTY(100000012, "未配置默认存储策略或存储策略不存在!"),
    FILE_GET_CONTENT_ERROR(100000013,"获取文件内容出错!"),
    PLUGIN_FILE_NOT_EXIST(100000026,"插件文件不存在,该数据可能为冗余数据,已删除!"),
    PLUGIN_IS_RUN(100000027,"该插件已启用,正在运行,请禁用后再卸载!"),
    PLUGIN_NOT_FOUND(100000028,"未查询到插件信息!"),
    SITE_SLUG_EXIST(100000014,"该站点Slug访问标识已存在!"),
    TAG_SLUG_EXIST(100000015,"该标签Slug访问标识已存在!"),
    CATEGORY_SLUG_EXIST(100000016,"该分类Slug访问标识已存在!"),
    CATEGORY_EXIST_CHILD(100000017,"该分类存在子分类,不能删除!"),
    ARTICLE_SLUG_EXIST(100000018,"该文章Slug访问标识已存在!"),
    OPTION_WEB_THEME_NOT_EXIST(100000019,"当前主题配置不存在,请先启用主题!"),
    SAVE_THEME_ERROR(100000020, "保存主题文件出错,创建目录失败,请检查程序是否有创建目录权限!"),
    THEME_CONFIG_YAML_ERROR(100000021, "主题配置文件不存在或格式错误!"),
    THEME_SWITCH_CHECK_ERROR(100000022, "切换主题失败,该主题不存在或主题配置信息有误!"),
    THEME_UNINSTALL_ERROR_BY_USE(100000023, "当前主题正在使用,不能卸载!"),
    THEME_NOT_EXIST_OR_IS_DEV(100000024, "主题文件不存在或当前主题所在目录为开发环境!"),
    GET_CURRENT_THEME_ERROR(100000025, "获取当前启用的主题失败,请检查是否已启用主题!"),
    ARTICLE_NOT_EXIST(100000029, "文章不存在!"),
    ACCESS_VIOLATION(100000030, "违规访问!"),
    EXTRA_KEY_EXIST(100000031, "key已存在!"),
    DICT_TYPE_EXIST(100000032, "字典类型已存在!"),
    NO_DEL_EXIST_DICT_DATA(100000033, "存在字典数据,不能删除!"),
    DICT_DATA_EXIST(100000034, "字典类型已存在!"),
    AVATAR_MUST_IMAGE(100000035, "头像必须是图片!"),
    USER_NOT_LOGIN(100000036, "账户未登录!" ),
    OLD_PASSWORD_ERROR(100000037, "旧密码校验失败!"),
    MAIL_TEMPLATE_NOT_EXIST(100000038, "邮件模板不存在!"),
    MAIL_SERVER_NOT_EXIST(100000040, "邮件服务不存在!"),
    REFRESH_TOKEN_VALID_FAIL(100000041, "refreshToken不合法!"),
    COMMENT_USER_NAME_NOT_EMPTY(100000042, "姓名或昵称不能为空!"),
    COMMENT_EMAIL_NOT_EMPTY(100000043, "邮箱不能为空!"),
    JOURNAL_NOT_EMPTY(100000044, "内容或附件不能全部为空!"),
    COMMENT_STINT_ERROR(100000045, "评论过于频繁,请稍候再试!"),
    NOT_ALLOW_REGISTER(100000046, "网站已关闭注册功能!"),
    EMAIL_ACCOUNT_NOT_MATE(100000047, "邮箱账户不匹配!"),
    EMAIL_CODE_FAIL(100000048, "邮箱验证码错误!"),
    NO_PERMISSION_PREVIEW(100000049,"仅作者可看,您无权查看!"),
    DEFAULT_THEME_NOT_EXIST(100000050,"默认主题文件不存在!"),
    WEB_IS_INIT(100000051,"网站已初始化, 无法再次初始化!"),
    ;

    private final Integer code;

    private final String msg;

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}
