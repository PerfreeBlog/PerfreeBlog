<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="站点名称">
          <el-input v-model="searchForm.name" placeholder="请输入站点名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column label="序号" min-width="80" type="index" />
        <el-table-column prop="siteName" label="站点名称" min-width="150"/>
        <el-table-column prop="siteSlug" label="访问标识" min-width="240"/>
        <el-table-column prop="siteDesc" label="站点描述" min-width="150"/>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.status === 0">开启</el-tag>
            <el-tag class="ml-2" type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
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

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="站点名称" prop="siteName">
          <el-input v-model="addForm.siteName" placeholder="请输入站点名称"/>
        </el-form-item>

        <el-form-item label="站点标识" prop="siteSlug">
          <el-input v-model="addForm.siteSlug" placeholder="请输入站点访问标识"/>
        </el-form-item>

        <el-form-item label="站点描述" prop="siteDesc">
          <el-input v-model="addForm.siteDesc" placeholder="请输入站点描述" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定</el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {Delete, Edit, Filter, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/utils/perfree.js";
import {siteAddApi, siteDelApi, siteGetApi, sitePageApi, siteUpdateApi} from "@/api/site.js";
import {ElMessage, ElMessageBox} from "element-plus";

let loading = ref(false);
let tableData = ref([]);
let open = ref(false);
let title = ref('');
const searchFormRef = ref();
const addFormRef = ref();
const searchForm = ref({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  name: ''
})

const addForm = ref({
  id: '',
  siteName: '',
  siteSlug: '',
  siteDesc: ''
});
const addRule = reactive({
  siteName: [{required: true, message: '请输入站点名称', trigger: 'blur'}],
  siteSlug: [{required: true, message: '请输入站点访问标识', trigger: 'blur'}],
});

/**
 * 重置搜索表单
 */
function resetSearchForm() {
  searchForm.value = {
    name: ''
  }
  searchFormRef.value.resetFields();
}

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  sitePageApi(searchForm.value).then((res) => {
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
    loading.value = false;
  })
}

/**
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加站点';
  open.value = true;
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    siteName: '',
    siteSlug: '',
    siteDesc: ''
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        siteUpdateApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        siteAddApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('操作成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    }
  })
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改站点';
  open.value = true;
  siteGetApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.siteName + ']吗？删除后将造成该站点下所有数据不可访问!', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    siteDelApi(row.id).then((res) => {
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

initList();
</script>