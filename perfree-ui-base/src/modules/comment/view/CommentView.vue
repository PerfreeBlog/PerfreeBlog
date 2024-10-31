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
            <el-link :href="'/article/' + scope.row.articleSlug" target="_blank" v-if="scope.row.articleType === 'article'">{{scope.row.articleTitle}}</el-link>
            <el-link :href="'/page/' + scope.row.articleSlug" target="_blank" v-if="scope.row.articleType === 'page'">{{scope.row.articleTitle}}</el-link>
            <el-link :href="'/admin/journal'" target="_self" v-if="scope.row.articleType === 'journal'">
              <span v-if="scope.row.articleTitle"> {{scope.row.articleTitle}}</span>
              <span v-else>无标题,所属标识为[{{scope.row.articleId}}]</span>
            </el-link>
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
            <el-button size="small" type="primary" link :icon="Check" @click="handleAudit(scope.row)" v-if="scope.row.status === 1" v-hasPermission="['admin:comment:audit']">审核通过</el-button>
            <el-button size="small" type="primary" link :icon="ChatDotSquare" @click="showAllReplyList(scope.row)" v-if="scope.row.status === 0">查看所有回复({{scope.row.childNum}})</el-button>
            <el-button size="small" type="primary" link :icon="ChatLineSquare" @click="handleReply(scope.row)" v-if="scope.row.status === 0"  v-hasPermission="['admin:comment:reply']">回复</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:comment:delete']">删除</el-button>
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


    <el-dialog v-model="open" :title="title" :width="dialogWidth(600)" draggable destroy-on-close>
      <comment-create :article-id="currReply.articleId" :pid="currReply.id" :top-pid="currReply.topPid === -1 ? currReply.id : currReply.topPid"
              @close="open = false;" @submit-success="open=false;initList();"></comment-create>
    </el-dialog>

    <el-dialog v-model="replyListShow" :title="title" :width="dialogWidth(600)" draggable >
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
import {dialogWidth, parseTime} from "@/core/utils/perfree.js";
import {commentDelApi, commentPageApi, queryChildCommentPageApi, updateStatusApi} from "../api/comment.js";
import {CaretBottom, ChatDotSquare, ChatLineSquare, Check, Delete, Refresh, Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import CommentCreate from "@/modules/comment/components/comment-create.vue";


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
const searchFormRef = ref();
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
let currReply = ref({})


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
  currReply.value = row;
  title.value = '回复@' + (row.userInfo? row.userInfo.userName: row.userName);
  open.value = true;
}

initList();
</script>
<style scoped>
.dialog-footer{
  display: flex;
  justify-content: flex-end;
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
