import type { TpmIntactRatioMtbfMttrDto } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi'; // 引入模块DTO
import {
    getTpmIntactRatioMtbfMttr,
    saveTpmIntactRatioMtbfMttr,
    saveFormAndStartProcess,
    checkEquipmentIntegrityRateUnique
} from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi'; // 引入模块API
import {
    startFlowByFormCode,
    closeFlowLoading,
    openFlowDetail,
    getFieldAuth,
    getFieldVisible,
    getFieldDisabled,
    getFieldRequired
} from '@/views/avic/bpm/bpmutils/FlowUtils.js';
import { useUserStore } from '@/store/user';
import dayjs from 'dayjs';

export const emits = ['reloadData', 'close'];

export function useTpmIntactRatioMtbfMttrForm({ props: props, emit: emit }) {
    const { proxy } = getCurrentInstance();
    const form = ref<TpmIntactRatioMtbfMttrDto>({});
    const formRef = ref(null);
    const formCode = 'TpmIntactRatioMtbfMttr';
    const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
    const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
    const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
    const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
    const rules: Record<string, Rule[]> = {
        reportDate: [
            { required: true, message: '申报月份不能为空', trigger: 'change' },
            { validator: (rule, value) => validateEquipmentIntegrityRateUnique(rule, value), trigger: 'blur' }
        ],
        reportDeptId: [
            { required: true, message: '填报部门不能为空', trigger: 'change' }
        ],
        applyUserId: [
            { required: true, message: '填报人不能为空', trigger: 'change' }
        ],
        applyDate: [
            { required: true, message: '填报日期不能为空', trigger: 'change' }
        ],
        secretLevel: [
            { required: true, message: '密级不能为空', trigger: 'change' }
        ]
    };
    const tpmIntactRatioMtbfMttrLEdit = ref();
    const layout = {
        labelCol: { flex: '140px' },
        wrapperCol: { flex: '1' }
    };
    const colLayout = proxy.$colLayout2; // 调用布局公共方法
    const loading = ref(false);
    const secretLevelList = ref([]); // 密级通用代码
    const authJson = ref(null);
    const userStore = useUserStore();

    if (props.params) {
        bpmParams.value = props.params;
    } else {
        if (proxy.$route) {
            bpmParams.value = proxy.$route.query;
        }
    }
    if (bpmParams) {
        //加载流程数据
        form.value.id = bpmParams.value.id;
        openType.value = bpmParams.value.id ? 'edit' : 'add';
    }

    onMounted(() => {
        // 获取当前用户对应的文档密级
        getUserFileSecretList();
        if (props.formId || form.value.id) {
            // 编辑详情页面加载数据
            getFormData(props.formId || form.value.id);
        } else {
            // 添加表单的初始值
            initForm();
            form.value.reportDeptId = userStore.userInfo.deptId;
            form.value.reportDeptName = userStore.userInfo.deptName;
            form.value.applyUserId = userStore.userInfo.id;
            form.value.applyUserName = userStore.userInfo.name;
            form.value.applyDate = dayjs(new Date());
        }
    });

    /** 获取当前用户对应的文档密级 */
    function getUserFileSecretList() {
        proxy.$getUserFileSecretLevelList(result => {
            secretLevelList.value = result;
        });
    }

    /**
     * 编辑详情页面加载数据
     * @param {String} id 行数据的id
     */
    function getFormData(id) {
        if (!id) {
            return;
        }
        loading.value = true;
        getTpmIntactRatioMtbfMttr(id)
            .then(async res => {
                if (res.data) {
                    form.value = res.data;
                    // 处理数据
                    loading.value = false;
                    const reportDate = new Date(form.value.reportDate).toString();
                    form.value.reportDate = dayjs(reportDate).format('YYYY-MM');
                } else {
                    initForm();
                    loading.value = false;
                }
            })
            .catch(() => {
                proxy.$message.warning('获取表单数据失败！');
                loading.value = false;
            });
    }

    /** 保存 */
    function saveForm(params) {
        formRef.value
            .validate()
            .then(async () => {
                tpmIntactRatioMtbfMttrLEdit.value
                    .validate(async validate => {
                        if (!validate) {
                            return;
                        }
                        loading.value = true;
                        //const reportDate = dayjs(form.value.reportDate);
                        //form.value.reportDate = dayjs().year(reportDate.year()).month(reportDate.month()).endOf('month').format('YYYY-MM-DD');
                        const postData = proxy.$lodash.cloneDeep(form.value);
                        const subInfoList = tpmIntactRatioMtbfMttrLEdit.value.getChangedData(); // 获取子表数据
                        // 处理数据
                        postData.tpmIntactRatioMtbfMttrLList = subInfoList; // 挂载子表数据
                        // 发送请求
                        saveTpmIntactRatioMtbfMttr(postData)
                            .then(res => {
                                if (res.success) {
                                    if (props.bpmInstanceObject) {
                                        bpmButtonParams.value = { params, result: res.data };
                                    }
                                    if (!form.value.id) {
                                        form.value.id = res.data;
                                    }
                                    successCallback();
                                } else {
                                    loading.value = false;
                                }
                            })
                            .catch((error) => {
                                proxy.$message.warning(error.message);
                                loading.value = false;
                            });
                    })
                    .catch(error => {
                        proxy.$message.warning(error.message);
                        loading.value = false;
                    });
            })
            .catch(error => {
                // 定位校验失败元素
                proxy.$scrollToFirstErrorField(formRef, error);
            });
    }
    /** 保存主表*/
    function saveFormMain(params) {
        formRef.value
            .validate()
            .then(() => {
                loading.value = true;
                const postData = proxy.$lodash.cloneDeep(form.value);
                // 处理数据
                // 发送请求
                saveTpmIntactRatioMtbfMttr(postData)
                    .then(res => {
                        if (res.success) {
                            if (props.bpmInstanceObject) {
                                bpmButtonParams.value = { params, result: res.data };
                            }
                            if (!form.value.id) {
                                form.value.id = res.data;
                            }
                            successCallback();
                        } else {
                            loading.value = false;
                        }
                    })
                    .catch((error) => {
                        proxy.$message.warning(error.message);
                        loading.value = false;
                    });
            })

    }

    /** 设置添加表单的初始值 */
    function initForm() {
        // 初始化光标定位
        nextTick(() => {
            closeFlowLoading(props.bpmInstanceObject);
        });
    }

    /** 校验通过后，读取要启动的流程模板 */
    function getBpmDefine() {
        formRef.value
            .validate()
            .then(() => {
                tpmIntactRatioMtbfMttrLEdit.value
                    .validate(validate => {
                        if (!validate) {
                            return;
                        }
                        startFlowByFormCode({
                            formCode: formCode,
                            callback: bpmDefinedInfo => {
                                saveAndStartProcess(bpmDefinedInfo);
                            }
                        });
                    })
                    .catch(error => {
                        proxy.$message.warning(error);
                    });
            })
            .catch(error => {
                if (props.bpmInstanceObject) {
                    closeFlowLoading(props.bpmInstanceObject);
                }
                // 定位校验失败元素
                proxy.$scrollToFirstErrorField(formRef, error);
            });
    }

    /** 保存并启动流程 */
    async function saveAndStartProcess(params) {
        // 点击保存并启动流程按钮触发
        if (!props.bpmInstanceObject && !params.dbid) {
            // 校验表单并选择需要启动的流程模板
            getBpmDefine();
        } else {
            const subInfoList = tpmIntactRatioMtbfMttrLEdit.value.getChangedData(); // 获取子表数据
            const subList = tpmIntactRatioMtbfMttrLEdit.value.getListData();
            if (subList.length === 0) {
                proxy.$message.success('请添加子表数据后提交流程');
                return;
            }
            loading.value = true;
            // 处理数据
            const reportDate = dayjs(form.value.reportDate);
            form.value.reportDate = dayjs().year(reportDate.year()).month(reportDate.month()).endOf('month').format('YYYY-MM-DD');
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.tpmIntactRatioMtbfMttrLList = subInfoList; // 挂载子表数据
            const param = {
                processDefId: params.dbid || bpmParams.value.defineId,
                formCode: formCode,
                postData
            };
            // 发送请求
            saveFormAndStartProcess(param)
                .then(res => {
                    if (res.success) {
                        if (props.bpmInstanceObject) {
                            bpmButtonParams.value = { params, result: res.data };
                        }
                        bpmResult.value = res.data;
                        if (!form.value.id) {
                            form.value.id = res.data.formId;
                        }
                        successCallback();
                    } else {
                        errorCallback();
                    }
                })
                .catch((error) => {
                    proxy.$message.warning(error.message);
                    errorCallback();
                });
        }
    }

    /** 保存、保存并启动流程处理成功后的逻辑 */
    function successCallback() {
        if (props.bpmInstanceObject) {
            closeFlowLoading(props.bpmInstanceObject);
            // 刷新表单版本
            getFormData(form.value.id);
            // 回调选人等流程按钮事件
            if (bpmButtonParams.value.params.callback) {
                bpmButtonParams.value.params.callback(bpmButtonParams.value.result);
                bpmButtonParams.value = {};
            }
        } else {
            // 添加页面-保存并启动流程后，打开流程详情页
            if (bpmResult.value) {
                openFlowDetail(bpmResult.value, props.bpmOperatorRefresh);
            }
            proxy.$message.success('保存成功！');
            emit('reloadData');
            emit('close');
        }
    }

    /** 数据保存失败的回调 */
    function errorCallback() {
        if (props.bpmInstanceObject) {
            closeFlowLoading(props.bpmInstanceObject);
        } else {
            loading.value = false;
            proxy.$message.error('保存失败！');
            emit('reloadData');
            emit('close');
        }
    }

    /** 返回关闭事件 */
    function closeModal() {
        emit('close');
    }

    /** 点击流程按钮的前置事件 */
    function beforeClickBpmButtons() {
        return new Promise(resolve => {
            resolve(true);
        });
    }

    /** 点击流程按钮的后置事件 */
    function afterClickBpmButtons() {
        return new Promise(resolve => {
            resolve(true);
        });
    }

    /** 表单字段是否显示 */
    function fieldVisible(fieldName) {
        checkAuthJson();
        return getFieldVisible(authJson.value, fieldName);
    }

    /** 表单字段是否可编辑 */
    function fieldDisabled(fieldName) {
        checkAuthJson();
        return getFieldDisabled(authJson.value, fieldName, props.bpmInstanceObject);
    }

    /** 表单字段是否显示 */
    function fieldRequired(fieldName) {
        checkAuthJson();
        return getFieldRequired(authJson.value, fieldName, rules, props.bpmInstanceObject);
    }

    function checkAuthJson() {
        if (authJson.value == null) {
            authJson.value = getFieldAuth(props.bpmInstanceObject);
        }
    }
    /** 异步校验申报月份唯一 */
    async function validateEquipmentIntegrityRateUnique(rule, value) {
        if (value) {
            const res = await checkEquipmentIntegrityRateUnique({
                id: props.formId || ''
            });
            if (res.success) {
                if (res.data) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('申报月份已存在!');
                }
            } else {
                return Promise.reject('申报月份唯一性校验失败!');
            }
        } else {
            return Promise.resolve();
        }
    }
    return {
        form,
        formRef,
        bpmParams,
        rules,
        layout,
        colLayout,
        loading,
        secretLevelList,
        saveForm,
        saveFormMain,
        saveAndStartProcess,
        closeModal,
        fieldVisible,
        fieldDisabled,
        fieldRequired,
        beforeClickBpmButtons,
        afterClickBpmButtons,
        tpmIntactRatioMtbfMttrLEdit
    };
}

