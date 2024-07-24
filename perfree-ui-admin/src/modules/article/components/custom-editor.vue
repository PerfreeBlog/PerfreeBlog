<template>
  <vditor-md-editor v-if="props.editorType === 'Vditor(markdown)'" :init-value="props.initValue" ref="editorRef"></vditor-md-editor>
  <ai-editor v-if="props.editorType === 'aiEditor'" :init-value="props.initValue" ref="editorRef"></ai-editor>
</template>


<script setup>
import {ref} from "vue";
import VditorMdEditor from "@/modules/article/components/vditor-md-editor.vue";
import AiEditor from "@/modules/article/components/ai-editor.vue";

const props = defineProps(['editorType', 'initValue'])
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