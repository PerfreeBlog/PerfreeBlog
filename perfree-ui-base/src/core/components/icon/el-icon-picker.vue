<template>
  <el-popover :visible="iconPanelVisible" width="500" placement="bottom-start" ref="iconSelect">
    <template #reference>
      <el-input
          v-model="value"
          class="w-50 m-2"
          placeholder="请选择图标"
          @input="inputChange"
          @click="iconPanelVisible = true"
      >
        <template #prefix>
          <font-awesome-icon :icon="value" v-if="value" />
        </template>
      </el-input>
    </template>
    <div class="el-icon-picker" ref="iconPicker">
      <el-input  v-model="searchValue" placeholder="搜索图标"  >
        <template #append>
          <el-button :icon="Search" @click="searchIcon"/>
        </template>
      </el-input>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="实心图标" name="fas">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === value }]"
                               :icon="icon" v-for="icon in filteredFasIconList" :key="icon" @click="selectIcon(icon)" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="常规图标" name="far">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === value }]"
                               :icon="icon" v-for="icon in filteredFarIconList" :key="icon" @click="selectIcon(icon)" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="品牌图标" name="fab">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === value }]"
                               :icon="icon" v-for="icon in filteredFabIconList" :key="icon" @click="selectIcon(icon)" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-popover>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

let fasIconList = ref([]);
Object.keys(library.definitions.fas).forEach(r => {
  fasIconList.value.push("fa-solid fa-" + r);
});

let farIconList = ref([]);
Object.keys(library.definitions.far).forEach(r => {
  farIconList.value.push("fa-regular fa-" + r);
});

let fabIconList = ref([]);
Object.keys(library.definitions.fab).forEach(r => {
  fabIconList.value.push("fa-brands fa-" + r);
});

const props = defineProps({
  modelValue: String
});
watch(() => props.modelValue, (newVal) => {
  value.value = newVal;
});

let value = ref(props.modelValue);
let activeTab = ref("fas");
const emits = defineEmits(['update:modelValue']);
const iconSelect = ref();
const iconPicker = ref();
let searchValue = ref(null);
let iconPanelVisible = ref(false);
// 筛选后的图标列表
let filteredFasIconList = ref([...fasIconList.value]);
let filteredFarIconList = ref([...farIconList.value]);
let filteredFabIconList = ref([...fabIconList.value]);

// 选择图标
function selectIcon(icon) {
  value.value = icon;
  emits('update:modelValue', icon);
  closeIconPanel();
}

// 输入框变化时筛选图标
function inputChange() {
  // 合并所有图标列表
  const allIcons = [...fasIconList.value, ...farIconList.value, ...fabIconList.value];

  // 检查输入的图标是否存在
  if (allIcons.includes(value.value)) {
    emits('update:modelValue', value.value);  // 图标存在，正常更新
  } else {
    // 如果图标不存在，清空输入值或给出提示
    value.value = '';  // 或者可以显示一条错误提示
  }
}

function searchIcon() {
  if (searchValue.value) {
    const query = searchValue.value.toLowerCase();

    filteredFasIconList.value = fasIconList.value.filter(icon => icon.includes(query));
    filteredFarIconList.value = farIconList.value.filter(icon => icon.includes(query));
    filteredFabIconList.value = fabIconList.value.filter(icon => icon.includes(query));

    if (filteredFasIconList.value.length > 0) {
      activeTab.value = 'fas'
    } else if (filteredFarIconList.value.length > 0) {
      activeTab.value = 'far'
    } else if (filteredFabIconList.value.length > 0) {
      activeTab.value = 'fab'
    } else {
      ElMessage.warning("未查找到图标");
      searchValue.value = null;
      searchIcon();
    }
  } else {
    // 如果没有输入内容，显示全部图标
    filteredFasIconList.value = [...fasIconList.value];
    filteredFarIconList.value = [...farIconList.value];
    filteredFabIconList.value = [...fabIconList.value];
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleCloseIconPicker);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleCloseIconPicker);
});

function handleCloseIconPicker(event) {
  const path = event.composedPath();
  if (iconSelect.value && !path.includes(iconSelect.value) && !path.includes(iconPicker.value)) {
    closeIconPanel();
  }
}

function closeIconPanel() {
  iconPanelVisible.value = false;
  searchValue.value = null;
  filteredFasIconList.value = [...fasIconList.value];
  filteredFarIconList.value = [...farIconList.value];
  filteredFabIconList.value = [...fabIconList.value];
}
</script>

<style scoped>
.el-icon-picker {
  overflow: hidden;
}
.icon-panel {
  height: 256px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: var(--el-text-color-regular);
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  margin: 5px;
}

.icon:hover {
  color: var(--el-color-primary);
}

.icon-active {
  color: var(--el-color-primary);
}
</style>
