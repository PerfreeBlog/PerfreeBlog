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
            <el-input v-model="addForm.title" placeholder="请输入文章标题" clearable/>
          </el-form-item>

          <el-form-item prop="content" class="article-content-item">
            <template #label>
              <div class="content-label">
                <div class="content-label-left">
                  <span class="required">*</span>文章内容
                </div>
                <div class="content-label-right">
                  切换编辑器:
                  <el-select placeholder="Select" size="small" style="width: 120px" v-model="editorType">
                    <el-option :key="'cherry'" :label="'cherry'" :value="'cherry'" />
                    <el-option :key="'vditor'" :label="'vditor'" :value="'vditor'" />
                  </el-select>
                </div>
              </div>
            </template>
            <custom-editor :editor-type="editorType"  :init-value="addForm.content" @content-change="contentChange" ref="editorRef"></custom-editor>
          </el-form-item>
        </el-col>

        <el-col :span="7" class="article-right">
          <el-form-item>
              <el-button type="primary" @click="submitAddForm">发布</el-button>
              <el-button @click="open = false; resetAddForm()">保存至草稿</el-button>
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
import 'cherry-markdown/dist/cherry-markdown.css';
import CustomEditor from "@/components/custom-editor.vue";
import {categoryListTreeApi} from "@/api/category.js";
import {getAllTag} from "@/api/tag.js";
import {articleAddApi} from "@/api/article.js";
import {handleTree} from "@/utils/perfree.js";

const editorType = ref('cherry');
const addFormRef = ref();
const addForm = ref({
  title: '',
  content: '',
  selectTags: [],
  categoryIds: [],
  summary: '',
  metaKeywords: '',
  metaDescription: '',
  thumbnail: '',
  slug: '',
  isTop: 0,
  isComment: 1,
  flag: ''
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
 * 发布文章
 */
function submitAddForm() {
  if(!addForm.value.title) {
    ElMessage.error("文章标题不能为空");
    return;
  }
  if(!addForm.value.content) {
    ElMessage.error("文章内容不能为空");
    return;
  }

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
  console.log(addForm.value);
  articleAddApi(addForm.value).then(res => {
    console.log(res)
  })
}

/**
 * 内容改变事件
 */
function contentChange(value) {
  addForm.value.content = value;
}

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