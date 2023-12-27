import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/mds/mdsreportconditions';

/** 报表打印临时表 */
export interface MdsReportConditionDto extends BaseBeanModel {
    /** 用户ID */
    sysUserId?: string;
    sysUserIdAlias?: string;
    /** 传递表ID */
    tableId?: string;
    /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
    secretLevel?: any;
    /** 传递表ID集合 */
    tableIdList?: [];
}

/** 获取分页数据 */
export function listMdsReportConditionByPage(
    param: QueryParamModel
): Promise<ResponsePageData<MdsReportConditionDto>> {
    return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsReportCondition(id: string): Promise<ResponseBaseData<MdsReportConditionDto>> {
    return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsReportCondition(form: MdsReportConditionDto): Promise<ResponseBaseData<any>> {
    return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsReportCondition(ids: [string]): Promise<ResponseBaseData<any>> {
    return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
    const download = {
        url: basePath + '/exportData/v1',
        data: param,
        method: 'post'
    } as downloadParam;
    return downloadSysFile(download);
}

export function createMdsReportConditionByUserId(form: MdsReportConditionDto): Promise<ResponseBaseData<any>> {
    return request.post(basePath + '/createMdsReportConditionByUserId/v1', form);
}
