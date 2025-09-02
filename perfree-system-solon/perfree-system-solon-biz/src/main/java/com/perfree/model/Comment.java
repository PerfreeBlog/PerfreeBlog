package com.perfree.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Getter
@Setter
@Table("p_comment")
public class Comment extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @Id(keyType = KeyType.Auto)
    private Integer id;

    /**
     * 文章id
     */
    private Integer articleId;

    /**
     * 父级id
     */
    private Integer pid;

    /**
     * 顶层父级id
     */
    private Integer topPid;

    /**
     * 用户iD
     */
    private Integer userId;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 状态:0正常,1:待审核
     */
    private Integer status;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 网站地址
     */
    private String website;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 评论人
     */
    private String userName;

    /**
     * 设备类型
     */
    private String device;

    /**
     * ip
     */
    private String ip;
}
