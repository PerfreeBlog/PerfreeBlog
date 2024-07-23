<template>
  <vditor-md-editor v-if="props.editorType === 'Vditor(markdown)'" :init-value="props.initValue" ref="editorRef"></vditor-md-editor>
  <wang-rich-editor v-if="props.editorType === 'WangEditor(富文本)'"></wang-rich-editor>
</template>


<script setup>
import {ref} from "vue";
import VditorMdEditor from "@/modules/article/components/vditor-md-editor.vue";
import WangRichEditor from "@/modules/article/components/wang-rich-editor.vue";

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