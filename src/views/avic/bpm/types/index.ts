export interface bpmProcessQueryForm {
  title: string;
  businessState: string;
  userId: string;
  deptId: string;
  startDateBegin: string;
  startDateEnd: string;
  type: string;
}

export interface deleGationQueryForm {
  receptUserId: string;
  receptDeptId: string;
  handEffectiveDateBegin: string;
  handEffectiveDateEnd: string;
  backDateBegin: string;
  backDateEnd: string;
  businessState: string;
}

export interface MyTrusteeshipQueryForm {
  workOwnerId: string;
  workOwnerDeptId: string;
  handEffectiveDateBegin: string;
  handEffectiveDateEnd: string;
  backDateBegin: string;
  backDateEnd: string;
  businessState: string;
}

export interface MyDraftQueryForm {
  title: string;
  businessState: string;
  startDateBegin: string;
  startDateEnd: string;
  type: string;
}

export interface TodoTaskQueryForm {
  taskTitle: string;
  priority: string;
  taskSendUser: string;
  taskSendDept: string;
  businessState: string;
  processStartTimeBegin: string;
  processStartTimeEnd: string;
  taskType: string;
  taskFinished: string;
}

export interface treeParams {
  nodeId: string;
  nodeType: string;
  procDefId?: string;
}

export interface params {
  nodeId: string;
  nodeType: string;
  procDefId?: string;
}

export interface batchHandleParams {
  entryIds: string;
  executionIds: string;
  taskIds: string;
}
