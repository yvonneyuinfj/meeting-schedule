import type { FamInventoryChangeDto } from '@/api/avic/mms/fam/FamInventoryChangeApi'; // 引入模块DTO
import {
    getFamInventoryChange, otherSaveFamInventoryChange,
    saveFamInventoryChange,
    saveFormAndStartProcess
} from '@/api/avic/mms/fam/FamInventoryChangeApi'; // 引入模块API
import {
    closeFlowLoading,
    getFieldAuth,
    getFieldDisabled,
    getFieldRequired,
    getFieldVisible,
    openFlowDetail,
    startFlowByFormCode
} from '@/views/avic/bpm/bpmutils/FlowUtils.js';

export const emits = ['reloadData', 'close'];

export function useFamInventoryChangeForm({ props: props, emit: emit }) {
    const { proxy } = getCurrentInstance();
    const form = ref<FamInventoryChangeDto>({});
    const formRef = ref(null);
    const formCode = 'FamInventoryChange';
    const openType = ref('add'); // 流程表单的打开方式，add: 流程中心打开, edit: 待办打开
    const bpmParams = ref<any>({}); // 存储来自prop或者url的参数信息
    const bpmButtonParams = ref<any>({}); // 提交按钮传递的参数
    const bpmResult = ref(null); // 表单驱动方式启动流程的流程数据
    const rules: Record<string, Rule[]> = {};
    const famInventoryChangeListEdit = ref();
    const layout = {
        labelCol: { flex: '140px' },
        wrapperCol: { flex: '1' }
    };
    const colLayout = proxy.$colLayout4; // 调用布局公共方法
    const loading = ref(false);
    const secretLevelList = ref([]); // 数据密级通用代码
    const assetsStatusList = ref([]); // 资产状态通用代码
    const ynMilitaryKeyEquipList = ref([]); // 是否军工关键设备通用代码
    const importedOrNotList = ref([]); // 是否为进口设备通用代码
    const assetTypeList = ref([]); // 资产分类通用代码
    const autoCode = ref(null); // 自动编码ref
    const assetSecretLevelList = ref([]);
    const lookupParams = [
        { fieldName: 'assetsStatus', lookUpType: 'FAM_ASSETS_STATUS' },
        { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
        { fieldName: 'importedOrNot', lookUpType: 'PLATFORM_YES_NO_FLAG' },
        { fieldName: 'assetType', lookUpType: 'FAM_ASSET_TYPE' },
        { fieldName: 'assetSecretLevel', lookUpType: 'FAM_SECRET_LEVEL' }
    ];
    const authJson = ref(null);
    // const formDisable: Map<string, boolean> = new Map();
    const formDisable = reactive({});
    const bodyStyle = {
        height: '400px',
        overflow: 'hidden',
        overflowY: 'scroll'
    };
    const formList = ['assetsStatus', 'assetsUse', 'entryDate', 'assetOriginalValue', 'depreciationValue', 'depreciationWay', 'assetNum', 'useTime', 'assetNetValue', 'monDepreciation', 'storageLocation', 'deptName', 'managerDeptId', 'responseUserId', 'firstDepreciationValue', 'monthProposed', 'brandModel', 'purchaseDate', 'currentYearDepreciation', 'newaCurrentmProvision', 'other', 'resetVoucherNo', 'productionNo', 'voucherNo', 'factoryOwner', 'buildProject', 'brand', 'ownershipCertNo', 'procureOrderNo', 'assetSecretLevel', 'ynMilitaryKeyEquip', 'receiveDeptId', 'assetClass', 'fundSource', 'projectName', 'handlePersonId', 'assetSpec', 'assetModel', 'assetUnit', 'invoiceNo', 'productionDate', 'importedOrNot', 'assetType', 'warrantyPeriod', 'changeReason', 'installLocation'];

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
        switch (proxy.$getLoginUser().entityDeptCode) {
            case 'C150':
            case 'C410':
            case 'A220':
            case 'A140':
            case 'C450':
            case 'C310':
            case 'C350':
                formList.forEach((value) => {
                    // formDisable.set(value, false);
                    formDisable[value] = false;
                });
                break;
            default :
                formList.forEach((value) => {
                    if (value === 'responseUserId' || value === 'storageLocation') {
                        // formDisable.set(value, false);
                        formDisable[value] = false;
                    } else {
                        // formDisable.set(value, true);
                        formDisable[value] = true;
                    }
                });
                break;
        }
        // 加载查询区所需通用代码
        getLookupList();
        // 获取当前用户对应的文档密级
        getUserFileSecretList();
        if (props.formId || form.value.id) {
            // 编辑详情页面加载数据
            getFormData(props.formId || form.value.id);
        } else {
            // 添加表单的初始值
            initForm();
        }
    });

    /** 获取通用代码  */
    function getLookupList() {
        proxy.$getLookupByType(lookupParams, result => {
            assetsStatusList.value = result.assetsStatus;
            ynMilitaryKeyEquipList.value = result.ynMilitaryKeyEquip;
            importedOrNotList.value = result.importedOrNot;
            assetTypeList.value = result.assetType;
            assetSecretLevelList.value = result.assetSecretLevel;
        });
    }

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
        getFamInventoryChange(id)
            .then(async res => {
                if (res.data) {
                    form.value = res.data;
                    // 处理数据
                    loading.value = false;
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
                famInventoryChangeListEdit.value
                    .validate(async validate => {
                        if (!validate) {
                            return;
                        }
                        loading.value = true;
                        const postData = proxy.$lodash.cloneDeep(form.value);
                        const subInfoList = famInventoryChangeListEdit.value.getChangedData(); // 获取子表数据
                        // 处理数据
                        postData.famInventoryChangeListList = subInfoList; // 挂载子表数据
                        // 发送请求
                        saveFamInventoryChange(postData)
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
                            .catch(() => {
                                loading.value = false;
                            });
                    })
                    .catch(error => {
                        loading.value = false;
                    });
            })
            .catch(error => {
                // 定位校验失败元素
                proxy.$scrollToFirstErrorField(formRef, error);
            });
    }

    /** 保存 */
    function otherSaveForm(params) {
        formRef.value
            .validate()
            .then(async () => {
                if (famInventoryChangeListEdit.value.getChangedData().length == 0) {
                    proxy.$message.warning('请添加需要变更的台账数据！');
                    return;
                }
                famInventoryChangeListEdit.value
                    .validate(async validate => {
                        if (!validate) {
                            return;
                        }
                        loading.value = true;
                        const postData = proxy.$lodash.cloneDeep(form.value);
                        const subInfoList = famInventoryChangeListEdit.value.getChangedData(); // 获取子表数据
                        // 处理数据
                        postData.famInventoryChangeListList = subInfoList; // 挂载子表数据
                        if (autoCode.value) {
                            // 获取编码码段值
                            postData.changeApplyNo = autoCode.value.getSegmentValue();
                        }

                        // 发送请求
                        otherSaveFamInventoryChange(postData).then(res => {
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
                        }).catch(() => {
                            loading.value = false;
                        });
                    }).catch(error => {
                    loading.value = false;
                });
            }).catch(error => {
            // 定位校验失败元素
            proxy.$scrollToFirstErrorField(formRef, error);
        });
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
                famInventoryChangeListEdit.value
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
                        console.log('error', error);
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
            const subInfoList = famInventoryChangeListEdit.value.getChangedData(); // 获取子表数据
            if (subInfoList.length == 0) {
                proxy.$message.warning('请添加需变更的台账数据！');
                return;
            }
            loading.value = true;
            // 处理数据
            const postData = proxy.$lodash.cloneDeep(form.value);
            postData.famInventoryChangeListList = subInfoList; // 挂载子表数据
            if (autoCode.value) {
                // 获取编码码段值
                postData.changeApplyNo = autoCode.value.getSegmentValue();
            }

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
                .catch(() => {
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

    return {
        form,
        formRef,
        bpmParams,
        rules,
        layout,
        autoCode,
        colLayout,
        loading,
        secretLevelList,
        assetsStatusList,
        ynMilitaryKeyEquipList,
        importedOrNotList,
        assetTypeList,
        bodyStyle,
        formDisable,
        saveForm,
        otherSaveForm,
        saveAndStartProcess,
        closeModal,
        fieldVisible,
        assetSecretLevelList,
        fieldDisabled,
        fieldRequired,
        beforeClickBpmButtons,
        afterClickBpmButtons,
        famInventoryChangeListEdit,
        formList
    };
}
