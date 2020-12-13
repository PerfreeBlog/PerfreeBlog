package com.perfree.common;

import cn.hutool.http.HtmlUtil;
import com.vladsch.flexmark.ext.tables.TablesExtension;
import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.parser.ParserEmulationProfile;
import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

public class MarkdownUtil {

    public static String mdToHtml(String mdStr) {
        if (StringUtils.isBlank(mdStr)){
            return "";
        }
        MutableDataSet options = new MutableDataSet();
        options.setFrom(ParserEmulationProfile.MARKDOWN);
        //enable table parse!
        options.set(Parser.EXTENSIONS, Arrays.asList(TablesExtension.create()));
        Parser parser = Parser.builder(options).build();
        HtmlRenderer renderer = HtmlRenderer.builder(options).build();
        Node document = parser.parse(mdStr);
        return renderer.render(document);
    }


    public static String mdToStr(String mdStr) {
        String htmlStr = mdToHtml(mdStr);
        if (StringUtils.isBlank(htmlStr)){
            return "";
        }
        return  HtmlUtil.cleanHtmlTag(htmlStr);
    }
}
