package com.perfree.commons;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * JwtToken
 * @author Perfree
 */
public class JwtToken implements AuthenticationToken {
    /**
	 * serialVersionUID
	 * long
	 */
	private static final long serialVersionUID = 1934231970588104708L;
	private String token;

    public JwtToken(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
