<template>
  <div>
    <el-form
        ref="addFormRef"
        :model="addForm"
        status-icon
        v-loading="loading"
    >
      <el-form-item >
        <div class="content-box">
          <textarea placeholder='写点什么?' class='comment-editor' ref="editor" v-model="addForm.content" required></textarea>
          <div class="attach-list-box">
            <div v-for="item in addForm.attachList" class="attach-box">
              <el-image class="attach-img" :src="item.url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                        :preview-src-list="[item.url]" :initial-index="4" v-if="item.type && item.type === 'img'"
                        append-to-body preview-teleported></el-image>
              <video class="attach-video"  v-else-if="item.type&& item.type === 'video'" controls preload="none">
                <source :src="item.url"/>
              </video>
              <audio  class="attach-audio" controls v-else-if="item.type&& item.type === 'audio'" preload="none">
                <source :src="item.url" />
              </audio>
              <div v-else class="attach-other">
                <el-icon><Link /></el-icon>
              </div>
              <el-tooltip class="box-item" effect="dark" :content="item.name" placement="bottom-start">
                <el-text truncated>{{item.name}}</el-text>
              </el-tooltip>
              <span class="attach-close-btn" @click="removeAttach(item)"><el-icon><CircleCloseFilled /></el-icon></span>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="bottom-box">
      <el-button text @click="showAttachPanel"><el-icon><FolderOpened /></el-icon> 附件</el-button>
      <div style="position: relative">
        <el-button  text @click="showEmojiPanel = !showEmojiPanel"><svg t="1726277716465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24517" width="18" height="18"><path d="M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z" fill="#555555" p-id="24518"></path></svg>表情</el-button>
        <emoji-picker class="emoji-picker" locale="zh_CN" ref="emojiPicker"  @emoji-click="onEmojiClick" v-if="showEmojiPanel"></emoji-picker>
      </div>
      <el-switch v-model="addForm.status" :active-value="0" :inactive-value="2" inline-prompt style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-warning); margin-right: 10px" active-text="所有人可见" inactive-text="仅自己可见"/>
      <el-button type="primary" @click="submitAddForm">发 布</el-button>
      <el-button @click="cancelHandle">取 消</el-button>
    </div>
    <el-dialog v-model="attachShow" :title="title" :width="dialogWidth(900)" draggable destroy-on-close>
      <attach-select-panel @update:selected-attach="selectAttach" :max="9" :attach-type="''"></attach-select-panel>
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
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import 'emoji-picker-element';
import AttachSelectPanel from "@/core/components/attach/attach-select-panel.vue";
import {ElMessage} from "element-plus";
import {FolderOpened} from "@element-plus/icons-vue";
import {createJournalApi, getJournalApi, updateJournalApi} from "@/core/api/journal.js";
import {dialogWidth} from "@/core/utils/perfree.js";

const emits = defineEmits(['submitSuccess', 'close'])
const props = defineProps(['updateId'])
let showEmojiPanel = ref(false);
const addForm = ref({
  id: '',
  content: '',
  contentModel: 'journal',
  parseContent: '',
  status: 0,
  attachList: [],
});
const addFormRef = ref();
const editor = ref();
const emojiPicker = ref();
let attachShow = ref(false);
let title = ref(null);
let selectData = ref([])
let loading = ref(false);

function cancelHandle() {
  resetAddForm();
  emits('close')
}
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      if (!addForm.value.content && addForm.value.attachList.length <= 0) {
        ElMessage.error('内容和附件不能全部为空');
        return
      }
      addForm.value.parseContent = addForm.value.content;
      loading.value = true;
      if (addForm.value.id) {
        updateJournalApi(addForm.value).then(res => {
          loading.value = false;
          if (res.code === 200) {
            ElMessage.success('修改成功');
            resetAddForm();
            emits('submitSuccess')
          } else {
            ElMessage.error(res.msg);
          }
        })
      } else {
        createJournalApi(addForm.value).then(res => {
          loading.value = false;
          if (res.code === 200) {
            ElMessage.success('发布成功');
            resetAddForm();
            emits('submitSuccess')
          } else {
            ElMessage.error(res.msg);
          }
        })
      }
    }
  })
}

