package com.perfree.service.async;

public interface AsyncService {
    void sendCommentMail(Integer commentId, boolean isUpdateStatus);

    void sendFindPasswordMail(String random, String email);

}
