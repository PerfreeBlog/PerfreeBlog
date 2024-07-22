<template>
  <cherry-md-editor  v-if="props.editorType === 'Cherry(markdown)'" @content-change="contentChange" :init-value="props.initValue" ref="editorRef"></cherry-md-editor>
</template>

<script setup>
import CherryMdEditor from "./cherry-md-editor.vue";
import {ref} from "vue";

const props = defineProps(['editorType', 'initValue'])
const emits = defineEmits(['contentChange'])
const editorRef = ref();

function contentChange(content, parseContent) {
  emits('contentChange', content, parseContent);
}

function resetContent() {
  editorRef.value.resetContent();
}

defineExpose({
  resetContent
})
</script>