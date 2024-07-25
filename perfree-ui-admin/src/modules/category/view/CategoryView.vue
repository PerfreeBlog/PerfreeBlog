<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" ref="searchFormRef">
        <el-form-item label="分类名称">
          <el-input v-model="searchForm.name" placeholder="请输入分类名称" clearable/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" >新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>
    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="name" label="分类名称" width="240" />
        <el-table-column prop="desc" label="描述"  width="150"/>
        <el-table-column prop="count" label="文章数量" min-width="150"/>
        <el-table-column prop="slug" label="slug" min-width="150"/>
        <el-table-column prop="thumbnail" label="封面图" min-width="80">
          <template v-slot="scope">
            <el-image style="width: 100%; max-height: 100%" :src="scope.row.thumbnail" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[scope.row.thumbnail]" :initial-index="4" v-if="scope.row.thumbnail"
                      append-to-body fit="cover" preview-teleported></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="metaKeywords" label="SEO关键字" min-width="150"/>
        <el-table-column prop="metaDescription" label="SEO描述" min-width="150"/>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.status === 0">正常</el-tag>
            <el-tag class="ml-2" type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button size="small" type="primary" link :icon="Plus" @click="handleAdd(scope.row)">新增</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog v-model="open" :title="title" width="600px" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="100px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="父级分类" prop="pid">
          <el-tree-select
              v-model="addForm.pid"
              :data="treeData"
              :props="treeSelectProps"
              check-strictly
              :render-after-expand="false"
              style="width: 100%"
              clearable
          />
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入分类名称"/>
        </el-form-item>

        <el-form-item label="分类描述" prop="desc">
          <el-input v-model="addForm.desc" placeholder="请输入分类描述" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
        </el-form-item>

        <el-form-item label="分类slug" prop="slug">
          <el-input v-model="addForm.slug" placeholder="请输入分类slug"/>
        </el-form-item>

        <el-form-item label="封面图" prop="thumbnail">
          <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请选择封面图'" v-model:model-value="addForm.thumbnail"></attach-select-input>
        </el-form-item>

        <el-form-item label="SEO关键字" prop="metaKeywords">
          <el-input v-model="addForm.metaKeywords" placeholder="请输入SEO关键字" :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"/>
        </el-form-item>

        <el-form-item label="SEO描述内容" prop="metaDescription">
          <el-input v-model="addForm.metaDescription" placeholder="请输入SEO描述内容" :autosize="{ minRows: 3, maxRows: 6 }"
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
import {
  categoryAddApi,
  categoryDelApi,
  categoryGetApi,
  categoryListTreeApi,
  categoryUpdateApi
} from "../api/category.js";
import {handleTree} from "@/core/utils/perfree.js";
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {reactive, ref} from "vue";

const searchFormRef = ref();
const searchForm = ref({
  name: ''
});

let loading = ref(false);
let tableData = ref([]);
let treeData = ref([]);
let open = ref(false);
let title = ref("");
const treeSelectProps = reactive({
  children: 'children',
  label: 'name',
  value: 'id',
})

const addForm = ref({
  pid: -1,
  id: '',
  name: '',
  desc: '',
  metaKeywords: '',
  thumbnail: '',
  slug: '',
  metaDescription: ''
});
const addRule = reactive({
  pid: [{required: true, message: '请选择父级分类', trigger: 'blur'}],
  name: [{required: true, message: '请输入分类名称', trigger: 'blur'}],
});
const addFormRef = ref();

/**
 * 初始化列表
 */
function initList() {
  loading.value = true;
  categoryListTreeApi(searchForm.value).then((res) => {
    tableData.value = handleTree(res.data, "id", "pid",'children', -1);
    treeData.value = [{id: -1, name: '主类目', children: tableData.value}];
    loading.value = false;
  });
}

/**
 * 重置搜索表单
 */
function resetSearchForm() {
  searchForm.value = {
    name: ''
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 新增
 */
function handleAdd(row) {
  resetAddForm();
  if (row && row.id) {
    addForm.value.pid = row.id;
  }
  title.value = '添加分类';
  open.value = true;
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    pid: -1,
    id: '',
    name: '',
    desc: '',
    metaKeywords: '',
    thumbnail: '',
    slug: '',
    metaDescription: ''
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
        categoryUpdateApi(addForm.value).then((res) => {
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
        categoryAddApi(addForm.value).then((res) => {
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
  title.value = '修改分类';
  resetAddForm();
  categoryGetApi(row.id).then((res) => {
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
    categoryDelApi(row.id).then((res) => {
      if (res.code === 200 && res.data) {
        ElMessage.success('删除成功');
        initList();
      } else {
        ElMessage.error(res.msg);
      }
    });
  }).catch(() => {})
}

initList();
</script>