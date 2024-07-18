<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="网站名称">
          <el-input v-model="searchForm.name" placeholder="请输入网站名称" clearable/>
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
        <el-table-column prop="name" label="网站名称" min-width="150"/>
        <el-table-column prop="logo" label="网站logo" min-width="60">
          <template v-slot="scope">
            <el-image style="width: 100%; max-height: 100%" :src="scope.row.logo" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[scope.row.logo]" :initial-index="4" v-if="scope.row.logo"
                      append-to-body fit="cover" preview-teleported></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="网站描述" min-width="150"/>
        <el-table-column prop="address" label="网站地址" min-width="150">
          <template v-slot="scope">
            <a :href="scope.row.address" target="_blank">{{scope.row.address}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
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

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入网站名称"/>
        </el-form-item>

        <el-form-item label="网站地址" prop="address">
          <el-input v-model="addForm.address" placeholder="请输入网站地址"/>
        </el-form-item>

        <el-form-item label="网站logo" prop="logo">
          <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请输入网站logo地址'" v-model:model-value="addForm.logo"></attach-select-input>
        </el-form-item>

        <el-form-item label="网站描述" prop="desc">
          <el-input v-model="addForm.desc" placeholder="请输入网站描述" :autosize="{ minRows: 3, maxRows: 6 }"
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
import {Delete, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {parseTime} from "@/utils/perfree.js";
import AttachSelectInput from "@/components/attach-select-input.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {getLinkApi, linkAddApi, linkDelApi, linkPageApi, linkUpdateApi} from "@/api/link.js";

const searchForm = ref({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  name: ''
})

const searchFormRef = ref();
let open = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);

const addForm = ref({
  id: '',
  name: '',
  logo: '',
  desc: '',
  address: ''
});
const addRule = reactive({
  name: [{required: true, message: '请输入网站名称', trigger: 'blur'}],
  address: [{required: true, message: '请输入网站地址', trigger: 'blur'}],
});
const addFormRef = ref();

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  linkPageApi(searchForm.value).then((res) => {
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
    name: ''
  }
  searchFormRef.value.resetFields();
}

/**
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加标签';
  open.value = true;
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: '',
    name: '',
    logo: '',
    desc: '',
    address: ''
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
        linkUpdateApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('修改成功');
            open.value = false;
            resetAddForm();
            initList();
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        linkAddApi(addForm.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success('添加成功');
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
  title.value = '修改标签';
  resetAddForm();
  getLinkApi(row.id).then((res) => {
    addForm.value = res.data;
    open.value = true;
  })
}


/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  ElMessageBox.confirm('确定要删除[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    linkDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {})
}

initList()
</script>