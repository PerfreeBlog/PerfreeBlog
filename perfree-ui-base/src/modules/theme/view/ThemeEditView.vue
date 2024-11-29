<template>
  <div>
    <div class="theme-header-box">
      <h2 class="theme-editor-title">主题编辑: {{currThemePath}}</h2>
      <el-button type="primary" style="margin-left: auto;" @click="saveFile">保存</el-button>
    </div>
    <el-divider />
    <el-row :gutter="20">

      <el-col  :xs="24" :sm="24" :md="4" :lg="4" :xl="4" v-loading="loading">
        <el-tree
            style="width: 100%;max-height: 700px;overflow: auto;"
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

      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20"   v-loading="codeLoading">
        <div class="codeEditorFileName">{{activeFile.fileName}}</div>
        <div ref="codeEditorRef" class="codeEditor"></div>
      </el-col>
    </el-row>


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
:deep().el-tree-node.is-current{
  background-color: var(--el-fill-color-darker)!important;
}
:deep().is-expanded .el-tree-node{
  background: var(--el-bg-color);
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
  height: 670px!important;
  overflow: hidden;
}
.codeEditorFileName{
  background: var(--el-bg-color);
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
}
</style>
