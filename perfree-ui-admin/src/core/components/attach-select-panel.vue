<template>
  <div class="page">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchFormRef">
        <el-form-item label="附件名称">
          <el-input v-model="searchForm.name" placeholder="请输入附件名称" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList" :icon="Search">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-row :gutter="15">
        <el-col :span="6" v-for="item in tableData" class="attach-col"  @click="selectAttach(item)">
          <div :class="{'attach-block': true, 'selected': item.selected}">
            <div class="attach-preview">
              <el-image  :key="item.url" :src="item.url" lazy class="attach-img" loading="lazy"  v-if="item.type&&item.type === 'img'">
                <template #placeholder>
                  <div class="image-slot">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                  </div>
                </template>
              </el-image>

              <video v-else-if="item.type&&item.type === 'video'" preload="none" controls style="width: 100%; max-height: 100%">
                <source :src="item.url"/>
              </video>
              <div v-else class="attach-other">
                {{item.path.split('.').pop()}}
              </div>
            </div>
            <div class="attach-name">
              <el-text line-clamp="1" style="width: 100%;">
                {{item.name}}
              </el-text>
            </div>

            <div :class="{'operate-mask': true, 'selected': item.selected}">
            </div>
            <div class="operate-btn-box">
              <el-icon class="operate-btn" @click.stop="handleShow(item)"><InfoFilled /></el-icon>
              <el-icon class="operate-btn select-btn"><SuccessFilled /></el-icon>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-pagination
          v-model:current-page="searchForm.pageNo"
          v-model:page-size="searchForm.pageSize"
          :page-sizes="[8,16,24]"
          layout="total,sizes,prev, pager, next, jumper"
          background
          small
          @change="initList"
          :total="searchForm.total"
      />
    </div>


    <el-dialog v-model="showOpen" :title="title" width="800px" draggable>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
          <div  style="padding-right: 15px">
            <el-image style="width: 100%; max-height: 100%" :src="showForm.url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :preview-src-list="[showForm.url]" :initial-index="4" fit="cover" v-if="showForm.type&&showForm.type === 'img'"/>
            <video v-else-if="showForm.type&&showForm.type === 'video'" preload="none" controls style="width: 100%; max-height: 100%">
              <source :src="showForm.url"/>
            </video>
            <audio controls v-else-if="showForm.type&&showForm.type === 'audio'" preload="none">
              <source :src="showForm.url" />
            </audio>
            <i v-else>无法预览，点击
              <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" target="_blank"
                       :href="'/api/attach/file/' + showForm.configId + '/get/' + showForm.path">下载
              </el-link>
            </i>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
          <div class="showForm">
            <el-form
                ref="showFormRef"
                :model="showForm"
                label-width="auto"
                :rules="showRule"
                :label-position="'top'"
            >
              <el-form-item label="附件名称" prop="name">
                <el-input v-model="showForm.name" />
              </el-form-item>
              <el-form-item label="附件类型">
                <el-input v-model="showForm.type" disabled />
              </el-form-item>
              <el-form-item label="分组">
                <el-select v-model="showForm.attachGroup" placeholder="请选择分组" filterable style="width: 100%"
                           allow-create>
                  <el-option v-for="item in attachGroups" :key="item.attachGroup" :label="item.attachGroup" :value="item.attachGroup" />
                </el-select>
              </el-form-item>
              <el-form-item label="存储路径">
                <el-input v-model="showForm.path" disabled />
              </el-form-item>
              <el-form-item label="访问地址">
                <el-input v-model="showForm.url" disabled />
              </el-form-item>
              <el-form-item label="附件描述">
                <el-input v-model="showForm.desc"  :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" resize="none" placeholder="请输入附件描述"/>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitUpdateForm">修 改</el-button>
              <el-button @click="showOpen = false; resetShowForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {Refresh, Search} from "@element-plus/icons-vue";
