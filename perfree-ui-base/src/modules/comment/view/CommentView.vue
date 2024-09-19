<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="评论人">
          <el-input v-model="searchForm.userName" placeholder="请输入评论人名称" clearable/>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input v-model="searchForm.content" placeholder="请输入评论内容" clearable/>
        </el-form-item>
        <el-form-item label="所属标题">
          <el-input v-model="searchForm.articleTitle" placeholder="请输入所属标题" clearable/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 200px" clearable>
            <el-option :key="0" :label="'正常'" :value="0" />
            <el-option :key="1" :label="'待审核'" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchForm.articleType" placeholder="请选择类型" style="width: 200px" clearable>
            <el-option :key="'article'" :label="'文章'" :value="'article'" />
            <el-option :key="'journal'" :label="'动态'" :value="'journal'" />
            <el-option :key="'page'" :label="'页面'" :value="'page'" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" v-hasPermission="['admin:role:query']">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="id" label="标识"   show-overflow-tooltip min-width="80"/>
        <el-table-column prop="userName" label="评论人"  show-overflow-tooltip min-width="150">
          <template v-slot="scope">
            <span>{{ scope.row.userInfo? scope.row.userInfo.userName: scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"  show-overflow-tooltip min-width="150">
          <template v-slot="scope">
            <span>{{ scope.row.userInfo? scope.row.userInfo.email: scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容"   show-overflow-tooltip min-width="240"/>
        <el-table-column prop="articleType" label="类型" min-width="150">
          <template v-slot="scope">
            <el-tag type="primary" v-if="scope.row.articleType === 'article'">文章</el-tag>
            <el-tag type="success" v-else-if="scope.row.articleType === 'page'">页面</el-tag>
            <el-tag type="warning" v-else-if="scope.row.articleType === 'journal'">动态</el-tag>
            <el-tag type="info" v-else>其他</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="所属标题"   show-overflow-tooltip min-width="240">
          <template v-slot="scope">
            <el-link :href="'/article/' + scope.row.articleSlug" target="_blank">{{scope.row.articleTitle}}</el-link>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" min-width="80">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status === 0">正常</el-tag>
            <el-tag type="danger" v-else>待审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="评论时间" min-width="180">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Check" @click="handleAudit(scope.row)" v-if="scope.row.status === 1">审核通过</el-button>
            <el-button size="small" type="primary" link :icon="ChatDotSquare" @click="showAllReplyList(scope.row)" v-if="scope.row.status === 0">查看所有回复({{scope.row.childNum}})</el-button>
            <el-button size="small" type="primary" link :icon="ChatLineSquare" @click="handleReply(scope.row)" v-if="scope.row.status === 0">回复</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:role:delete']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          v-model:current-page="searchForm.pageNo"
          v-model:page-size="searchForm.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total,sizes,prev, pager, next, jumper"
          background
          small
          @change="initList"
          :total="searchForm.total"
      />
    </div>


    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          status-icon
          :rules="addRule"
      >
        <el-form-item prop="content">
          <textarea placeholder='回复内容' class='comment-editor' ref="editor" v-model="addForm.content" required></textarea>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
              <div style="position: relative">
                <el-button  text @click="showEmojiPanel = !showEmojiPanel"><svg t="1726277716465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24517" width="20" height="20"><path d="M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z" fill="#555555" p-id="24518"></path></svg>表情</el-button>
                <emoji-picker class="emoji-picker" locale="zh_CN" ref="emojiPicker"  @emoji-click="onEmojiClick" v-if="showEmojiPanel"></emoji-picker>
              </div>

              <el-button type="primary" @click="submitAddForm">确 定</el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="replyListShow" :title="title" width="600px" draggable >
      <el-empty description="暂无回复" v-if="childCommentList.length <= 0 && !childLoading"/>
      <div style="height: 100px"  v-loading="childLoading" v-if="childLoading && childCommentParam.pageNo === 1"></div>
      <div class='comment-detail-box' v-for="item in childCommentList">
        <div class='comment-detail-avatar-box'>
          <img :src='item.userInfo ? item.userInfo.avatar : item.avatar' width='35px' height="35px" v-if="item.avatar || (item.userInfo &&  item.userInfo.avatar)">
          <span v-else>{{item.userInfo ? item.userInfo.userName[0] : item.userName[0]}}</span>
        </div>
        <div class='comment-detail-msg-box'>
          <div class='comment-detail-info'>
            <span class='comment-detail-name'>{{ item.userInfo ? item.userInfo.userName : item.userName }}</span>
            <span class='comment-detail-time'>{{ parseTime(item.createTime) }}</span>
          </div>
          <div class='comment-detail-content'>{{ item.content }}</div>
        </div>
      </div>
      <el-divider v-if="childCommentParam.pageNo >= 1 && childCommentParam.pageNo < Math.ceil(childCommentTotal / childCommentParam.pageSize) && !childLoading">
        <el-button  text @click="nextChildCommentPage">
          <el-icon><CaretBottom /></el-icon>
          加载更多
        </el-button>
      </el-divider>
      <el-divider v-if="childCommentParam.pageNo > 1 && childLoading">
        <el-icon class="is-loading"><Loading /></el-icon> 正在加载...
      </el-divider>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="replyListShow = false">关 闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {parseTime} from "@/core/utils/perfree.js";
import 'emoji-picker-element';
import {
  commentPageApi,updateStatusApi, commentDelApi, queryChildCommentPageApi, submitCommentApi
} from "../api/comment.js";
import {Check, Delete, ChatDotSquare, ChatLineSquare, Refresh, Search, CaretBottom} from "@element-plus/icons-vue";
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";

const editor = ref();
const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  userName: null,
  articleTitle: null,
  status: null,
  content: null,
  articleType: null
})
const addForm = ref({
  content: '',
  articleId: null,
  pid: null,
  topPid: null
});
const addRule = reactive({
  content: [{required: true, message: '请输入回复内容', trigger: 'blur'}],
});
const emojiPicker = ref();
const searchFormRef = ref();
const addFormRef = ref();
let showEmojiPanel = ref(false);
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let replyListShow = ref(false);
let childCommentParam = ref({
  pageNo: 1,
  pageSize: 10,
  id: null
});
let childCommentList = ref([]);
let childCommentTotal = ref(0);
let childLoading = ref(false);

function nextChildCommentPage() {
  childCommentParam.value.pageNo += 1;
  loadChildCommentPage();
}

/**
 * 查看所有回复
 * @param row row
 */
function showAllReplyList(row) {
  title.value = '回复列表@' + (row.userInfo? row.userInfo.userName: row.userName);
  childCommentParam.value.pageNo = 1;
  childCommentParam.value.id = row.id;
  childCommentList.value = [];
  childCommentTotal.value = 0;
  replyListShow.value = true;
  loadChildCommentPage();
}

function loadChildCommentPage() {
  childLoading.value = true;
  queryChildCommentPageApi(childCommentParam.value).then(res => {
    childCommentList.value.push(...res.data.list);
    childCommentTotal.value = res.data.total;
    childLoading.value = false;
  })
}

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      submitCommentApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('回复成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
    }
  })
}


