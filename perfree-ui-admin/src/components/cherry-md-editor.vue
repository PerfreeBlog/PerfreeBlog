<template>
  <div ref="markdownContainer" style="height: 600px;width: 100%"></div>

  <el-dialog v-model="open" :title="title" width="800px" draggable   destroy-on-close>
    <attach-select-panel @update:selected-attach="selectAttach" :max="attachMaxSelect" :attach-type="attachType"></attach-select-panel>
    <template #footer>
        <span class="dialog-footer">
              <el-button type="primary" @click="submitAddForm">确 定<span v-if="selectData.length > 0">(已选{{selectData.length}}个)</span></el-button>
              <el-button @click="open = false; resetAddForm()">取 消</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script setup>
import 'cherry-markdown/dist/cherry-markdown.css';
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import AttachSelectPanel from "@/components/attach-select-panel.vue";

let cherryInstance =  null;
const markdownContainer = ref();
let open = ref(false)
let title = ref('')
let selectData = ref([])
let attachType = ref('')
let attachMaxSelect = ref(0)

// 定义插入图片按钮
let customImageMenu = Cherry.createMenuHook('插入图片',  {
  iconName: 'image',
  onClick: function(selection) {
    attachType.value = 'img';
    attachMaxSelect.value = 8;
    title.value = '选择图片'
    open.value = true;
  }
});

// 定义插入视频按钮
let customVideoMenu = Cherry.createMenuHook('插入视频',  {
  iconName: 'video',
  onClick: function(selection) {
    attachType.value = 'video';
    attachMaxSelect.value = 1;
    title.value = '选择视频'
    open.value = true;
  }
});

/**
 * 选择附件
 */
function selectAttach(data) {
  selectData.value = data

}

/**
 * 确定选择
 */
function submitAddForm() {
  selectData.value.forEach((r, index) => {
    if (attachType.value === 'img') {
      let insertStr = `\n![${r.name}](${r.url})`;
      cherryInstance.insert(insertStr)
      if (index === selectData.value.length -1 )  {
        cherryInstance.insert('\n')
      }
    }

    if (attachType.value === 'video') {
      let insertStr = `\n<video src="${r.url}" controls="controls" width="100%"></video>`;
      cherryInstance.insert(insertStr)
    }
  });

  // cherryInstance.insert('\n\n')
  open.value = false
  selectData.value = []
}

/**
 * 关闭选择附件面板
 */
function resetAddForm() {
  open.value = false
  selectData.value = []
}


onMounted(() => {
  cherryInstance =  new Cherry({
    el: markdownContainer.value,
    value: '写点什么吧',
    forceAppend: false,
    engine: {
      global: {
        classicBr: true,
      },
      syntax: {
        table: {
          enableChart: false,
        },
      }
    },
    toolbars: {
      // 定义顶部工具栏
      toolbar: ['undo', 'redo', '|',
        'header',
        {bold:['bold', 'italic', 'underline','hr', 'br', 'strikethrough']},
        'justify','quote',
       'list', 'link', 'code','table','customImage','customVideo'
      ],
      // 定义侧边栏，默认为空
      sidebar: ['theme', 'mobilePreview', 'copy'],
      // 定义顶部右侧工具栏，默认为空
      toolbarRight: ['fullScreen', 'export'],
      // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
      bubble: ['bold', 'italic', 'underline', 'strikethrough', 'quote'],
      // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
      float: ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code'],
      customMenu: {
        customImage: customImageMenu,
        customVideo: customVideoMenu
      },
    },
    previewer: {
      enablePreviewerBubble: false,
    }
  });
  // cherryInstance.on('afterChange', afterChange);
})




function afterChange(){
  /*addForm.value.content = cherryInstance.getMarkdown();
  console.log(addForm.value);*/
}

</script>

<style>
.cherry-previewer img{
  width: 100%;
}
</style>