import type { TpmOeeLDto } from '@/api/avic/mms/tpm/TpmOeeLApi'; // 引入模块DTO
import { getTpmOeeL, saveTpmOeeL } from '@/api/avic/mms/tpm/TpmOeeLApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useTpmOeeLForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<TpmOeeLDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    assetsCode: [
      { required: true, message: '资产编号不能为空', trigger: 'change' }
    ],
    equipmentCode: [
      { required: true, message: '设备编号不能为空', trigger: 'change' }
    ],
    equipmentName: [
      { required: true, message: '设备名称不能为空', trigger: 'change' }
    ],
    testMission: [
      { required: true, message: '试验任务/件号不能为空', trigger: 'change' }
    ],
    totalTime: [
      { required: true, message: '总时间（h）不能为空', trigger: 'change' }
    ],
    planStopDurationTime: [
      { required: true, message: '计划停机时间（h）不能为空', trigger: 'change' }
    ],
    workDurationTime: [
      { required: true, message: '开动时间（h）不能为空', trigger: 'change' }
    ],
    freeTime: [
      { required: true, message: '空闲待工时间（h）不能为空', trigger: 'change' }
    ],
    adjustTime: [
      { required: true, message: '准备调整时间（h）不能为空', trigger: 'change' }
    ],
    stopDurationTime: [
      { required: true, message: '故障停机时间（h）不能为空', trigger: 'change' }
    ],
    stopDurationNumber: [
      { required: true, message: '故障停机次数不能为空', trigger: 'change' }
    ],
    mtbf: [
      { required: true, message: '平均故障间隔时间MTBF(h)不能为空', trigger: 'change' }
    ],
    mttr: [
      { required: true, message: '平均故障停机时间MTTR(h)不能为空', trigger: 'change' }
    ],
    passRate: [
      { required: true, message: '试验成功率/合格品率不能为空', trigger: 'change' }
    ],
    oee: [
      { required: true, message: 'OEE不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2;; // 调用布局公共方法
  const loading = ref(false);
  const secretLevelList = ref([]); // 密级通用代码


  onMounted(() => {
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
  });
  /** 获取当前用户对应的文档密级 */
  function getUserFileSecretList () {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData (id) {
    loading.value = true;
    getTpmOeeL (id)
      .then(async (res) => {
        if (res.success) {
          form.value = res.data;
          // 处理数据
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取表单数据失败！');
        loading.value = false;
      });
  }
  /** 保存 */
  function saveForm () {
    form.value.tpmOeeId = props.mainId;
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveTpmOeeL (postData)
          .then(res => {
          if (res.success) {
              successCallback();
          } else {
            loading.value = false;
          }
         })
        .catch(() => {
          loading.value = false;
        });
      })
      .catch(error => {
        // 定位校验失败元素
        proxy.$scrollToFirstErrorField(formRef, error);
      });
  }
  /** 数据保存成功的回调 */
  function successCallback () {
    proxy.$message.success('保存成功！');
    emit('reloadData');
    emit('close');
  }
  /** 返回关闭事件 */
  function closeModal () {
    emit('close');
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    saveForm,
    closeModal
  };
}

