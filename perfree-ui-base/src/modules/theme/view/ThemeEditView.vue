<template>
  <div class="theme-edit-container">
    <div class="theme-content-wrapper">
      <div class="theme-sidebar" v-loading="loading">
        <div class="sidebar-header">
          <span class="sidebar-title">{{ currThemePath }}</span>
        </div>
        <el-tree
            class="theme-file-tree"
            :data="fileList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
            :highlight-current="true"
            :default-checked-keys="activeFileId"
            ref="treeRef"
        >
          <template #default="{ node, data }">
          <span class="custom-tree-node">
            <font-awesome-icon icon="fa-regular fa-folder-open" v-if="data.fileType === 'dir'" class="file-list-icon folder"></font-awesome-icon>
            <font-awesome-icon icon="fa-brands fa-js-square" v-else-if="data.fileType === 'js'" class="file-list-icon js"></font-awesome-icon>
            <font-awesome-icon icon="fa-brands fa-html5" v-else-if="data.fileType === 'html'" class="file-list-icon html"></font-awesome-icon>
            <font-awesome-icon icon="fa-brands fa-css3"
                                v-else-if="data.fileType === 'css' || data.fileType === 'less' || data.fileType === 'scss'" class="file-list-icon css"
            ></font-awesome-icon>
            <font-awesome-icon icon="fa-solid fa-text-height" v-else-if="data.fileType === 'txt'" class="file-list-icon txt"></font-awesome-icon>
            <font-awesome-icon icon="fa-regular fa-file" v-else class="file-list-icon"></font-awesome-icon>
            <span class="file-name">{{ node.label }}</span>
          </span>
          </template>
        </el-tree>
      </div>

      <div class="theme-editor-panel" v-loading="codeLoading">
        <div class="editor-header">
          <span class="editor-file-name">{{ activeFile.fileName || '请选择文件' }}</span>
          <el-button type="primary" size="small" @click="saveFile" :disabled="!activeFile.fileName">
            <font-awesome-icon icon="fa-solid fa-save" style="margin-right: 5px;"></font-awesome-icon>
            保存
          </el-button>
        </div>
        <div ref="codeEditorRef" class="codeEditor"></div>
      </div>
    </div>


    <el-image-viewer
        v-if="showViewer"
        :url-list="srcList"
        hide-on-click-modal
        @close="closeViewer">
    </el-image-viewer>
  </div>
</template>
<script setup>
import {getThemeFileContent, getThemeFilesByName, saveThemeFileContent} from "@/modules/theme/api/theme.js";
import {onMounted, ref} from "vue";
import {handleTree} from "@/core/utils/perfree.js";
import {ElMessage} from "element-plus";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css'; // 样式
import 'codemirror/theme/material-darker.css';
import 'codemirror/addon/display/placeholder';
const currThemePath = router.currentRoute.value.params.themePath;
let fileList = ref([]);
let loading = ref(true)
let codeLoading = ref(false)
const codeEditorRef = ref();
let editor = null;
onMounted(() => {
  editor = Codemirror(codeEditorRef.value, {
    value: '',
    placeholder: '请在左侧文件列表选择文件进行编辑...',
    lineNumbers: true, // 显示行号
    mode: 'htmlmixed', // 设置语言模式
    theme: 'material-darker', // 主题
    indentWithTabs: true, // 使用 Tab 键缩进
    tabSize: 2, // 设置 Tab 键的宽度
    lineWrapping: true, // 自动换行
  });
})

const defaultProps = {
  children: 'children',
  label: 'fileName',
}
let activeFileId = ref([]);
let activeFile = ref({});
const treeRef = ref();

// 图片
const supportImageFileType = ["jpg","png","gif","ico", "jpeg"];
let srcList = ref([]);
let showViewer =  ref(false)
// 编辑器
const supportEditFileType = ['java', 'js', 'css', 'html', 'json', 'yaml', 'less', 'scss', 'txt', 'md']
function initFileList() {
  loading.value = true;
  getThemeFilesByName(currThemePath).then(res => {
    if (res.code === 200) {
      fileList.value = handleTree(res.data, "id", "pid",'children', '-1');
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
    let supportImageIndex = supportImageFileType.findIndex((type) => type === data.fileType);
    if (supportImageIndex < 0) {
      ElMessage.error('暂不支持该类型文件的预览和修改');
      return;
    }
    showImage(data.staticPath);
    return;
  }
  let param = {
    themePath: currThemePath,
    path:  data.filePath
  }
  codeLoading.value = true;
  getThemeFileContent(param).then(res => {
    if (res.code === 200) {
      editor.setValue(res.data);
      switchMode(data.fileType);
      activeFileId.value = [data.id];
      activeFile.value = data;
    } else {
      ElMessage.error(res.msg);
    }
    codeLoading.value = false;
  })
}

function switchMode(fileType) {
  if (fileType === 'html') {
    editor.setOption('mode', 'htmlmixed');
  } else if (fileType === 'css') {
    editor.setOption('mode', 'css');
  } else if (fileType === 'js') {
    editor.setOption('mode', 'javascript');
  }  else if (fileType === 'json') {
    editor.setOption('mode', 'javascript');
  }else if (fileType === 'yaml') {
    editor.setOption('mode', 'yaml');
  } else {
    editor.setOption('mode', 'javascript');
  }
}


function showImage(path) {
  srcList.value[0] = "/static/themes/" + path;
  showViewer.value = true;
}
// 关闭图片查看器
function closeViewer() {
  showViewer.value = false;
}

function saveFile() {
  if (!activeFile.value.filePath) {
    return
  }
  codeLoading.value = true;
  saveThemeFileContent({themePath: currThemePath, content: editor.getValue(), path: activeFile.value.filePath}).then(res => {
    if (res.code === 200 && res.data) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.msg);
    }
    codeLoading.value = false;
  })
}

initFileList()

</script>

<style scoped>
.theme-edit-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.theme-content-wrapper {
  flex: 1;
  display: flex;
  gap: 12px;
  overflow: hidden;
}

.theme-sidebar {
  width: 240px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
  overflow: hidden;
}

.sidebar-header {
  padding: 12px 15px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.theme-file-tree {
  flex: 1;
  overflow: auto;
  padding: 8px 0;
  background: transparent;
}

.theme-editor-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
  overflow: hidden;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
}

.editor-file-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.codeEditor {
  flex: 1;
  overflow: hidden;
}

.custom-tree-node {
  display: flex;
  align-items: center;
}

.file-list-icon {
  margin-right: 6px;
  font-size: 14px;
}

.file-list-icon.folder {
  color: #f0c040;
}

.file-list-icon.js {
  color: #f7df1e;
}

.file-list-icon.css {
  color: #264de4;
}

.file-list-icon.html {
  color: #e44d26;
}

.file-list-icon.txt {
  color: #6b7280;
}

.file-name {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.ͼ1.cm-focused) {
  outline: none !important;
}

:deep(.CodeMirror) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 13px;
  height: 100% !important;
  line-height: 1.6;
}

:deep(.CodeMirror-gutters) {
  border-right: none;
  background: transparent;
}

:deep(.el-tree-node__content) {
  height: 32px;
  border-radius: 4px;
  margin: 0 6px;
  padding-left: 8px !important;
}

:deep(.el-tree-node__content:hover) {
  background-color: var(--el-fill-color);
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: var(--el-color-primary-light-9) !important;
  color: var(--el-color-primary);
}

:deep(.el-tree-node.is-current > .el-tree-node__content .file-list-icon) {
  color: var(--el-color-primary);
}

:deep(.el-tree-node__expand-icon) {
  font-size: 12px;
}
</style>
