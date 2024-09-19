<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="标签名称">
          <el-input v-model="searchForm.name" placeholder="请输入标签名称" clearable/>
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
        <el-table-column prop="name" label="标签名称" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="color" label="颜色" min-width="150">
          <template v-slot="scope">
            <div v-if="scope.row.color" class="tableColor" :style="{'background-color': scope.row.color}"></div>
          </template>
        </el-table-column>
        <el-table-column prop="slug" label="slug" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="thumbnail" label="封面图" min-width="80">
          <template v-slot="scope">
            <el-image style="height: 50px" :src="scope.row.thumbnail" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[scope.row.thumbnail]" :initial-index="4" v-if="scope.row.thumbnail"
                      append-to-body fit="cover" preview-teleported></el-image>
          </template>
        </el-table-column>
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

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入标签名称"/>
        </el-form-item>

        <el-form-item label="标签颜色" prop="color">
          <el-color-picker v-model="addForm.color" />
        </el-form-item>

        <el-form-item label="标签slug" prop="slug">
          <el-input v-model="addForm.slug" placeholder="请输入标签slug"/>
        </el-form-item>

        <el-form-item label="封面图" prop="thumbnail">
          <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请选择封面图'" v-model:model-value="addForm.thumbnail"></attach-select-input>
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
import {parseTime} from "@/core/utils/perfree.js";
import {tagAddApi, tagDelApi, tagGetApi, tagPageApi, tagUpdateApi} from "../api/tag.js";
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {reactive, ref} from "vue";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
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
  thumbnail: '',
  color: '',
  slug: ''
});
const addRule = reactive({
  name: [{required: true, message: '请输入标签名称', trigger: 'blur'}],
});
const addFormRef = ref();

/**
 * 加载列表
 */
function initList() {
  loading.value = true;
  tagPageApi(searchForm.value).then((res) => {
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
    name: ''
  }
  searchFormRef.value.resetFields();
  initList();
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
    thumbnail: '',
    color: '',
    slug: ''
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
        tagUpdateApi(addForm.value).then((res) => {
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
        tagAddApi(addForm.value).then((res) => {
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
  tagGetApi(row.id).then((res) => {
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
    tagDelApi(row.id).then((res) => {
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

<style scoped>
.tableColor{
  width: 20px;height: 20px;
}
</style>
