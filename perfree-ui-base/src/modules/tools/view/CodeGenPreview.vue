<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="6" v-loading="loading">
        <el-tree
            style="width: 100%;max-height: 700px;overflow: auto;"
            :data="fileList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
            :default-checked-keys="activeFileId"
            default-expand-all
            ref="treeRef"
        >
          <template #default="{ node, data }">
          <span class="custom-tree-node">
            <font-awesome-icon  icon="fa-regular fa-folder-open " v-if="data.fileType === 'dir'" class="file-list-icon folder"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-js-square" v-else-if="data.fileType === 'js'" class="file-list-icon js"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-html5 " v-else-if="data.fileType === 'html'" class="file-list-icon html"></font-awesome-icon>
            <font-awesome-icon  icon="fa-brands fa-css3 "
                                v-else-if="data.fileType === 'css' || data.fileType === 'less' || data.fileType === 'scss'" class="file-list-icon css"
            ></font-awesome-icon>
             <font-awesome-icon  icon="fa-solid fa-text-height " v-else-if="data.fileType === 'txt'" class="file-list-icon txt"></font-awesome-icon>
            <font-awesome-icon  icon="fa-regular fa-file " v-else class="file-list-icon"></font-awesome-icon>
            <span>{{ node.label }}</span>
          </span>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="18" v-loading="fileContentLoading">
        <div ref="codeEditorRef" class="codeEditor"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {handleTree} from "@/core/utils/perfree.js";
import {ElMessage} from "element-plus";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getCodeFileContent, getCodeFileList} from "../api/codegen.js";
import {useRoute} from "vue-router";
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css'; // 样式
import 'codemirror/theme/material-darker.css';
import 'codemirror/addon/display/placeholder';
const route = useRoute();
let fileList = ref([]);
let loading = ref(true)
let fileContentLoading = ref(true)
const defaultProps = {
  children: 'children',
  label: 'fileName',
}
let activeFileId = ref([]);
let activeFile = ref({});
const treeRef = ref();
let codeLoading = ref(false)
const codeEditorRef = ref();
let editor = null;
onMounted(() => {
  editor = Codemirror(codeEditorRef.value, {
    value: '',
    placeholder: '请在左侧文件列表选择文件...',
    lineNumbers: true, // 显示行号
    mode: 'javascript', // 设置语言模式
    theme: 'material-darker', // 主题
    indentWithTabs: true, // 使用 Tab 键缩进
    tabSize: 2, // 设置 Tab 键的宽度
    lineWrapping: true, // 自动换行
  });
})
// 编辑器
const supportEditFileType = ['java', 'js', 'css', 'html', 'json', 'yaml', 'less', 'scss', 'txt', 'md','vue', 'xml', 'sql']
function initFileList() {
  loading.value = true;
  getCodeFileList(route.params.id).then(res => {
    if (res.code === 200) {
      let defaultOpenFile = null;
      res.data.forEach(r => {
        if (r.fileType !== 'dir' && defaultOpenFile === null){
          defaultOpenFile = r;
          activeFileId.value = [r.id]
        }
      })
      fileList.value = handleTree(res.data, "id", "pid",'children', '-1');
      handleNodeClick(defaultOpenFile);
    } else {
      ElMessage.error(res.msg);
    }
    loading.value = false;
  })
}

function handleNodeClick(data) {
  if (data.fileType === 'dir') {
    return;
  }
  let index = supportEditFileType.findIndex((type) => type === data.fileType);
  if (index < 0) {
    return;
  }
  let param = {
    tableId: route.params.id,
    path:  data.filePath
  }
  fileContentLoading.value = true;
  getCodeFileContent(param).then(res => {
    if (res.code === 200) {
      activeFileId.value = [data.id];
      editor.setValue(res.data);
      activeFile.value = data;
      treeRef.value.setCheckedKeys([data.id], true)
    } else {
      ElMessage.error(res.msg);
    }
    fileContentLoading.value = false;
  })
}

initFileList()

</script>

<style scoped>
.file-list-icon{
  margin-right: 5px;
}
.file-list-icon.folder{
  color: #ebd109;
}
.file-list-icon.js{
  color: #ebd109;
}
.file-list-icon.css{
  color: #eb6909;
}
.file-list-icon.html{
  color: #09eb46;
}
.file-list-icon.txt{
  color: #09eb46;
}
:deep().ͼ1.cm-focused{
  outline: none!important;
}
:deep().CodeMirror{
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', serif;
  font-size: 14px;
}
:deep().el-tree-node.is-checked{
  background-color: var(--el-fill-color-darker)!important;
}

.theme-editor-title{
  font-size: 17px;
  margin: 0 ;
  color: var(--el-text-color-regular);
}
.el-divider--horizontal{
  margin: 15px 0;
}
.theme-header-box{
  display: flex;
}
:deep().CodeMirror{
  height: 700px!important;
}
</style>