function resetAddForm() {
  addForm.value = {
    id: '',
    content: '',
    contentModel: 'journal',
    parseContent: '',
    status: 0,
    attachList: [],
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

function removeAttach(attach) {
  addForm.value.attachList = addForm.value.attachList.filter(item => item.attachId !== attach.attachId);
}

/**
 * 关闭选择附件面板
 */
function resetAttachForm() {
  selectData.value = []
}

/**
 * 确定选择
 */
function submitAttach() {
  let len = addForm.value.attachList.length + selectData.value.length;
  if (len > 9) {
    ElMessage.error('最多只能添加9个附件!');
    return;
  }
  selectData.value.forEach((r, index) => {
    addForm.value.attachList.push({url: r.url, attachId: r.id, type: r.type, name: r.name, mineType: r.mineType})
  });
  attachShow.value = false
  resetAttachForm();
}

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data
}

function showAttachPanel() {
  title.value = '选择图片';
  resetAttachForm();
  attachShow.value = true;
}

/**
 * 点击表情事件
 * @param emoji
 */
function onEmojiClick(emoji) {
  const start = editor.value.selectionStart;
  const end = editor.value.selectionEnd;
  addForm.value.content = addForm.value.content.slice(0, start) +  emoji.detail.emoji.unicode + addForm.value.content.slice(end);
  editor.value.focus();
  nextTick(() => {
    editor.value.focus();
    // 设置光标位置到 emoji 后面
    const newPosition = start + emoji.detail.emoji.unicode.length;
    editor.value.setSelectionRange(newPosition, newPosition);
  });
}

onMounted(() => {
  document.addEventListener('mousedown', handleCloseEmojiPicker);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleCloseEmojiPicker);
});


/**
 * 关闭表情面板
 * @param event
 */
function handleCloseEmojiPicker(event) {
  const path = event.composedPath();
  if (emojiPicker.value && !path.includes(emojiPicker.value)) {
    showEmojiPanel.value = false;
  }
}

function init() {
  if (props.updateId) {
    loading.value = true;
    getJournalApi(props.updateId).then(res => {
      loading.value = false;
      addForm.value = res.data;
    })
  }
}

init();
</script>

<style scoped>
.bottom-box{
  display: flex;
  justify-content: flex-end;
}
.comment-editor {
  border: none;
  width: 100%;
  height: 120px;
  color: var(--el-text-color-primary);
  padding: 6px 12px;
  -webkit-transition: all .25s ease-in-out 0s;
  transition: all .25s ease-in-out 0s;
  outline: none;
  resize: none;
  border-radius: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 13px;
  font-family: var(--el-font-family);
}
.emoji-picker{
  position: absolute;
  top: 33px;
  border-radius: 3px;
  right: 0;
  z-index: 99999;
}
.attach-list-box{
  display: flex;
  flex-wrap: wrap;
}
.attach-box{
  width: 130px;
  height: 140px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  margin: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.content-box{
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}
.attach-close-btn{
  display: inline-block;
  position: absolute;
  top: 0;
  right: 4px;
  z-index: 9;
  font-size: 18px;
  color: var(--el-text-color-regular);
  cursor: pointer;
}
/** 去掉默认的背景颜色 */
audio::-webkit-media-controls-enclosure{
  background-color:unset;
}
audio{
  background: var(--el-bg-color-page);
}
.attach-img, .attach-audio,.attach-video{
  width: 100%;
  height: 110px;
}
.attach-other{
  width: 100%;
  height: 110px;
  line-height: 110px;
  text-align: center;
  font-size: 28px;
}
@media screen and (max-width:700px) {
  .emoji-picker{
    position: absolute;
    top: 33px;
    border-radius: 3px;
    right: -200px;
    z-index: 99999;
  }
}
</style>
