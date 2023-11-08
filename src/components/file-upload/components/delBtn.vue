<template>
  <a-popconfirm
    v-if="askType == 'popconfirm'"
    :title="title"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <slot>
      <a-button :type="type" :disabled="disabled" :loading="loading" :title="buttonName">
        <template #icon><delete-outlined /></template>
        {{ buttonName }}
      </a-button>
    </slot>
  </a-popconfirm>
  <span v-else @click="handleDelete">
    <slot>
      <a-button :type="type" :loading="loading" :disabled="disabled" :title="buttonName">
        <template #icon><delete-outlined /></template>
        {{ buttonName }}
      </a-button>
    </slot>
  </span>
</template>
<script lang="ts" setup>
const { proxy } = getCurrentInstance();
const props = defineProps({
  //按钮名称
  buttonName: {
    type: String,
    default: '删除'
  },
  // 询问类型:modal popconfirm,默认modal.
  askType: {
    type: String,
    default: 'modal'
  },
  // 提示语
  title: {
    type: String,
    default: '确认要删除选择的数据吗?'
  },
  // 按钮loading状态
  loading: {
    type: Boolean,
    default: false
  },
  // 按钮类型
  type: {
    type: String,
    default: 'danger'
  },
  // 按钮是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
});
const $emit = defineEmits(['click', 'click-confirm', 'click-cancel']);

function handleDelete(e) {
  e.stopPropagation();
  // modal提示是否删除
  proxy.$Modal.confirm({
    title: props.title,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      // 确认删除
      handleConfirm();
    },
    onCancel: () => {
      // 取消删除
      handleCancel();
    }
  });
  // 确认删除
  $emit('click');
}
function handleConfirm() {
  // 确认删除
  $emit('click-confirm');
}
function handleCancel() {
  // 取消删除
  $emit('click-cancel');
}
</script>
