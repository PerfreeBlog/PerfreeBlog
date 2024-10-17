<template>
  <div v-loading="loading">
    <div class="theme-header-box">
      <h2 class="theme-editor-title">主题编辑: {{currThemePath}}</h2>
      <el-button type="primary" style="margin-left: auto;" @click="saveFile">保存</el-button>
    </div>
    <el-divider />
    <el-row :gutter="20">

      <el-col  :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <el-tree
            style="width: 100%;max-height: 700px;overflow: auto;"
            :data="fileList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
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

      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <codemirror
            v-model="code"
            placeholder="请选择左侧要编辑的文件..."
            :style="{ height: '700px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
        />
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
import {ref} from "vue";
import {handleTree} from "@/core/utils/perfree.js";
import {ElMessage} from "element-plus";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Codemirror} from 'vue-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {oneDark} from '@codemirror/theme-one-dark'

const currThemePath = router.currentRoute.value.params.themePath;
let fileList = ref([]);
let loading = ref(true)
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
const code = ref(``)
const extensions = [javascript(), oneDark]
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
  loading.value = true;
  getThemeFileContent(param).then(res => {
    if (res.code === 200) {
      activeFileId.value = [data.id];
      code.value = res.data
      activeFile.value = data;
      treeRef.value.setCheckedKeys([data.id], true)
    } else {
      ElMessage.error(res.msg);
    }
    loading.value = false;
  })
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
  loading.value = true;
  saveThemeFileContent({themePath: currThemePath, content: code.value, path: activeFile.value.filePath}).then(res => {
    if (res.code === 200 && res.data) {
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.msg);
    }
    loading.value = false;
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
:deep().ͼ1 .cm-scroller{
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
</style>
