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
                placeholder="请输入文章标题..."
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
              <el-button type="primary" @click="submitAddForm(0)" size="large" style="flex: 1;">发布文章</el-button>
              <el-button @click="submitAddForm(1)" size="large">存草稿</el-button>
            </div>

            <!-- 折叠面板 -->
            <el-collapse v-model="activeCollapse" class="setting-collapse">
              <!-- 基本设置 -->
              <el-collapse-item title="基本设置" name="basic">
                <el-form-item label="访问地址别名" prop="slug">
                  <el-input v-model="addForm.slug" placeholder="请输入访问地址别名" clearable/>
                </el-form-item>
                <el-form-item label="分类" prop="categoryIds">
                  <el-tree-select
                      v-model="addForm.categoryIds"
                      :data="categoryData"
                      :props="treeSelectProps"
                      check-strictly
                      :render-after-expand="false"
                      style="width: 100%"
                      clearable
                      multiple
                      placeholder="请选择分类"
                  />
                </el-form-item>
                <el-form-item label="标签" prop="selectTags">
                  <el-select v-model="addForm.selectTags" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder="请选择或新增标签" value-key="id">
                    <el-option v-for="item in tagData" :key="item.id" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="封面图" prop="thumbnail">
                  <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请选择或输入封面图地址'" v-model:model-value="addForm.thumbnail"></attach-select-input>
                </el-form-item>
              </el-collapse-item>

              <!-- 摘要与SEO -->
              <el-collapse-item title="摘要与SEO" name="seo">
                <el-form-item label="文章摘要" prop="summary">
                  <el-input v-model="addForm.summary" placeholder="请输入文章摘要" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
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
                <el-form-item label="文章标识" prop="flag">
                  <el-input v-model="addForm.flag" placeholder="请输入文章标识" clearable/>
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
                  <div class="switch-item">
                    <span class="switch-label">可见性</span>
                    <el-switch v-model="addForm.visibility" :active-value="0" :inactive-value="1" inline-prompt
                      style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-warning);"
                      active-text="公开" inactive-text="私密"/>
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
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import CustomEditor from "@/core/components/editor/custom-editor.vue";
import {categoryListTreeApi} from "../api/category.js";
import {getAllTag} from "../api/tag.js";
import {articleAddApi, articleGetApi, updateArticleApi} from "../api/article.js";
import {handleTree} from "@/core/utils/perfree.js";
import {ElMessage, ElMessageBox} from "element-plus";
import pinyin from 'js-pinyin'
import {closeTab, toPage} from "@/core/utils/tabs.js";
import {reactive, ref} from "vue";
import {useDark} from "@vueuse/core";

const isDark = useDark();
const addFormRef = ref();
let initLoading = ref(true);
const activeCollapse = ref(['basic']);
const addForm = ref({
  id: null,
  title: '',
  content: '',
  parseContent: '',
  selectTags: [],
  categoryIds: [],
  summary: '',
  metaKeywords: '',
  metaDescription: '',
  thumbnail: '',
  slug: '',
  isTop: 0,
  isComment: 1,
  flag: '',
  type: 'article',
  contentModel: 'AiEditor',
  visibility: 0
});

const treeSelectProps = reactive({
  children: 'children',
  label: 'name',
  value: 'id',
});
let categoryData = ref([]);
let tagData = ref([]);
const editorRef = ref();
let loading = ref(false);

/**
 * 初始化分类列表
 */
function initCategory() {
  categoryListTreeApi({}).then((res) => {
    categoryData.value = handleTree(res.data, "id", "pid",'children', -1);
  });
}

/**
 * 初始化标签
 */
function initTag() {
  getAllTag().then((res) => {
    tagData.value = res.data;
  });
}

/**
 * 重置表单
 */
function resetAddForm() {
  addForm.value = {
    id: null,
    title: '',
    content: '',
    parseContent: '',
    selectTags: [],
    categoryIds: [],
    summary: '',
    metaKeywords: '',
    metaDescription: '',
    thumbnail: '',
    slug: '',
    isTop: 0,
    isComment: 1,
    flag: '',
    type: 'article',
    contentModel: 'AiEditor',
    visibility: 0
  }
  editorRef.value.resetContent();
  addFormRef.value.resetFields();
}

/**
 * 发布文章
 */
function submitAddForm(status) {
  if(!addForm.value.title) {
    ElMessage.error("文章标题不能为空");
    return;
  }
  let articleContent = editorRef.value.getValue();
  addForm.value.content = articleContent.content;
  addForm.value.parseContent = articleContent.parseContent;
  if(!addForm.value.content) {
    ElMessage.error("文章内容不能为空");
    return;
  }
  addForm.value.status = status;

  // 处理标签
  addForm.value.tagIds = [];
  addForm.value.addTags = [];
  addForm.value.selectTags.forEach(tag => {
    if(tag.id) {
      addForm.value.tagIds.push(tag.id);
    } else {
      addForm.value.addTags.push(tag);
    }
  })
  loading.value = true;
  if (addForm.value.id) {
    updateArticleApi(addForm.value).then(res => {
      loading.value = false;
      if (res.code === 200) {
        ElMessageBox.confirm('文章修改成功!', '提示', {
          confirmButtonText: '前往文章列表',
          cancelButtonText: '继续修改',
          type: 'success',
        }).then(() => {
          toPage('', '/admin/article', '')
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
        ElMessageBox.confirm('文章发表成功!', '提示', {
          confirmButtonText: '前往文章列表',
          cancelButtonText: '再写一篇',
          type: 'success',
        }).then(() => {
          toPage('', '/admin/article', '')
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
      addForm.value.categoryIds = [];
      res.data.categoryList.forEach(r => {
        addForm.value.categoryIds.push(r.id)
      })
      addForm.value.selectTags = res.data.tagList;
    }
    initLoading.value = false;
  })
}

initArticle();
initCategory();
initTag();
</script>

<style scoped>
.article-page {
  height: calc(100% - 30px);
  overflow: hidden;
  background-color: #f0f2f5;
  box-sizing: border-box;
}

.article-page.is-dark {
  background-color: #1d1e1f;
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
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  min-height: 0;
}

.is-dark .editor-card {
  background: #1d1e1f;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.title-wrapper {
  padding: 20px 24px 0;
  border-bottom: 1px solid #f0f0f0;
}

.is-dark .title-wrapper {
  border-bottom-color: #414243;
}

.article-title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  padding: 0 0 16px;
  background: transparent;
}

.is-dark .article-title-input {
  color: #e5eaf3;
}

.article-title-input::placeholder {
  color: #bfbfbf;
  font-weight: 400;
}

.is-dark .article-title-input::placeholder {
  color: #8d9095;
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
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.is-dark .setting-card {
  background: #1d1e1f;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.publish-area {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.is-dark .publish-area {
  border-bottom-color: #414243;
}

.setting-collapse {
  border: none;
  --el-collapse-header-bg-color: transparent;
}

.setting-collapse :deep(.el-collapse-item__header) {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  border-bottom: none;
  height: 40px;
}

.is-dark .setting-collapse :deep(.el-collapse-item__header) {
  color: #e5eaf3;
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
  color: #606266;
  margin-bottom: 4px;
}

.is-dark .setting-collapse :deep(.el-form-item__label) {
  color: #a3a6ad;
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
  background: #f9fafb;
  border-radius: 6px;
}

.is-dark .switch-item {
  background: #262727;
}

.switch-label {
  font-size: 13px;
  color: #606266;
}

.is-dark .switch-label {
  color: #a3a6ad;
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
