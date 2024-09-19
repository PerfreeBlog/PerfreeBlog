<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="内容">
          <el-input v-model="searchForm.content" placeholder="请输入内容" clearable/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 200px" clearable>
            <el-option :key="0" :label="'所有人可见'" :value="0" />
            <el-option :key="2" :label="'仅自己可见'" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd">发表动态</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column label="标识" min-width="80" prop="id" />
        <el-table-column prop="content" label="内容" min-width="400" show-overflow-tooltip/>
        <el-table-column prop="greatCount" label="附件数量" min-width="80">
          <template v-slot="scope">
            <span>{{scope.row.attachList?.length}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="greatCount" label="点赞数量" min-width="80"/>
        <el-table-column prop="commentCount" label="评论数量" min-width="80"/>
        <el-table-column prop="isComment" label="允许评论" min-width="80" align="center">
          <template v-slot="scope">
            <el-switch v-model="scope.row.isComment"  :active-value="1" :inactive-value="0" inline-prompt :active-icon="Check"
                       :inactive-icon="Close" @click.native.prevent="changeIsComment(scope.row)" disabled/>
          </template>
        </el-table-column>
        <el-table-column prop="isTop" label="是否置顶" min-width="80" align="center">
          <template v-slot="scope">
            <el-switch v-model="scope.row.isTop"  :active-value="1" :inactive-value="0" inline-prompt :active-icon="Check"
                       :inactive-icon="Close" @click.native.prevent="changeIsTop(scope.row)" disabled/>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" min-width="100">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status === 0">所有人可见</el-tag>
            <el-tag type="danger" v-else>仅自己可见</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user.userName" label="创建人" min-width="100" />
        <el-table-column prop="createTime" label="创建时间" min-width="180">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>

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

    <el-dialog v-model="open" :title="title" width="650px" draggable destroy-on-close>
      <journal-create @close="open = false" @submit-success="open = false; initList()" :update-id="updateId"></journal-create>
    </el-dialog>
  </div>
</template>
<script setup>
import {Check, Close, Delete, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/core/utils/perfree.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {h, ref} from "vue";
import {
  articleDelApi,
  articleUpdateIsCommentApi,
  articleUpdateIsTopApi,
  journalPageApi
} from "@/modules/journal/api/journal.js";
import JournalCreate from "@/core/components/journal/JournalCreate.vue";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  content: null,
  status: null
})

const searchFormRef = ref();
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let updateId = ref(null);

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  journalPageApi(searchForm.value).then((res) => {
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
    content: null,
    status: null
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 新增
 */
function handleAdd() {
  updateId.value = null;
  title.value = '添加标签';
  open.value = true;
}


/**
 * 修改
 */
function handleUpdate(row) {
  updateId.value = row.id;
  title.value = '修改动态';
  open.value = true;
}


/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.id + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    articleDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {})
}

/**
 * 修改是否允许评论
 * @param row
 */
function changeIsComment(row) {
  let msg = row.isComment === 0 ? '允许评论': '不允许评论';
  ElMessageBox({
    title: '提示',
    message: h('p', null, [
      `确定要修改动态[${row.id}]为`,
      h('font', { style: 'color: var(--el-color-warning)' }, msg), '吗?'
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let param = {
      id: row.id,
      isComment: row.isComment === 0 ? 1 : 0
    }
    articleUpdateIsCommentApi(param).then(res => {
      if (res.code === 200) {
        initList();
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  }).catch(() => {});
}

/**
 * 修改是否置顶
 * @param row
 */
function changeIsTop(row) {
  let msg = row.isTop === 0 ? '置顶': '不置顶';
  ElMessageBox({
    title: '提示',
    message: h('p', null, [
      `确定要修改动态[${row.id}]为`,
      h('font', { style: 'color: var(--el-color-warning)' }, msg), '吗?'
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    let param = {
      id: row.id,
      isTop: row.isTop === 0 ? 1 : 0
    }
    articleUpdateIsTopApi(param).then(res => {
      if (res.code === 200) {
        initList();
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  }).catch(() => {});
}

initList()
</script>

<style scoped>
.tableColor{
  width: 20px;height: 20px;
}
/* 修改elementUI-switch组件 disabled样式 */
:deep().el-switch.is-disabled {
  opacity: 1;
}
:deep().el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
  cursor: pointer !important;
}
</style>
