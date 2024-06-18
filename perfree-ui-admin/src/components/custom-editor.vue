<template>
  <cherry-md-editor  v-if="props.editorType === 'cherry'"></cherry-md-editor>
</template>

<script setup>
import CherryMdEditor from "@/components/cherry-md-editor.vue";

const props = defineProps(['editorType'])

</script>