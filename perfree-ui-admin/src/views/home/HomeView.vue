<script setup>

import 'perfree-lit-test/dist/js/index'
</script>

<template>
  <main>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <el-alert title="Success alert" type="success" />
    <el-alert title="Info alert" type="info" />
    <el-alert title="Warning alert" type="warning" />
    <el-alert title="Error alert" type="error" />

    <my-element docsHint="xx2x">
    </my-element>
  </main>
</template>
