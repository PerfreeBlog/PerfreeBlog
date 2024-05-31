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
              <el-image  :key="item.url" :src="item.url" lazy class="attach-img" loading="lazy"  v-if="item.type&&item.type.indexOf('image/') === 0">
                <template #placeholder>
                  <div class="image-slot">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                  </div>
                </template>
              </el-image>
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
              <el-icon class="operate-btn"><InfoFilled /></el-icon>
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
  </div>
</template>

<script setup>
import {Refresh, Search} from "@element-plus/icons-vue";
import {attachPageApi} from "@/api/attach.js";

const searchFormRef = ref();
const searchForm = ref({
  pageNo: 1,
  pageSize: 8,
  total: 0,
  name: ''
})
let tableData = ref([]);
let loading = ref(false);

/**
 * 初始化附件列表
 */
function initList() {
  loading.value = true;
  attachPageApi(searchForm.value).then((res) => {
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
  item.selected = !item.selected;
  console.log(item)
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