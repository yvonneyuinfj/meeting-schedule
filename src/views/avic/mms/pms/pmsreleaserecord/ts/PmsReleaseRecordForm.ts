import request from '@/utils/request';
import type { PmsReleaseRecordDto } from '@/api/avic/mms/pms/PmsReleaseRecordApi'; // 引入模块DTO
import { getPmsReleaseRecord, savePmsReleaseRecord } from '@/api/avic/mms/pms/PmsReleaseRecordApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function usePmsReleaseRecordForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<PmsReleaseRecordDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    pmsTaskNo: [
      { required: true, message: '采购任务编号不能为空', trigger: 'change' }
    ],
    reqPlanNo: [
      { required: true, message: '采购计划号不能为空', trigger: 'change' }
    ],
    reqPlanName: [
      { required: true, message: '采购计划名称不能为空', trigger: 'change' }
    ],
    powerLetterNumber: [
      { required: true, message: '动力函号不能为空', trigger: 'change' }
    ],
    decryptionReleaseName: [
      { required: true, message: '脱密发布名称不能为空', trigger: 'change' }
    ],
    releaseDate: [
      { required: true, message: '发布日期不能为空', trigger: 'change' }
    ],
    releaseEndDate: [
      { required: true, message: '截止日期不能为空', trigger: 'change' }
    ],
    releaseUnifiedCode: [
      { required: true, message: '发布统一编码不能为空', trigger: 'change' }
    ],
    releaseUserId: [
      { required: true, message: '发布人不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
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
  function getUserFileSecretList() {
    proxy.$getUserFileSecretLevelList(result => {
      secretLevelList.value = result;
    });
  }
  /**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
  function getFormData(id) {
    loading.value = true;
    getPmsReleaseRecord(id)
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
  function saveForm() {
    formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        savePmsReleaseRecord(postData)
          .then((res) => {
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
  function successCallback() {
    proxy.$message.success('保存成功！');
    emit('reloadData');
    emit('close');
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  /** 回填职工号&职工姓名 lvmin 2024-01-04*/
  const getSelectUserCode = function (e, code, name) {
    request.get('/appsys/user/UserRest/get/' + e.ids + '/v1').then(res => {
      form.value[code] = res.data.no;
    });
    form.value[name] = e.names;
  };
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    secretLevelList,
    saveForm,
    closeModal,
    getSelectUserCode
  };
}


