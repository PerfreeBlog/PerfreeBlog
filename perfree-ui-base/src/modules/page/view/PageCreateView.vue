<template>
  <div class="article-page" :class="{ 'is-dark': isDark }" v-loading="loading">
    <el-form :model="addForm" ref="addFormRef" label-position="top">
      <el-row :gutter="16">
        <!-- 左侧编辑区 -->
        <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17" class="editor-col">
          <div class="editor-card">
            <div class="title-wrapper">
              <input
                v-model="addForm.title"
                class="article-title-input"
                placeholder="请输入页面标题..."
                @change="titleChange"
              />
            </div>
            <div class="editor-wrapper">
              <custom-editor :editor-type="addForm.contentModel" :init-value="addForm.content" :height="'100%'" ref="editorRef" v-if="!initLoading"></custom-editor>
            </div>
          </div>
        </el-col>

        <!-- 右侧设置区 -->
        <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7" class="setting-col">
          <div class="setting-card">
            <!-- 发布按钮 -->
            <div class="publish-area">
              <el-button type="primary" @click="submitAddForm(0)" size="large" style="flex: 1;">发布页面</el-button>
              <el-button @click="submitAddForm(1)" size="large">存草稿</el-button>
            </div>

            <!-- 折叠面板 -->
            <el-collapse v-model="activeCollapse" class="setting-collapse">
              <!-- 基本设置 -->
              <el-collapse-item title="基本设置" name="basic">
                <el-form-item label="访问地址别名" prop="slug">
                  <el-input v-model="addForm.slug" placeholder="请输入访问地址别名" clearable/>
                </el-form-item>
                <el-form-item label="主题模板" prop="template">
                  <el-select v-model="addForm.template" placeholder="请选择主题模板" style="width: 100%">
                    <el-option :key="'default'" :label="'默认匹配'" :value="'default'" />
                    <el-option v-for="item in templates" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-collapse-item>

              <!-- 摘要与SEO -->
              <el-collapse-item title="摘要与SEO" name="seo">
                <el-form-item label="页面摘要" prop="summary">
                  <el-input v-model="addForm.summary" placeholder="请输入页面摘要" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
                </el-form-item>
                <el-form-item label="SEO关键字" prop="metaKeywords">
                  <el-input v-model="addForm.metaKeywords" placeholder="请输入SEO关键字" clearable/>
                </el-form-item>
                <el-form-item label="SEO描述" prop="metaDescription">
                  <el-input v-model="addForm.metaDescription" placeholder="请输入SEO描述" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
                </el-form-item>
              </el-collapse-item>

              <!-- 高级设置 -->
              <el-collapse-item title="高级设置" name="advanced">
                <el-form-item label="页面标识" prop="flag">
                  <el-input v-model="addForm.flag" placeholder="请输入页面标识" clearable/>
                </el-form-item>
                <div class="switch-group">
                  <div class="switch-item">
                    <span class="switch-label">允许评论</span>
                    <el-switch v-model="addForm.isComment" :active-value="1" :inactive-value="0"/>
                  </div>
                  <div class="switch-item">
                    <span class="switch-label">置顶</span>
                    <el-switch v-model="addForm.isTop" :active-value="1" :inactive-value="0"/>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import CustomEditor from "@/core/components/editor/custom-editor.vue";
import {articleAddApi, articleGetApi, updateArticleApi} from "../api/article.js";
import {ElMessage, ElMessageBox} from "element-plus";
import pinyin from 'js-pinyin'
import {closeTab, toPage} from "@/core/utils/tabs.js";
import {ref} from "vue";
import {getThemePageTplApi} from "@/modules/page/api/theme.js";

const addFormRef = ref();
const activeCollapse = ref(['basic']);
const addForm = ref({
  id: null,
  title: '',
  content: '',
  parseContent: '',
  summary: '',
  metaKeywords: '',
  metaDescription: '',
  thumbnail: '',
  slug: '',
  isComment: 1,
  isTop: 0,
  flag: '',
  type: 'page',
  contentModel: 'AiEditor',
  template: 'default'

});

const editorRef = ref();
let loading = ref(false);
let initLoading = ref(true);
let templates = ref([]);

/**
 * 重置表单
 */
function resetAddForm() {
  addForm.value = {
    id: null,
    title: '',
    content: '',
    parseContent: '',
    summary: '',
    metaKeywords: '',
    metaDescription: '',
    thumbnail: '',
    slug: '',
    isComment: 1,
    isTop: 0,
    flag: '',
    type: 'page',
    contentModel: 'AiEditor',
    template: 'default'
  }
  editorRef.value.resetContent();
  addFormRef.value.resetFields();
}

