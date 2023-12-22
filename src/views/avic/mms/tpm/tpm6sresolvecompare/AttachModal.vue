<template>
  <a-modal
      title="查看大文本"
      :visible="props.attachOpen"
      @cancel="handleCancel"
      :footer="null"
      width="40%"
  >
    <div class="Richtext">
      <!--      <Toolbar-->
      <!--          style="border-bottom: 1px solid #ccc"-->
      <!--          :editor="editorRef"-->
      <!--          :defaultConfig="toolbarConfig"-->
      <!--      />-->
      <Editor
          v-if="isShow"
          style="height: 150px; overflow-y: auto"
          v-model:value="form.info"
          :defaultConfig="editorConfig"
          @onCreated="onCreated"
      />
    </div>
  </a-modal>

</template>
<script setup lang="ts">
import { Editor } from '@wangeditor/editor-for-vue';
import { useRichText } from '@/utils/hooks/useRichText';
import '@wangeditor/editor/dist/css/style.css'; // 引入富文本样式

const props = defineProps({
  attachOpen: {
    type: Boolean,
    default: false
  },
  attachForm: {
    type: Object,
    default: {}
  },
  bpmInstanceObject: {
    type: Object
  }
});
const form = reactive({
  id: '',
  info: ''
});
const emit = defineEmits(['closeAttach']);
const editorRef = shallowRef(null); // 编辑器实例，必须用 shallowRef
const isShow = ref(false);
const {
  // toolbarConfig,
  editorConfig,
  onCreated,
  dealRichText
} = useRichText(
    editorRef,
    'info',
    'default'
);

function handleCancel() {
  isShow.value = false;
  emit('closeAttach');
}

watch(
    () => props.attachForm.id,
    async newV => {
      if (newV) {
        form.id = newV;
        form.info = props.attachForm.info;
        isShow.value = true;
        setTimeout(async () => {
          await dealRichText(form.info);
          editorRef.value.disable();
        }, 300);
      }
    }
);
</script>
