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

/**
 * JFinalView
 *
 * <pre>
 * 关键设置：
 * 1：setContentType("text/html;charset=UTF-8") 设置 content type 字符集为 UTF-8
 *
 * 2：setExposeRequestAttributes(true) 设置将 request 中的属性值注入到 model 中去
 *    便于在模板中使用 #(value) 访问 request.setAttribute(...) 进去的值
 *
 * 3： setExposeSessionAttributes(true) 设置将 session 中的属性值注入到 model 中去
 *    使用在模板中使用 #(value) 访问 session.setAttribute(...) 进去的值
 *
 * 注意：JFinalViewResolver.setSessionInView(true) 中的配置与
 *      JFinalView.setExposeSessionAttributes(true) 可实现
 *      相似的功能，区别在于前者访问方式为 #(session.value) 而后者为
 *      #(value)，两种配置只选其一
 * </pre>
 */
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
