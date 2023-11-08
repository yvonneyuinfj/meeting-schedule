import {
  getWorkHandInfo,
  getWorkHandInfoById,
  insertWorkHand,
  updateWorkHand
} from '@/api/avic/bpm/BpmProcessDelegationApi';
import DelegationScope from '../DelegationScope.vue';

export default defineComponent({
  components: { DelegationScope },
  props: {
    formId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const formRef = ref(),
      { proxy } = getCurrentInstance(),
      colLayout = proxy.$colLayout2, // 调用布局公共方法
      colLayout4 = proxy.$colLayout4,
      initialSendDate = proxy.$dateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm'),
      layout = {
        labelCol: { flex: '0 0 120px' },
        wrapperCol: { flex: '1 1 0' }
      },
      rules = {
        receptUserId: [{ required: true, message: '受托人不能为空', trigger: 'blur' }],
        handEffectiveDate: [{ required: true, message: '起始日期不能为空', trigger: 'blur' }],
        backDate: [{ required: true, message: '截止日期不能为空', trigger: 'blur' }]
      },
      editorRef = shallowRef(), // 编辑器实例，必须用 shallowRef
      state = reactive({
        form: {
          handAcceptedTask: ['1'],
          expireAutoCancel: ['0'],
          validFlag: '1',
          handDate: getNowDate(),
          handEffectiveDate: initialSendDate
        },
        parentItem: {},
        customProcessList: [
          {
            id: 0,
            modelId: '',
            modelName: '',
            workHandType: '',
            receptUserId: '',
            receptUserName: ''
          }
        ],
        loading: false,
        checked: false,
        showScopeModal: false,
        isCustomProcess: false,
        count: 0,
        modalLoading: false
      });
    let {
      form,
      parentItem,
      customProcessList,
      loading,
      checked,
      count,
      showScopeModal,
      isCustomProcess,
      modalLoading
    } = toRefs(state);

    onMounted(() => {
      if (props.formId) {
        // 编辑详情页面加载数据
        getFormData(props.formId);
      } else {
        // 添加表单的初始值
        initForm();
      }
    });
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    });

    /** 设置添加表单的初始值 */
    function initForm() {
      getWorkHandInfo().then(async res => {
        if (res.success) {
          form.value.workOwnerId = res.data.workOwnerId;
          form.value.workOwnerName = res.data.workOwnerName;
          form.value.workOwnerDeptId = res.data.workOwnerDeptId;
          form.value.workOwnerDeptName = res.data.workOwnerDeptName;
        }
      });
    }
    /**
     * 回填受托人部门
     * @param user
     */
    function receptUserCallback(user) {
      form.value.receptDeptId = user.deptid;
      form.value.receptDeptName = user.deptname;
      return true;
    }
    /**
     * 自定义委托复选框变化
     */
    function customProcessWayChange(e) {
      console.log(e);
      checked.value = !checked.value;
      isCustomProcess.value = checked.value;
    }
    /**
     * 添加自定义委托列
     */
    function addCustomProcess() {
      count.value += 1;
      customProcessList.value.push({
        id: count.value,
        modelId: '',
        modelName: '',
        workHandType: '',
        receptUserId: '',
        receptUserName: ''
      });
    }
    /**
     * 删除自定义委托列
     */
    function removeCustomProcess(item) {
      customProcessList.value = customProcessList.value.filter(i => i.id !== item.id);
    }
    /**
     * 打开流程范围弹窗
     */
    function openDelegationScopeModal(item) {
      showScopeModal.value = true;
      parentItem.value = { ...item };
    }
    /**
     * 拿到流程弹窗数据,渲染回自定义委托列表
     */
    function sendSelectedFlow(params) {
      nextTick(() => {
        customProcessList.value.forEach(item => {
          if (item.id === params.id) {
            item.modelId = params.data.modelIds;
            item.modelName = params.data.modelNames;
            item.workHandType = params.data.modelType;
          }
        });
      });
    }
    /**
     * 编辑详情页面加载数据
     * @param {String} id 行数据的id
     */
    function getFormData(id) {
      loading.value = true;
      getWorkHandInfoById(id)
        .then(res => {
          if (res.success) {
            form.value = res.data.workHand;
            form.value.handAcceptedTask = [form.value.handAcceptedTask];
            form.value.expireAutoCancel = [form.value.expireAutoCancel];
            form.value.backDate = proxy.$dateFormat(form.value.backDate, 'YYYY-MM-DD');
            form.value.handDate = proxy.$dateFormat(form.value.handDate, 'YYYY-MM-DD');
            form.value.handEffectiveDate = proxy.$dateFormat(
              form.value.handEffectiveDate,
              'YYYY-MM-DD'
            );
            if (res.data?.modelList.length > 0) {
              // 自定义委托数据
              checked.value = true;
              isCustomProcess.value = true;
              customProcessList.value = res.data.modelList;
            }
          }
        })
        .finally(() => {
          loading.value = false;
        })
        .catch(() => {
          proxy.$message.warning('获取表单数据失败！');
        });
    }
    /** 保存 */
    function saveForm(e) {
      e.preventDefault();
      formRef.value.validate().then(v => {
        // 处理数据
        let newValues = proxy.$lodash.cloneDeep(form.value);
        newValues.handAcceptedTask = newValues.handAcceptedTask[0];
        newValues.expireAutoCancel = newValues.expireAutoCancel[0];
        // 自定义委托数据定义
        let modulesData = [];
        // 校验: 默认委托人和自定义委托至少选择一个
        if (
          (typeof newValues.receptUserId == 'undefined' || newValues.receptUserId === '') &&
          !checked.value
        ) {
          proxy.$message.warning('默认受托人和自定义委托不能都为空！');
          return;
        }
        // 校验: 若勾选了自定义委托,则必须最少有一条自定义委托记录,并且每条记录流程范围和受托人均要有值
        if (checked.value) {
          if (customProcessList.value.length < 1) {
            proxy.$message.warning('您还没有添加自定义委托');
            return;
          }
          let flag = false,
            flagUser = false;
          for (let i = 0; i < customProcessList.value.length; i++) {
            if (
              customProcessList.value[i].modelId === '' ||
              customProcessList.value.receptUserId === ''
            ) {
              flag = true;
              break;
            }
            if (customProcessList.value.receptUserId === form.value.workOwnerId) {
              flagUser = true;
              break;
            }
          }
          if (flag) {
            proxy.$message.warning('您还没有选择流程委托范围或受托人');
            return;
          } else if (flagUser) {
            proxy.$message.warning('不能移交给委托人！');
            return;
          } else {
            // 校验通过设置基础表单customWorkhand字段值
            newValues.customWorkhand = 'on';
            // 整理自定义委托数据
            for (let i = 0; i < customProcessList.value.length; i++) {
              let customProcess = customProcessList.value[i];
              let modelIdArr = customProcess.modelId.split(',');
              let userId = customProcess.receptUserId;
              let workHandTypeArr = customProcess.workHandType.split(',');
              for (let j = 0; j < modelIdArr.length; j++) {
                modulesData.push({
                  modelId: modelIdArr[j],
                  userId,
                  workHandType: workHandTypeArr[j]
                });
              }
            }
          }
        }
        // 整理提交数据
        let params = {
          dataVo: JSON.stringify(newValues)
        };
        if (checked.value) {
          params.modules = JSON.stringify(modulesData);
        }
        // 发送请求
        modalLoading.value = true; // 按钮开启loading状态
        if (props.formId) {
          updateWorkHand(params)
            .then(res => {
              if (res.success) {
                successCallback();
              } else {
                proxy.$message.warning(res.message);
              }
            })
            .catch(err => {
              proxy.$message.warning(err.message);
              modalLoading.value = false; // 按钮关闭loading状态
            });
        } else {
          insertWorkHand(params)
            .then(res => {
              if (res.success) {
                successCallback();
              } else {
                proxy.$message.warning(res.message);
              }
            })
            .catch(err => {
              proxy.$message.warning(err.message);
              modalLoading.value = false; // 按钮关闭loading状态
            });
        }
      });
    }

    function successCallback() {
      modalLoading.value = false;
      proxy.$message.success('操作成功！');
      emit('reloadData');
      emit('close');
    }
    /** 返回关闭事件 */
    function closeModal() {
      emit('close');
    }

    /** 获取当前时间 */
    function getNowDate() {
      let nowDate = new Date();
      let nowDateStr = proxy.$dateFormat(nowDate, 'YYYY-MM-DD');
      return nowDateStr;
    }

    return {
      formRef,
      layout,
      proxy,
      initialSendDate,
      loading,
      colLayout,
      colLayout4,
      rules,
      form,
      customProcessList,
      checked,
      isCustomProcess,
      count,
      showScopeModal,
      parentItem,
      receptUserCallback,
      customProcessWayChange,
      addCustomProcess,
      removeCustomProcess,
      openDelegationScopeModal,
      sendSelectedFlow,
      saveForm,
      closeModal,
      getNowDate
    };
  }
});
