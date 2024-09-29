<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="音乐名称">
          <el-input v-model="searchForm.name" placeholder="请输入音乐名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search" >查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button :icon="Plus" type="primary" plain @click="handleAdd">新增</el-button>
        <el-button :icon="UploadFilled" type="primary" plain @click="showAttachPanel">从附件导入</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="name" label="音乐名称" min-width="140" show-overflow-tooltip/>
        <el-table-column prop="url" label="音乐" min-width="300">
          <template v-slot="scope">
            <audio  class="attach-audio" controls preload="none">
              <source :src="scope.row.url" />
            </audio>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="140" show-overflow-tooltip/>
        <el-table-column prop="userInfo.userName" label="创建人" min-width="120" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间" min-width="180">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
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

    <el-dialog v-model="open" :title="title" :width="dialogWidth(600)" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="130px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="音乐" prop="url">
          <attach-select-input :attach-type="'audio'" :enable-input="true" :placeholder="'请选择或输入音乐地址'" v-model:model-value="addForm.url" @attach-select-change="attachSelectChange"></attach-select-input>
        </el-form-item>
        <el-form-item label="音乐名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入音乐名称"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addForm.description" placeholder="请输入描述" :autosize="{ minRows: 3, maxRows: 6 }"
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

    <el-dialog v-model="attachShow" :title="title" :width="dialogWidth(1000)" draggable destroy-on-close>
      <attach-select-panel @update:selected-attach="selectAttach" :max="99" :attach-type="'audio'"></attach-select-panel>
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAttach">确 定<span v-if="selectData.length > 0">(已选{{selectData.length}}个)</span></el-button>
              <el-button @click="attachShow = false; resetAttachForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import {Delete, Edit, Plus, Refresh, Search, UploadFilled} from "@element-plus/icons-vue";
import {dialogWidth, parseTime} from "@/core/utils/perfree.js";
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  attachLibraryItemsAddApi, attachLibraryItemsBatchAddApi,
  attachLibraryItemsDelApi,
  attachLibraryItemsGetApi,
  attachLibraryItemsPageApi,
  attachLibraryItemsUpdateApi
} from "@/modules/attachLibrary/api/attachLibraryItems.js";
import AttachSelectPanel from "@/core/components/attach/attach-select-panel.vue";

const props = defineProps(['attachLibraryId'])
const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name:  null ,
  attachLibraryId: props.attachLibraryId,
})
const addForm = ref({
  id: null,
  attachLibraryId: props.attachLibraryId,
  name: null,
  description: null,
  url: null
});
const addRule = reactive({
  name: [{required: true, message: '音乐库名称不能为空', trigger: 'blur'}],
  url: [{required: true, message: '音乐地址不能为空', trigger: 'blur'}],
});
const searchFormRef = ref();
const addFormRef = ref();
let open = ref(false);
let tableData = ref([]);
let loading = ref(false);
let title = ref('');
let attachShow = ref(false);
let selectData = ref([])

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data
}
/**
 * 关闭选择附件面板
 */
function resetAttachForm() {
  selectData.value = []
}

function showAttachPanel() {
  title.value = '选择音乐';
  resetAttachForm();
  attachShow.value = true;
}

function submitAttach() {
  let params = {
    attachList: []
  };
  selectData.value.forEach((r, index) => {
    let param = {
      name: r.name,
      attachLibraryId: props.attachLibraryId,
      url: r.url
    }
    params.attachList.push(param);
  });
  attachLibraryItemsBatchAddApi(params).then((res) => {
    if (res.code === 200) {
      ElMessage.success('导入成功');
      attachShow.value = false
      resetAttachForm();
      initList();
    } else {
      ElMessage.error(res.msg);
    }
  })
}

function attachSelectChange(value) {
  if (value.length > 0 && !addForm.value.name) {
    addForm.value.name = value[0].name
  }
}
function resetAddForm() {
  addForm.value = {
    id: null,
    name: null,
    description: null,
    attachLibraryId: props.attachLibraryId,
    url: null
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        attachLibraryItemsUpdateApi(addForm.value).then((res) => {
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
        attachLibraryItemsAddApi(addForm.value).then((res) => {
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

function handleDelete(row) {
  let keys = Object.keys(row);
  ElMessageBox.confirm('确定要删除[' + row.name + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    attachLibraryItemsDelApi(row.id).then((res) => {
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
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改音乐';
  open.value = true;
  attachLibraryItemsGetApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}
function initList() {
  loading.value = true;
  attachLibraryItemsPageApi(searchForm.value).then((res) => {
    tableData.value = res.data.list;
    searchForm.value.total = res.data.total;
    loading.value = false;
  })
}

function resetSearchForm() {
  searchForm.value = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    name:  null ,
    attachLibraryId: props.attachLibraryId,
  }
  searchFormRef.value.resetFields();
  initList();
}

function handleAdd() {
  resetAddForm();
  title.value = '添加音乐';
  open.value = true;
}

initList();
</script>
<style scoped>

.attach-items-list{
  column-count: 5;
  column-gap: 15px;
  break-inside: avoid;
}
.attach-item{
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
}
.attach-item-name{
  font-size: 15px;
  padding-left: 5px;
  padding-right: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 30px;
}

</style>
