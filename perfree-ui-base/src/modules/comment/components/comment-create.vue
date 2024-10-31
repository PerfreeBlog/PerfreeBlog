<template>
  <div>
    <el-form
        ref="addFormRef"
        :model="addForm"
        status-icon
        :rules="addRule"
    >
      <el-form-item prop="content">
        <textarea placeholder='回复内容' class='comment-editor' ref="editor" v-model="addForm.content" required></textarea>
      </el-form-item>
    </el-form>

    <div class="dialog-footer">
      <div style="position: relative">
        <el-button  text @click="showEmojiPanel = !showEmojiPanel"><svg t="1726277716465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24517" width="20" height="20"><path d="M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z" fill="#555555" p-id="24518"></path></svg>表情</el-button>
        <div ref="pickerRef" class="emoji-picker" v-show="showEmojiPanel"></div>
      </div>

      <el-button type="primary" @click="submitAddForm">确 定</el-button>
      <el-button @click="closeCommentCreate()">取 消</el-button>
    </div>
  </div>
</template>
<script setup>

import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import {Picker} from "emoji-mart";
import data from "@emoji-mart/data";
import {useDark} from "@vueuse/core";
import {submitCommentApi} from "@/modules/comment/api/comment.js";
import {ElMessage} from "element-plus";

const emits = defineEmits(['submitSuccess', 'close'])
const props = defineProps(['articleId', 'pid', 'topPid'])

const addForm = ref({
  content: '',
  articleId: props.articleId,
  pid: props.pid,
  topPid: props.topPid
});
const addRule = reactive({
  content: [{required: true, message: '请输入回复内容', trigger: 'blur'}],
});
const addFormRef = ref();
let showEmojiPanel = ref(false);
const pickerRef = ref();
const editor = ref();

/**
 * 添加提交
 */
function submitAddForm() {
  addFormRef.value.validate(valid => {
    if (valid) {
      submitCommentApi(addForm.value).then((res) => {
        if (res.code === 200) {
          ElMessage.success('回复成功');
          emits('submitSuccess')
        } else {
          ElMessage.error(res.msg);
        }
      })
    }
  })
}

function closeCommentCreate() {
  emits('close')
}

/**
 * 重置添加表单
 */
function resetAddForm() {
  addForm.value = {
    content: '',
    articleId: null,
    pid: null,
    topPid: null
  }
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
}

onMounted(() => {
  if (!window.Picker) {
    window.Picker = Picker;
  }
  if (pickerRef.value !== null) {
    new window.Picker({
      data,
      parent: pickerRef.value,
      searchPosition: 'sticky',
      skinTonePosition: 'search',
      previewPosition: 'none',
      autoFocus: true,
      onEmojiSelect: onEmojiClick,
      locale: 'zh',
      theme: useDark().value ? 'dark' : 'light'
    });
  }
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
  if (pickerRef.value && !path.includes(pickerRef.value)) {
    showEmojiPanel.value = false;
  }
}


/**
 * 点击表情事件
 * @param emoji
 */
function onEmojiClick(emoji) {
  const start = editor.value.selectionStart;
  const end = editor.value.selectionEnd;
  addForm.value.content = addForm.value.content.slice(0, start) +  emoji.native + addForm.value.content.slice(end);
  editor.value.focus();
  nextTick(() => {
    editor.value.focus();
    // 设置光标位置到 emoji 后面
    const newPosition = start + emoji.native.length;
    editor.value.setSelectionRange(newPosition, newPosition);
  });
}

</script>
<style scoped>
.comment-editor {
  border: 1px solid var(--el-border-color);
  width: 100%;
  height: 120px;
  color: var(--el-text-color-primary);
  padding: 6px 12px;
  -webkit-transition: all .25s ease-in-out 0s;
  transition: all .25s ease-in-out 0s;
  outline: none;
  resize: vertical;
  border-radius: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 13px;
  font-family: var(--el-font-family);
}
.dialog-footer{
  display: flex;
  justify-content: flex-end;
}
.emoji-picker{
  position: absolute;
  top: 33px;
  border-radius: 3px;
  right: 0;
  z-index: 99999;
}

@media screen and (max-width:700px) {
  .emoji-picker{
    position: absolute;
    top: 33px;
    border-radius: 3px;
    right: -100px;
    z-index: 99999;
  }
}

</style>
