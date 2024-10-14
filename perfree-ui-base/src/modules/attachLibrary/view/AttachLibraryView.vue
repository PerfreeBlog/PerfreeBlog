<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="附件库名称">
          <el-input v-model="searchForm.name" placeholder="请输入附件库名称" clearable/>
        </el-form-item>
        <el-form-item label="附件库类型">
          <el-select v-model="searchForm.type" placeholder="请选择附件库类型" clearable  style="width: 200px">
            <el-option key="img" :label="'图库'" value="img" />
            <el-option key="video" :label="'视频库'" value="video" />
            <el-option key="audio" :label="'音乐库'" value="audio" />
            <el-option key="other" :label="'其他'" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否仅自己可见">
          <el-select v-model="searchForm.visibility" placeholder="请选择是否仅自己可见" clearable  style="width: 200px">
            <el-option :key="0" :label="'否'" :value="0" />
            <el-option :key="1" :label="'是'" :value="1" />
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
        <el-button :icon="Plus" type="primary" plain @click="handleAdd" v-hasPermission="['admin:attachLibrary:create']">新增</el-button>
      </el-col>
      <div class="right-tool">
        <el-button :icon="Refresh" circle @click="initList"/>
      </div>
    </el-row>

    <div class="table-box">

      <el-table :data="tableData" style="width: 100%;height:100%;" row-key="id" v-loading="loading" >
        <el-table-column prop="name" label="附件库名称" min-width="180"/>
        <el-table-column prop="thumbnail" label="封面图" min-width="80">
          <template v-slot="scope">
            <el-image style="width: 100%; max-height: 100%" :src="scope.row.thumbnail" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[scope.row.thumbnail]" :initial-index="4" v-if="scope.row.thumbnail"
                      append-to-body fit="cover" preview-teleported></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="240"/>
        <el-table-column prop="type" label="附件库类型" min-width="120">
          <template v-slot="scope">
            <el-tag type="primary" v-if="scope.row.type === 'img'">图库</el-tag>
            <el-tag type="success" v-else-if="scope.row.type === 'video'">视频库</el-tag>
            <el-tag type="warning" v-else-if="scope.row.type === 'audio'">音乐库</el-tag>
            <el-tag type="info" v-else>其他</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="visibility" label="状态" min-width="120">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.visibility === 0">所有人可见</el-tag>
            <el-tag type="danger" v-else>仅自己可见</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userInfo.userName" label="创建人" min-width="140"/>
        <el-table-column prop="createTime" label="创建时间" min-width="180">
          <template v-slot="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template v-slot="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleUpdate(scope.row)" v-hasPermission="['admin:attachLibrary:update']">修改</el-button>
            <el-button size="small" type="primary" link :icon="FolderOpened" @click="handleAttachItems(scope.row)">附件管理</el-button>
            <el-button size="small" type="primary" link :icon="Delete" @click="handleDelete(scope.row)" v-hasPermission="['admin:attachLibrary:delete']">删除</el-button>
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

    <el-dialog v-model="open" :title="title" :width="dialogWidth(650)" draggable>
      <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="130px"
          status-icon
          :rules="addRule"
      >
        <el-form-item label="附件库名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入附件库名称"/>
        </el-form-item>
          <el-form-item label="附件库类型" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择附件库类型"  style="width: 100%">
              <el-option key="img" :label="'图库'" value="img" />
              <el-option key="video" :label="'视频库'" value="video" />
              <el-option key="audio" :label="'音乐库'" value="audio" />
              <el-option key="other" :label="'其他'" value="other" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否仅自己可见" prop="visibility">
            <el-select v-model="addForm.visibility" placeholder="请选择是否仅自己可见"  style="width: 100%">
              <el-option :key="0" :label="'否'" :value="0" />
              <el-option :key="1" :label="'是'" :value="1" />
            </el-select>
          </el-form-item>
        <el-form-item label="封面图" prop="thumbnail">
          <attach-select-input :attach-type="'img'" :enable-input="true" :placeholder="'请选择或输入封面图地址'" v-model:model-value="addForm.thumbnail"></attach-select-input>
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

    <el-dialog v-model="attachItemsOpen" :title="title" :width="dialogWidth(1200)" draggable destroy-on-close>
      <attach-library-items-img :attach-library-id="currManagerAttachLibrary.id" v-if="currManagerAttachLibrary.type === 'img'"></attach-library-items-img>
      <attach-library-items-video :attach-library-id="currManagerAttachLibrary.id" v-else-if="currManagerAttachLibrary.type === 'video'"></attach-library-items-video>
      <attach-library-items-audio :attach-library-id="currManagerAttachLibrary.id" v-else-if="currManagerAttachLibrary.type === 'audio'"></attach-library-items-audio>
      <attach-library-items-other :attach-library-id="currManagerAttachLibrary.id" v-else></attach-library-items-other>
    </el-dialog>
  </div>
