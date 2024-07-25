<template>
  <div class="page">
    <el-form :model="addForm" class="demo-form-inline" ref="addFormRef" label-position="top">
      <el-row :gutter="24">
        <el-col :span="17">
          <el-form-item prop="title">
            <template #label>
              <div class="content-label">
                <span class="required">*</span>文章标题
              </div>
            </template>
            <el-input v-model="addForm.title" placeholder="请输入文章标题" clearable @change="titleChange"/>
          </el-form-item>

          <el-form-item prop="content" class="article-content-item">
            <template #label>
              <div class="content-label">
                <div class="content-label-left">
                  <span class="required">*</span>文章内容
                </div>
                <div class="content-label-right">
                  切换编辑器:
                  <el-select placeholder="Select" size="small" style="width: 180px" v-model="addForm.contentModel">
                    <el-option :key="'Vditor'" :label="'Vditor'" :value="'Vditor'" />
                    <el-option :key="'AiEditor'" :label="'AiEditor'" :value="'AiEditor'" />
                  </el-select>
                </div>
              </div>
            </template>
            <custom-editor :editor-type="addForm.contentModel"  :init-value="addForm.content"  ref="editorRef"></custom-editor>
          </el-form-item>
        </el-col>

        <el-col :span="7" class="article-right">
          <el-form-item>
              <el-button type="primary" @click="submitAddForm(0)">发布</el-button>
              <el-button @click="submitAddForm(1)">保存至草稿</el-button>
          </el-form-item>
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


          <el-form-item label="文章摘要" prop="summary">
            <el-input v-model="addForm.summary" placeholder="请输入文章摘要" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
          </el-form-item>
          <el-form-item label="SEO关键字" prop="metaKeywords">
            <el-input v-model="addForm.metaKeywords" placeholder="请输入SEO关键字" clearable/>
          </el-form-item>
          <el-form-item label="SEO描述" prop="metaDescription">
            <el-input v-model="addForm.metaDescription" placeholder="请输入SEO描述" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
          </el-form-item>
          <el-form-item label="文章标识" prop="flag">
            <el-input v-model="addForm.flag" placeholder="请输入文章标识" clearable/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;">
              <div> 
                <span class="custom-label">允许评论</span> <el-switch v-model="addForm.isComment"  :active-value="1" :inactive-value="0"/>
              </div>
              <div style="margin-left: 15px;"> 
                <span class="custom-label">置顶</span> <el-switch v-model="addForm.isTop"  :active-value="1" :inactive-value="0"/>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="封面图" prop="thumbnail">
            <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请选择或输入封面图地址'" v-model:model-value="addForm.thumbnail"></attach-select-input>
          </el-form-item>
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

const addFormRef = ref();
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
  contentModel: 'Vditor'

});

const treeSelectProps = reactive({
  children: 'children',
  label: 'name',
  value: 'id',
});
let categoryData = ref([]);
let tagData = ref([]);
const editorRef = ref();

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
    contentModel: 'Vditor'
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
  if (addForm.value.id) {
    updateArticleApi(addForm.value).then(res => {
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
  addForm.value.slug = pinyin.getCamelChars(addForm.value.title);
}

/**
 * 初始化加载文章
 */
function initArticle() {
  if (!router.currentRoute.value.params.id) {
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
  })
}

initArticle();
initCategory();
initTag();
</script>

<style scoped>

.content-label{
  display: flex;
  width: 100%;
}
.content-label-right{
  margin-left: auto;
}
.article-right{
  border-left: 1px solid var(--el-color-info-light-8);
}
:deep().cherry{
  box-shadow: none;
  background: white;
  border: 1px solid var(--el-color-info-light-8);
}
:deep().cherry-editor .CodeMirror{
  background-color: white !important;;
}
.custom-label{
  line-height: 22px;
  margin-right: 3px;
  color: var(--el-text-color-regular);
}
:deep().el-form-item{
  margin-bottom: 12px;
}
:deep().el-form--default.el-form--label-top .el-form-item .el-form-item__label{
  margin-bottom: 5px;
}
:deep().article-content-item .el-form-item__label{
  display: flex;
}
.required{
  color: var(--el-color-error);
  margin-right: 3px;
}
</style>