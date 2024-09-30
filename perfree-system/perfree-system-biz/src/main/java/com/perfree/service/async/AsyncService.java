package com.perfree.service.async;

public interface AsyncService {
    void sendCommentMail(Integer commentId, boolean isUpdateStatus);

}
