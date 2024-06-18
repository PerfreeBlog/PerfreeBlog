<template>
  <div class="page">
    <el-form :model="addForm" class="demo-form-inline" ref="addFormRef" label-position="top">
      <el-row :gutter="24">
        <el-col :span="17">
          <el-form-item label="文章标题">
            <el-input v-model="addForm.name" placeholder="请输入文章标题" clearable/>
          </el-form-item>

          <el-form-item>
            <template #label>
              <div class="content-label">
                <div class="content-label-left">
                  文章内容
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
            <custom-editor :editor-type="editorType"></custom-editor>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="文章内容">
            <el-input v-model="addForm.name" placeholder="请输入文章标题" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import 'cherry-markdown/dist/cherry-markdown.css';
import CustomEditor from "@/components/custom-editor.vue";

const editorType = ref('cherry');
const addFormRef = ref();
const addForm = ref({
  name: '',
  content: ''
})



</script>

<style scoped>
.content-label{
  display: flex;
}
.content-label-right{
  margin-left: auto;
}
</style>