import type { TpmOeeDto } from '@/api/avic/mms/tpm/TpmOeeApi'; // 引入模块DTO
import { getTpmOee, saveTpmOee } from '@/api/avic/mms/tpm/TpmOeeApi'; // 引入模块API
import dayjs from 'dayjs';

export const emits = ['reloadData', 'close'];

export function useTpmOeeForm({
    props: props,
    emit: emit
}) {
    const { proxy } = getCurrentInstance();
    const form = ref<TpmOeeDto>({});
    const formRef = ref(null);
    const rules: Record<string, Rule[]> = {
        reportDate: [
            { required: true, message: '申报月份不能为空', trigger: 'change' }
        ],
        reportDeptId: [
            { required: true, message: '申报部门不能为空', trigger: 'change' }
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
        } else {
            form.value.applyDate = dayjs(new Date());
            form.value.applyUserId = proxy.$getLoginUser().id;
            form.value.applyUserName = proxy.$getLoginUser().name;
            form.value.reportDeptId = proxy.$getLoginUser().entityDeptId;
            form.value.reportDeptIdAlias = proxy.$getLoginUser().entityDeptName;
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
        getTpmOee(id)
            .then(async (res) => {
                if (res.success) {
                    form.value = res.data;
                    // 处理数据
                    loading.value = false;
                    const reportDate = form.value.reportDate.toString();
                    form.value.reportDate = dayjs(reportDate).format('YYYY-MM');
                }
            })
            .catch((error) => {
                proxy.$message.warning(error.message);
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
                const reportDate = dayjs(form.value.reportDate);
                form.value.reportDate = dayjs().year(reportDate.year()).month(reportDate.month()).endOf('month').format('YYYY-MM-DD');
                const postData = proxy.$lodash.cloneDeep(form.value);
                saveTpmOee(postData)
                    .then(res => {
                        if (res.success) {
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

