<template>
  <cherry-md-editor  v-if="props.editorType === 'cherry2'" @content-change="contentChange" :init-value="props.initValue" ref="editorRef"></cherry-md-editor>
  <cherry-md-editor  v-if="props.editorType === 'cherry'" @content-change="contentChange" :init-value="props.initValue" ref="editorRef"></cherry-md-editor>
</template>

<script setup>
import CherryMdEditor from "@/components/cherry-md-editor.vue";

const props = defineProps(['editorType', 'initValue'])
const emits = defineEmits(['contentChange'])
const editorRef = ref();

function contentChange(v) {
  emits('contentChange', v);
}

function resetContent() {
  editorRef.value.resetContent();
}

defineExpose({
  resetContent
})
</script>