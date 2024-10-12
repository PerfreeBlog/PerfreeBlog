<template>
  <div style="width: 100%">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"  v-for="(item, index) in carouselGroup">
       <div class="carousel-item" >
         <el-input v-model="item.imgUrl" :placeholder="'选择图片或输入图片地址'" style="width: 100%;margin-bottom: 10px" @change="emitValue">
           <template #append>
             <el-button :icon="FolderOpened"  type="info" @click="openSelectImage(item)"/>
           </template>
         </el-input>
         <el-input v-model="item.link" :placeholder="'跳转地址'" style="width: 100%;margin-bottom: 10px" @change="emitValue">
         </el-input>
         <el-input v-model="item.title" :placeholder="'标题'" style="width: 100%;margin-bottom: 10px" @change="emitValue">
         </el-input>
         <el-input v-model="item.desc" :rows="2" @change="emitValue"
                   type="textarea" :placeholder="'描述'" style="width: 100%;margin-bottom: 10px">
         </el-input>
         <div  style="width: 100%;text-align:center;margin-bottom: 10px">
           <el-button type="danger" @click="delCurr(index)" :icon="Delete" plain></el-button>
           <el-button type="primary" @click="addCarousel" v-if="index === (carouselGroup.length -1)"  :icon="Plus" plain></el-button>
         </div>
       </div>
      </el-col>
    </el-row>

    <el-dialog v-model="open" :title="title" :width="dialogWidth(900)" draggable   destroy-on-close>
      <attach-select-panel @update:selected-attach="selectAttach" :max="1" :attach-type="'img'"></attach-select-panel>
      <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定<span v-if="selectData.length > 0">(已选{{selectData.length}}个)</span></el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>

import {Delete, FolderOpened, Plus, RefreshRight, Search} from "@element-plus/icons-vue";
import AttachSelectPanel from "@/core/components/attach/attach-select-panel.vue";
import {ref, watch} from "vue";
import {dialogWidth} from "@/core/utils/perfree.js";

const placeholder = ref('请选择图片')
let open = ref(false)
let title = ref('')
let selectData = ref([])
const props = defineProps([ 'modelValue'])
const emits = defineEmits(['update:modelValue'])
let carouselGroup = ref([
  {
    imgUrl: '',
    link: '',
    title: '',
    desc: ''
  },
]);

let currItem = null;
watch(() => props.modelValue, (newValue, oldValue) => {
  if (!newValue) {
    carouselGroup.value =[
      {
        imgUrl: '',
        link: '',
        title: '',
        desc: ''
      },
    ]
    return
  }
  let handleNewValue = JSON.parse(newValue);
  if (handleNewValue.length <= 0) {
    carouselGroup.value =[
      {
        imgUrl: '',
        link: '',
        title: '',
        desc: ''
      },
    ]
  } else {
    carouselGroup.value =handleNewValue;
  }

});

function addCarousel() {
  carouselGroup.value.push({
    imgUrl: '',
    link: '',
    title: '',
    desc: ''
  });
}

function delCurr(index) {
  if (carouselGroup.value.length === 1) {
    carouselGroup.value[0] = {
      imgUrl: '',
      link: '',
      title: '',
      desc: ''
    }
  } else {
    carouselGroup.value.splice(index, 1);
    emitValue();
  }

}

function resetCurr(index) {
  carouselGroup.value[index] = {
    imgUrl: '',
    link: '',
    title: '',
    desc: ''
  }
  emitValue();
}

function emitValue() {
/*  let emitValue = [];
  carouselGroup.value.forEach(r => {
    if (r.imgUrl) {
      emitValue.push(r)
    }
  })*/
  emits('update:modelValue', JSON.stringify(carouselGroup.value))
}
/**
 * 打开选择附件面板
 */
function openSelectImage(item) {
  currItem = item;
  open.value = true
  title.value = '请选择附件'
}

/**
 * 确定选择
 */
function submitAddForm() {
  let result = ''
  selectData.value.forEach((r, index) => {
    result += r.url;
  });
  currItem.imgUrl = result
  open.value = false
  selectData.value = []
  emitValue();
}

/**
 * 关闭选择附件面板
 */
function resetAddForm() {
  open.value = false
  selectData.value = []
}

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data

}
</script>

<style scoped>
:deep().el-dialog.is-draggable .el-dialog__header{
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  float: none;
  position: initial;
  right: 0;
  top: 0;
  z-index: 1;
}
.carousel-item{
  border: solid 1px #dddddd;
  border-radius: 3px;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
}
</style>
