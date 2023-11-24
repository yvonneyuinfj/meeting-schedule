import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/tpm/tpmoeels';
/** OEE设备综合效率子表 */
export interface TpmOeeLDto extends BaseBeanModel {
  /** OEE设备综合效率主表ID */
  tpmOeeId?: string;
  /** 资产编号 */
  assetsCode?: string;
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 设备编号 */
  equipmentCode?: string;
  equipmentCodeAlias?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 试验任务/件号 */
  testMission?: string;
  /** 理论试验/加工时间 */
  theoreticalExperimentTime?: string;
  /** 总时间（h） */
  totalTime?: string;
  /** 计划停机时间（h） */
  planStopDurationTime?: string;
  /** 开动时间（h） */
  workDurationTime?: string;
  /** 空闲待工时间（h） */
  freeTime?: string;
  /** 准备调整时间（h） */
  adjustTime?: string;
  /** 故障停机时间（h） */
  stopDurationTime?: string;
  /** 故障停机次数 */
  stopDurationNumber?: string;
  /** 平均故障间隔时间MTBF(h) */
  mtbf?: string;
  /** 平均故障停机时间MTTR(h) */
  mttr?: string;
  /** 试验成功率/合格品率 */
  passRate?: string;
  /** OEE */
  oee?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listTpmOeeLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmOeeLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmOeeL (id: string): Promise<ResponseBaseData<TpmOeeLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmOeeL (form: TpmOeeLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmOeeL (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel (param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