/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.id + ']吗？如该条评论存在回复内容,也会一并删除!', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    commentDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {
  })
}

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  commentPageApi(searchForm.value).then((res) => {
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
    loading.value = false;
  })
}

/**
 * 重置搜索表单
 */
function resetSearchForm() {
  searchForm.value = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    userName: null,
    articleTitle: null,
    status: null,
    content: null,
    articleType: null
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    content: '',
    articleId: null,
    pid: null,
    topPid: null
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

function handleAudit(item) {
  let param = {
    id: item.id,
    status: 0
  }
  updateStatusApi(param).then(res => {
    if (res.code === 200) {
      ElMessage.success('审核通过成功');
      initList();
    } else {
      ElMessage.error(res.msg);
    }
  })
}

function handleReply(row) {
  resetAddForm();
  addForm.value.articleId = row.articleId;
  addForm.value.pid = row.id;
  addForm.value.topPid = row.topPid === -1 ? row.id : row.topPid;
  title.value = '回复@' + (row.userInfo? row.userInfo.userName: row.userName);
  open.value = true;
}

/**
 * 点击表情事件
 * @param emoji
 */
function onEmojiClick(emoji) {
  const start = editor.value.selectionStart;
  const end = editor.value.selectionEnd;
  addForm.value.content = addForm.value.content.slice(0, start) +  emoji.detail.emoji.unicode + addForm.value.content.slice(end);
  editor.value.focus();
  nextTick(() => {
    editor.value.focus();
    // 设置光标位置到 emoji 后面
    const newPosition = start + emoji.detail.emoji.unicode.length;
    editor.value.setSelectionRange(newPosition, newPosition);
  });
}

onMounted(() => {
  document.addEventListener('mousedown', handleCloseEmojiPicker);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleCloseEmojiPicker);
});

/**
 * 关闭表情面板
 * @param event
 */
function handleCloseEmojiPicker(event) {
  const path = event.composedPath();
  if (emojiPicker.value && !path.includes(emojiPicker.value)) {
    showEmojiPanel.value = false;
  }
}

initList();
</script>
<style scoped>
.comment-editor {
  border: 1px solid var(--el-border-color);
  width: 100%;
  height: 120px;
  color: var(--el-text-color-primary);
  padding: 6px 12px;
  -webkit-transition: all .25s ease-in-out 0s;
  transition: all .25s ease-in-out 0s;
  outline: none;
  resize: vertical;
  border-radius: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 13px;
  font-family: var(--el-font-family);
}
.dialog-footer{
  display: flex;
  justify-content: flex-end;
}
.emoji-picker{
  position: absolute;
  top: 33px;
  border-radius: 3px;
  right: 0;
  z-index: 99999;
}
.comment-detail-box{
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  width: 100%;
}
.comment-detail-avatar-box img{
  border-radius: 50%;
}
.comment-detail-avatar-box span{
  display: inline-block;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: var(--el-bg-color-page);
  text-align: center;
  font-weight: 600;
  color: var(--el-text-color-regular);
}
.comment-detail-msg-box{
  width: calc(100% - 45px);
  padding-left: 10px;
}
.comment-detail-content{
  margin-top: 5px;
  width: calc(100% - 24px);
  padding: 8px 12px;
  border-radius: 5px;
  margin-bottom: 5px;
  word-break: break-all;
  line-height: 24px;
  background: var(--el-bg-color-page);
  font-size: 14px;
  opacity: .85;
}
.comment-detail-name{
  font-weight: 500;
  font-size: 14px;
}
.comment-detail-info{
  position: relative;
}
.comment-detail-time{
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-left: 10px;
}
</style>