/**
 * 发布文章
 */
function submitAddForm(status) {
  if(!addForm.value.title) {
    ElMessage.error("页面标题不能为空");
    return;
  }
  let articleContent = editorRef.value.getValue();
  addForm.value.content = articleContent.content;
  addForm.value.parseContent = articleContent.parseContent;
  if(!addForm.value.content) {
    ElMessage.error("页面内容不能为空");
    return;
  }
  addForm.value.status = status;

  loading.value = true;
  if (addForm.value.id) {
    updateArticleApi(addForm.value).then(res => {
      loading.value = false;
      if (res.code === 200) {
        ElMessageBox.confirm('页面修改成功!', '提示', {
          confirmButtonText: '前往页面列表',
          cancelButtonText: '继续修改',
          type: 'success',
        }).then(() => {
          toPage('', '/admin/page', '')
          closeTab(router.currentRoute.value.fullPath)
        }).catch(() => {})
      } else {
        ElMessage.error(res.msg);
      }
    })
  } else {
    articleAddApi(addForm.value).then(res => {
      loading.value = false;
      if (res.code === 200) {
        resetAddForm();
        ElMessageBox.confirm('页面添加成功!', '提示', {
          confirmButtonText: '前往页面列表',
          cancelButtonText: '再添加一个页面',
          type: 'success',
        }).then(() => {
          toPage('', '/admin/page', '')
          closeTab(router.currentRoute.value.fullPath)
        }).catch(() => {})
      } else {
        ElMessage.error(res.msg);
      }
    })
  }
}


/**
 * 文章标题改变事件
 */
function titleChange() {
  if (addForm.value.id){
    return;
  }
  pinyin.setOptions({charCase: 1,checkPolyphone: false})
  addForm.value.slug = pinyin.getCamelChars(addForm.value.title);
}

/**
 * 初始化加载文章
 */
function initArticle() {
  initLoading.value = true;
  if (!router.currentRoute.value.params.id) {
    initLoading.value = false;
    return;
  }
  articleGetApi(router.currentRoute.value.params.id).then(res => {
    if (res.code === 200) {
      addForm.value = res.data;
    }
    initLoading.value = false;
  })
}

function initThemePageTpl() {
  getThemePageTplApi().then(res => {
    templates.value = res.data;
  })
}

initArticle();
initThemePageTpl();
</script>

<style scoped>
.article-page {
  height: calc(100% - 30px);
  overflow: hidden;
  background-color: var(--el-bg-color-page);
  box-sizing: border-box;
}

.article-page :deep(.el-form) {
  height: 100%;
}

.article-page :deep(.el-row) {
  height: 100%;
}

.editor-col {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
  overflow: hidden;
  min-height: 0;
}

.title-wrapper {
  padding: 20px 24px 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.article-title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  padding: 0 0 16px;
  background: transparent;
}

.article-title-input::placeholder {
  color: var(--el-text-color-placeholder);
  font-weight: 400;
}

.editor-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.editor-wrapper :deep(> *) {
  flex: 1;
  min-height: 0;
}

.setting-col {
  height: 100%;
}

.setting-card {
  height: 100%;
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.publish-area {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.setting-collapse {
  border: none;
  --el-collapse-header-bg-color: transparent;
}

.setting-collapse :deep(.el-collapse-item__header) {
  font-weight: 600;
  color: var(--el-text-color-primary);
  font-size: 14px;
  border-bottom: none;
  height: 40px;
}

.setting-collapse :deep(.el-collapse-item__wrap) {
  border-bottom: none;
}

.setting-collapse :deep(.el-collapse-item__content) {
  padding-bottom: 8px;
}

.setting-collapse :deep(.el-form-item) {
  margin-bottom: 14px;
}

.setting-collapse :deep(.el-form-item__label) {
  font-size: 13px;
  color: var(--el-text-color-regular);
  margin-bottom: 4px;
}

.switch-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--el-fill-color-light);
  border-radius: 6px;
}

.switch-label {
  font-size: 13px;
  color: var(--el-text-color-regular);
}

/* AiEditor 样式优化 */
:deep(.aie-container) {
  border: none !important;
  height: 100% !important;
}

:deep(.aie-container .aie-main) {
  height: 100% !important;
}
</style>
