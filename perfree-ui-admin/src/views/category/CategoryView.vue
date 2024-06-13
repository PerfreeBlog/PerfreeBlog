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
        <el-table-column label="序号" min-width="80" type="index" />
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

  </div>
</template>
<script setup>
import {Delete, Edit, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {categoryListTreeApi} from "@/api/category.js";
import {handleTree} from "@/utils/perfree.js";

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


/**
 * 初始化列表
 */
function initList() {
  loading.value = true;
  categoryListTreeApi(searchForm.value).then((res) => {
    tableData.value = handleTree(res.data, "id", "pid",'children', -1);
    treeData.value = [{id: '-1', name: '主类目', children: tableData.value}];
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
}

initList();
</script>