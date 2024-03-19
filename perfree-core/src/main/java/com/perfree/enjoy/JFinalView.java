package com.perfree.enjoy;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.view.AbstractTemplateView;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class JFinalView extends AbstractTemplateView {
    @Override
    protected void renderMergedTemplateModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (JFinalViewResolver.sessionInView) {
            HttpSession hs = request.getSession(JFinalViewResolver.createSession);
            if (hs != null) {
                model.put("session", new InnerSession(hs));
            }
        }

        try {
            OutputStream os = response.getOutputStream();
            JFinalViewResolver.engine.getTemplate(getUrl()).render(model, os);
        } catch (Exception e) {	// 捕获 ByteWriter.close() 抛出的 RuntimeException
            Throwable cause = e.getCause();
            if (cause instanceof IOException) {	// ClientAbortException、EofException 直接或间接继承自 IOException
                String name = cause.getClass().getSimpleName();
                if ("ClientAbortException".equals(name) || "EofException".equals(name)) {
                    return ;
                }
            }

            throw e;
        }
    }

    @SuppressWarnings({"unchecked", "rawtypes", "deprecation"})
    public static class InnerSession extends HashMap<Object, Object> implements HttpSession {

        private static final long serialVersionUID = -8679493647540628009L;
        private HttpSession session;

        public InnerSession(HttpSession session) {
            this.session = session;
        }

        // HashMap 相关方法处理 ----------------------------------------------------
        /**
         * 覆盖 HashMap 的 put
         */
        public Object put(Object name, Object value) {
            session.setAttribute((String)name, value);
            return null;
        }

        /**
         * 覆盖 HashMap 的 get
         */
        public Object get(Object name) {
            return session.getAttribute((String)name);
        }

        // Session 相关方法处理 ----------------------------------------------------
        public Object getAttribute(String key) {
            return session.getAttribute(key);
        }

        public Enumeration getAttributeNames() {
            return session.getAttributeNames();
        }

        public long getCreationTime() {
            return session.getCreationTime();
        }

        public String getId() {
            return session.getId();
        }

        public long getLastAccessedTime() {
            return session.getLastAccessedTime();
        }

        public int getMaxInactiveInterval() {
            return session.getMaxInactiveInterval();
        }

        public ServletContext getServletContext() {
            return session.getServletContext();
        }


        public void invalidate() {
            session.invalidate();
        }

        public boolean isNew() {
            return session.isNew();
        }


        public void removeAttribute(String key) {
            session.removeAttribute(key);
        }


        public void setAttribute(String key, Object value) {
            session.setAttribute(key, value);
        }

        public void setMaxInactiveInterval(int maxInactiveInterval) {
            session.setMaxInactiveInterval(maxInactiveInterval);
        }

        public String toString() {
            return session != null ? session.toString() : "null";
        }
    }
}