import {attachPageApi, getAttachApi, attachUpdateApi, getAllAttachGroupApi} from "@/core/api/attach.js";
import {reactive, ref} from "vue";

const searchFormRef = ref();
const searchForm = ref({
  pageNo: 1,
  pageSize: 8,
  total: 0,
  name: '',
  type: ''
})
let tableData = ref([]);
let loading = ref(false);
let selectedAttach = ref(new Map())
const emits = defineEmits(['update:selectedAttach'])
const props = defineProps(['attachType', 'max'])
let showOpen = ref(false);
let title = ref('');
let attachGroups = ref([]);
const showFormRef = ref();
const showForm = ref({
  name: '',
  type: '',
  attachGroup: 'default',
  path: '',
  url: '',
  desc: ''
})

const showRule = reactive({
  name: [{ required: true, message: '请输入附件名称', trigger: 'blur' }],
});

/**
 * 重置详情表单
 */
 function resetShowForm() {
  showForm.value = {
    name: '',
    type: '',
    attachGroup: 'default',
    path: '',
    url: '',
    desc: ''
  }
  if (showFormRef.value) {
    showFormRef.value.resetFields();
  }
}

/**
 * 初始化附件列表
 */
function initList() {
  if(props.attachType) {
    searchForm.value.type = props.attachType;
  }
  loading.value = true;
  attachPageApi(searchForm.value).then((res) => {
    res.data.list.forEach(r => {
      const selected = selectedAttach.value.has(r.id);
      r.selected = selected;
    })
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
    attachConfigId: undefined,
    attachGroup: undefined,
    storage: undefined,
    name: ''
  }
  searchFormRef.value.resetFields();
}

function selectAttach(item){
  if(!item.selected && selectedAttach.value.size >= props.max) {
    ElMessage.error(`最多选择${props.max}个`);
    return;
  }
  item.selected = !item.selected;
  if(item.selected) {
    selectedAttach.value.set(item.id, item);
  } else{
    selectedAttach.value.delete(item.id);
  }
  emits('update:selectedAttach', Array.from(selectedAttach.value.values()));
}

function initAttachGroups() {
  getAllAttachGroupApi().then(res => {
    attachGroups.value = res.data;
  })
}

/**
 * 查看附件
 * @param row
 */
 function handleShow(row) {
  resetShowForm();
  initAttachGroups();
  getAttachApi(row.id).then(res => {
    showForm.value = res.data;
    title.value = '详情';
    showOpen.value = true;
  })
}

function submitUpdateForm () {
  showFormRef.value.validate(valid => {
    if (valid) {
      attachUpdateApi(showForm.value).then((res) => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          showOpen.value = false;
          resetShowForm();
          initList();
        } else {
          ElMessage.error(res.msg);
        }
      })
    }
  })
}
initList();
</script>

<style scoped>
.table-box{
  margin-top: 20px;
}
.attach-block{
  position: relative;
  height: 150px;
  width: 100%;
  cursor: pointer;
  background-color: var(--el-color-info-light-9);
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 5px;
  border: 2px solid var(--el-bg-color);
}
.attach-block.selected{
  border: 2px solid var(--el-color-primary);
}
.operate-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to bottom, var(--el-overlay-color-light), rgb(255 255 255 / 0%));
  border: none;
}
.attach-preview{
  width: 100%;
  height: calc(100% - 30px);
}
.attach-img{
  width: 100%;
  height: 100%;
}
.image-slot{
  display: flex;
  justify-content: center;
  align-items: center;
}
.attach-other{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.attach-name{
  height: 30px;
  overflow: hidden;
  text-align: center;
  line-height: 30px;
}
.operate-btn-box{
  position: absolute;
  right: 12px;
  top: 3px;
}
.operate-btn{
  font-weight: bold;
  font-size: 22px;
  color: white;
  margin-left: 5px;
}
.selected .select-btn{
  color: var(--el-color-primary);
}
</style>