package com.perfree.config;

import com.jfinal.template.source.ClassPathSourceFactory;
import com.jfinal.template.source.FileSourceFactory;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.common.Constants;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {

    @Override
    public ISource getSource(String s, String s1, String s2) {
        ISource iSource;
        try{
            iSource = new ClassPathSourceFactory().getSource(null, s1, s2);
        }catch (Exception e) {
            try{
                iSource =  new CustomClassPathSource(null, s1, s2);
            } catch (Exception e2) {
                iSource = new FileSourceFactory().getSource(Constants.RESOURCES_DIR, s1, s2);
            }
        }
        return iSource;
    }
}
