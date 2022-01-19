package com.perfree.commons;

import cn.hutool.http.HtmlUtil;
import org.apache.commons.lang3.StringUtils;
import org.commonmark.Extension;
import org.commonmark.ext.autolink.AutolinkExtension;
import org.commonmark.ext.front.matter.YamlFrontMatterExtension;
import org.commonmark.ext.gfm.strikethrough.StrikethroughExtension;
import org.commonmark.ext.gfm.tables.TablesExtension;
import org.commonmark.ext.heading.anchor.HeadingAnchorExtension;
import org.commonmark.ext.image.attributes.ImageAttributesExtension;
import org.commonmark.ext.ins.InsExtension;
import org.commonmark.ext.task.list.items.TaskListItemsExtension;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

import java.util.Arrays;
import java.util.List;

/**
 * MarkdownUtils
 * @author Perfree
 */
public class MarkdownUtil {

    /**
     * markdown to html
     * @param mdStr mdStr
     * @return String
     */
    public static String mdToHtml(String mdStr) {
        if (StringUtils.isBlank(mdStr)){
            return "";
        }
        List<Extension> extensions = Arrays.asList(TablesExtension.create(),
                ImageAttributesExtension.create(),
                AutolinkExtension.create(),
                StrikethroughExtension.create(),
                HeadingAnchorExtension.create(),
                InsExtension.create(),
                YamlFrontMatterExtension.create(),
                TaskListItemsExtension.create());
        Parser parser = Parser.builder().extensions(extensions).build();
        Node document = parser.parse(mdStr);
        HtmlRenderer renderer = HtmlRenderer.builder().softbreak("<br/>").extensions(extensions).build();
        return renderer.render(document);
    }


    /**
     * Markdown to string
     * @param mdStr mdStr
     * @return String
     */
    public static String mdToStr(String mdStr) {
        String htmlStr = mdToHtml(mdStr);
        if (StringUtils.isBlank(htmlStr)){
            return "";
        }
        return  HtmlUtil.cleanHtmlTag(htmlStr);
    }
}
