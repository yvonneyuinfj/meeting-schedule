import type { MdsProjectDto } from '@/api/avic/mms/mds/MdsProjectApi'; // 引入模块DTO
import type { MdsCustomerTypeDto } from '@/api/avic/mms/mds/MdsCustomerTypeApi'; // 引入模块DTO
import { getMdsProject, saveMdsProject } from '@/api/avic/mms/mds/MdsProjectApi'; // 引入模块API
import { getMdsCustomerTypeAll } from '@/api/avic/mms/mds/MdsCustomerTypeApi'; // 引入模块API
export const emits = ['reloadData', 'close'];
export function useMdsProjectForm({
  props: props,
  emit: emit
}) {
  const { proxy } = getCurrentInstance();
  const form = ref<MdsProjectDto>({});
  const formRef = ref(null);
  const rules: Record<string, Rule[]> = {
    projectCode: [
      { required: true, message: '项目编号不能为空', trigger: 'change' }
    ],
    projectName: [
      { required: true, message: '项目名称不能为空', trigger: 'change' }
    ],
    projectGrade: [
      { required: true, message: '项目等级不能为空', trigger: 'change' }
    ],
    projectSecretClass: [
      { required: true, message: '项目密级不能为空', trigger: 'change' }
    ],
    projectStatus: [
      { required: true, message: '项目状态不能为空', trigger: 'change' }
    ],
    projectApprovalDate: [
      { required: true, message: '立项日期不能为空', trigger: 'change' }
    ],
    ynProduction: [
      { required: true, message: '是否实物生产不能为空', trigger: 'change' }
    ],
    projectType: [
      { required: true, message: '项目类型不能为空', trigger: 'change' }
    ],
    applicationType: [
      { required: true, message: '应用类型不能为空', trigger: 'change' }
    ],
    secretLevel: [
      { required: true, message: '密级 不能为空', trigger: 'change' }
    ]
  };
  const layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  };
  const colLayout = proxy.$colLayout2; // 调用布局公共方法
  const loading = ref(false);
  const uploadFile = ref(null); // 附件ref
  const projectGradeList = ref([]); // 项目等级通用代码
  const projectSecretClassList = ref([]); // 项目密级通用代码
  const projectStatusList = ref([]); // 项目状态通用代码
  const currencyTypeList = ref([]); // 币种通用代码
  const ynProductionList = ref([]); // 是否实物生产通用代码
  const industryTypeList = ref([]); // 项目所属行业通用代码
  const businessAreaList = ref([]); // 所属业务域通用代码
  const balanceFlagList = ref([]); // 是否按项目号平衡通用代码
  const validFlagList = ref([]); // 有效标识通用代码
  const projectTypeList = ref([]); // 项目类型通用代码
  const applicationTypeList = ref([]); // 应用类型通用代码
  const secretLevelList = ref([]); // 密级 通用代码
  const mdsCustomerTypeList = ref([])//客户类型 
  const lookupParams = [
    { fieldName: 'projectGrade', lookUpType: 'MDS_PROJECT_GRADE' },
    { fieldName: 'projectSecretClass', lookUpType: 'MDS_SECRET_CLASS' },
    { fieldName: 'projectStatus', lookUpType: 'MDS_PROJECT_STATUS' },
    { fieldName: 'currencyType', lookUpType: 'MDS_CURRENDY_TYPE' },
    { fieldName: 'ynProduction', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'industryType', lookUpType: 'MDS_INDUSTRY_TYPE' },
    { fieldName: 'businessArea', lookUpType: 'MDS_BUSINESS_AREA' },
    { fieldName: 'balanceFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
    { fieldName: 'validFlag', lookUpType: 'MDS_VAILD_FLAG' },
    { fieldName: 'projectType', lookUpType: 'MDS_PROJECT_TYPE' },
    { fieldName: 'applicationType', lookUpType: 'PROJECT_APPLICATION_TYPE' }
  ];

  onMounted(() => {
    // 加载查询区所需通用代码
    getLookupList();
    // 获取当前用户对应的文档密级
    getUserFileSecretList();
    if (props.formId) {
      // 编辑、详情页面加载数据
      getFormData(props.formId);
    }
    //加载客户类型数据
    getMdsCustomerTypeList();
  });

  /** 获取通用代码  */
  function getLookupList() {
    proxy.$getLookupByType(lookupParams, result => {
      projectGradeList.value = result.projectGrade;
      projectSecretClassList.value = result.projectSecretClass;
      projectStatusList.value = result.projectStatus;
      currencyTypeList.value = result.currencyType;
      ynProductionList.value = result.ynProduction;
      industryTypeList.value = result.industryType;
      businessAreaList.value = result.businessArea;
      balanceFlagList.value = result.balanceFlag;
      validFlagList.value = result.validFlag;
      projectTypeList.value = result.projectType;
      applicationTypeList.value = result.applicationType;
    });
  }
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
    getMdsProject(id)
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
        // 附件密级校验 先判断
        const errorMessage = uploadFile.value.validateUploaderFileSecret(
          form.value.secretLevel
        );
        if (errorMessage) {
          return;
        }
        loading.value = true;
        // 处理数据
        const postData = proxy.$lodash.cloneDeep(form.value);
        // 发送请求
        saveMdsProject(postData)
          .then((res) => {
            if (res.success) {
              uploadFile.value.upload(form.value.id || res.data); // 附件上传
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
  /** 数据保存失败的回调 */
  function errorCallback() {
    emit('reloadData');
    emit('close');
  }
  /** 附件上传完之后的回调函数 */
  function afterUploadEvent(successFile, errorFile) {
    if (errorFile.length > 0) {
      // 有附件保存失败的处理
      errorCallback();
    } else {
      // 所有附件都保存成功的处理
      successCallback();
    }
  }
  /** 返回关闭事件 */
  function closeModal() {
    emit('close');
  }
  /**获取客户类型信息*/
  const queryForm = ref<MdsCustomerTypeDto>({});
  const queryParam = reactive({
    // 请求表格数据参数
    pageParameter: {
      page: 1, // 页数
      rows: 20 // 每页条数
    },
    searchParams: {
      ...queryForm
    },
    keyWord: ref(''), // 快速查询数据
    sidx: null, // 排序字段
    sord: null // 排序方式: desc降序 asc升序
  });
  /**加载客户类型数据 */
  function getMdsCustomerTypeList() {
    loading.value = true;
    //queryParam.searchParams.validFlag = '1';
    getMdsCustomerTypeAll(queryParam)
      .then(async (res) => {
        if (res.success) {
          mdsCustomerTypeList.value = res.data.result;;
          // 处理数据
          loading.value = false;
        }
      })
      .catch(() => {
        proxy.$message.warning('获取库房类型失败！');
        loading.value = false;
      });
  }
  return {
    form,
    formRef,
    rules,
    layout,
    colLayout,
    loading,
    projectGradeList,
    projectSecretClassList,
    projectStatusList,
    currencyTypeList,
    ynProductionList,
    industryTypeList,
    businessAreaList,
    balanceFlagList,
    validFlagList,
    projectTypeList,
    applicationTypeList,
    secretLevelList,
    uploadFile,
    afterUploadEvent,
    saveForm,
    closeModal,
    mdsCustomerTypeList
  };
}


