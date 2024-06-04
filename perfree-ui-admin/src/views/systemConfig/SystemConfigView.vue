<template>
  <div class="page">
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="group[0].group" :name="group[0].group" v-for="group in optionData">
        <el-form  label-width="auto" style="max-width: 600px">
          <div  v-for="item in group">
            <el-form-item :label="item.label" v-if="item.type === 'input'">
              <el-input v-model="item.value" :placeholder="item.placeholder"/>
            </el-form-item>
            <el-form-item :label="item.label" v-if="item.type === 'switch'">
              <el-switch v-model="item.value"  :placeholder="item.placeholder"/>
            </el-form-item>
            <el-form-item :label="item.label" v-if="item.type === 'select'">
              <el-select v-model="item.value" :placeholder="item.placeholder" clearable>
                <el-option :label="op.split('|')[0]" :value="op.split('|')[1]" v-for="op in item.other.split(',')"/>
              </el-select>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'textarea'">
              <el-input v-model="item.value" type="textarea" :placeholder="item.placeholder" :rows="item.other"/>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'radio'">
              <el-radio-group v-model="item.value">
                <el-radio :value="op.split('|')[1]"  v-for="op in item.other.split(',')">   {{op.split('|')[0]}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'inputNum'">
              <el-input-number v-model="item.value" :min="parseInt(item.other.split('|')[0])" :max="parseInt(item.other.split('|')[1])"/>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'selectMultiple'">
              <el-select v-model="item.value" :placeholder="item.placeholder" clearable multiple>
                <el-option :label="op.split('|')[0]" :value="op.split('|')[1]" v-for="op in item.other.split(',')"/>
              </el-select>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'selectAttachInput'">
              <attach-select-input :attach-type="JSON.parse(item.other).attachType" v-model:model-value="item.value"
                :spliter="JSON.parse(item.other).spliter" :enable-input="JSON.parse(item.other).enableInput" 
                :placeholder="item.placeholder">
            </attach-select-input>
            </el-form-item>

            <el-form-item :label="item.label" v-if="item.type === 'selectAttachTextarea'">
              <attach-select-textarea :attach-type="JSON.parse(item.other).attachType" v-model:model-value="item.value"
                :spliter="JSON.parse(item.other).spliter" :enable-input="JSON.parse(item.other).enableInput" 
                :placeholder="item.placeholder">
            </attach-select-textarea>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm(group)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>

import AttachSelectInput from "@/components/attach-select-input.vue";

const optionData = ref()
const activeTab = ref(null)

const d = [
  {id: '1', group:'基础配置', name: 'aaa1', label: '输入框',value: 'bbb1', type: 'input', placeholder: '请输入', defaultValue: '0', other: ''},
  {id: '2', group:'基础配置', name: 'aaa2', label: '开关',value: 'bbb0', type: 'switch', placeholder: '请输入', defaultValue: '0', other: ''},
  {id: '2', group:'基础配置', name: 'aaa3', label: '下拉单选',value: 'a1', type: 'select', placeholder: '请输入', defaultValue: '0', other: 'a1|a1,a2|a2,a3|a3'},
  {id: '2', group:'基础配置', name: 'aaa4', label: '单选',value: "a1", type: 'radio', placeholder: '请输入', defaultValue: '0', other: 'a1|a1,a2|a2,a3|a3'},
  {id: '2', group:'基础配置', name: 'aaa5', label: '多行文本',value: 'bbb0', type: 'textarea', placeholder: '请输入', defaultValue: '0', other: '5'},
  {id: '2', group:'基础配置', name: 'aaa5', label: '数字输入',value: '5', type: 'inputNum', placeholder: '请输入', defaultValue: '0', other: '0|100'},
  {id: '2', group:'基础配置', name: 'aaa3', label: '下拉多选',value: 'a1', type: 'selectMultiple', placeholder: '请输入', defaultValue: '0', other: 'a1|a1,a2|a2,a3|a3'},
  {id: '2', group:'基础配置', name: 'aaa3', label: '附件选择输入框',value: 'a1', type: 'selectAttachInput', placeholder: '请输入', defaultValue: '0', 
  other: '{"attachType": "image/jpeg", "spliter": ",", "enableInput": true}'},
  {id: '2', group:'基础配置', name: 'aaa3', label: '附件选择文本框',value: 'a1', type: 'selectAttachTextarea', placeholder: '请输入', defaultValue: '0', 
  other: '{"attachType": "image/jpeg", "spliter": ",", "enableInput": true}'},
  {id: '3', group:'高级配置', name: 'aaa6', label: 'xx配置6',value: 'bbb2', type: 'input', placeholder: '请输入', defaultValue: '0', other: ''},
  {id: '4', group:'高级配置', name: 'aaa7', label: 'xx配置7',value: 'bbb3', type: 'input', placeholder: '请输入', defaultValue: '0', other: ''}
]
const groupedData = d.reduce((result, item) => {
  if (item.type === 'inputNum'){
    item.value = parseInt( item.value )
  }
  (result[item.group] = result[item.group] || []).push(item);
  return result;
}, {});

optionData.value = Object.values(groupedData);
activeTab.value = Object.keys(groupedData)[0]
console.log(optionData.value);

const submitForm=(group)=>{
  console.log(group)
}
</script>