</template>
<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {dialogWidth, parseTime} from "@/core/utils/perfree.js";
import {
  attachLibraryAddApi,
  attachLibraryDelApi,
  attachLibraryExportExcelApi,
  attachLibraryGetApi,
  attachLibraryPageApi,
  attachLibraryUpdateApi
} from "../api/attachLibrary.js";
import {Delete, Edit, FolderOpened, Plus, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import AttachSelectInput from "@/core/components/attach/attach-select-input.vue";
import AttachLibraryItemsImg from "@/modules/attachLibrary/view/AttachLibraryItemsImg.vue";
import AttachLibraryItemsVideo from "@/modules/attachLibrary/view/AttachLibraryItemsVideo.vue";
import AttachLibraryItemsAudio from "@/modules/attachLibrary/view/AttachLibraryItemsAudio.vue";
import AttachLibraryItemsOther from "@/modules/attachLibrary/view/AttachLibraryItemsOther.vue";

const searchForm = ref({
  pageNo: 1,
  pageSize: 10,
  total: 0,
  name:  null ,
  type:  null ,
  visibility:  null ,
})
const addForm = ref({
  id: null,
  name: null,
  description: null,
  type: null,
  visibility: 0,
  thumbnail: null,
});
const addRule = reactive({
  name: [{required: true, message: '附件库名称不能为空', trigger: 'blur'}],
  type: [{required: true, message: '附件库类型不能为空', trigger: 'blur'}],
  visibility: [{required: true, message: '是否仅自己可见不能为空', trigger: 'blur'}],
});

const searchFormRef = ref();
const addFormRef = ref();
let open = ref(false);
let attachItemsOpen = ref(false);
let title = ref('');
let tableData = ref([]);
let loading = ref(false);
let currManagerAttachLibrary = ref(null)

function handleAttachItems(row) {
  currManagerAttachLibrary.value = row;
  title.value = row.name;
  attachItemsOpen.value = true;
}


/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (addForm.value.id) {
        attachLibraryUpdateApi(addForm.value).then((res) => {
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
        attachLibraryAddApi(addForm.value).then((res) => {
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
 * 新增
 */
function handleAdd() {
  resetAddForm();
  title.value = '添加附件库';
  open.value = true;
}

/**
 * 修改
 */
function handleUpdate(row) {
  resetAddForm();
  title.value = '修改附件库';
  open.value = true;
  attachLibraryGetApi(row.id).then((res) => {
    addForm.value = res.data;
  })
}

/**
 * 删除
 * @param row
 */
function handleDelete(row) {
  let keys = Object.keys(row);
  ElMessageBox.confirm('确定要删除[' + row[keys[0]] + ']吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    attachLibraryDelApi(row.id).then((res) => {
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
  attachLibraryPageApi(searchForm.value).then((res) => {
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
    name:   null ,
    type:   null ,
    visibility:   null ,
  }
  searchFormRef.value.resetFields();
  initList();
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    id: null,
    name: null,
    description: null,
    type: null,
    visibility: 0,
    thumbnail: null,
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

/**
 * 导出excel
 */
function exportExcel() {
  loading.value = true;
  attachLibraryExportExcelApi(searchForm.value).then(res => {
    window.download.excel(res,  '附件库数据.xlsx');
    loading.value = false;
  }).catch(e => {
    ElMessage.error('导出失败');
    loading.value = false;
  })
}

initList();
</script>
<style scoped></style>
