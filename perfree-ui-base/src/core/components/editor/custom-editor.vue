<template>
  <ai-editor :init-value="props.initValue"  :height="props.height"  ref="editorRef"></ai-editor>
</template>


<script setup>
import {ref} from "vue";
import AiEditor from "@/core/components/editor/ai-editor.vue";

const props = defineProps(['editorType', 'initValue', 'height'])
const editorRef = ref();


function resetContent() {
  editorRef.value.resetContent();
}

function getValue() {
  return editorRef.value.getValue();
}

defineExpose({
  resetContent,
  getValue
})
</script>

<style scoped>
:deep(> div) {
  height: 100%;
}
</style>
