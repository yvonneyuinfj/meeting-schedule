/**
 * 展开所有节点
 * @param {Object} nodes
 * @param {Object} expandedRowKeys
 */
export function getAllExpandedKeys(nodes, expandedRowKeys) {
  getExpandedKeys(nodes, 10, expandedRowKeys);
}

/**
 * 根据层级获取展开的key集合
 * @param {Object} nodes
 * @param {Object} expandLevel
 * @param {Object} expandedRowKeys 记录展开key
 */
export function getExpandedKeys(nodes, expandLevel, expandedRowKeys) {
  if (!nodes) {
    return;
  }
  if (expandLevel > 1) {
    // 最后一层不展开
    nodes.forEach(node => {
      if (expandedRowKeys.length == 0 || expandedRowKeys.filter(id => id == node.id).length <= 0) {
        expandedRowKeys.push(node.id);
      }
      expandLevel = expandLevel - 1;
      if (node.children) {
        return getExpandedKeys(node.children, expandLevel, expandedRowKeys);
      }
    });
  }
}

/**
 * 动态设置树插槽，这部分代码最终放入后台java代码设置插槽
 * @param {Object} nodes
 * @param {Object} scopedSlots
 */
const scopedSlots = { title: 'title', icon: 'icon', switcherIcon: 'switcherIcon' };
export function setNodeSlots(nodes) {
  if (!nodes) {
    return;
  }
  // 最后一层不展开
  nodes.forEach(node => {
    node.scopedSlots = { ...node.scopedSlots, ...scopedSlots };
    if (node.children) {
      setNodeSlots(node.children);
    }
  });
}

/**
 * 前端代码移除指定节点
 * @param {Object} currentSelectedNode
 */
export function deleteNode(currentSelectedNode) {
  const parentDataRef = currentSelectedNode.parent.node;
  // 判断是否是顶层
  const children = parentDataRef.children;
  const currentDataRef = currentSelectedNode.dataRef;
  const index = children.indexOf(currentDataRef);
  children.splice(index, 1);
  if (children.length == 0) {
    //删除节点后如果没有子节点后将父节点置为叶子节点
    parentDataRef.isLeaf = true;
  }
  return parentDataRef;
}

/**
 * 添加下级节点
 * @param {Object} currentSelectedNode
 * @param {Object} data
 * @param {Object} expandedKeys
 */
export function addSubNode(currentSelectedNode, data, expandedKeys) {
  const dataRef = currentSelectedNode.dataRef;
  setNodeSlots([data]); //为增加节点设置插槽
  if (dataRef.isLeaf) {
    //叶子节点
    dataRef.children = [];
    dataRef.isLeaf = false;
    dataRef.children.push(data);
    expandedKeys.push(dataRef.id);
  } else {
    //非叶子节点
    //需要展开节点定位新增加节点
    expandedKeys.push(dataRef.id);
    if (dataRef.children) {
      //有子节点数据，说明节点已加载数据
      dataRef.children.push(data);
    }
  }
}

/**
 * 添加同级节点方法
 * @param {Object} currentSelectedNode
 * @param {Object} data
 */
export function addSameNode(currentSelectedNode, data) {
  setNodeSlots([data]); //为增加节点设置插槽
  const currentParentNode = currentSelectedNode.parent.node;
  eventAddSame(data, currentParentNode);
}

function eventAddSame(data, currentParentNode) {
  // 查找父级
  const dataRef = currentParentNode;
  if (!dataRef.children) {
    dataRef.children = [];
  }
  dataRef.children.push(data);
}

/**
 * 展开并挂载子节点集合
 * @param treeData
 * @param id
 * @param cList
 * @constructor
 */
export function expendNodeForTreegrid(treeData, id, cList) {
  treeData.map(item => {
    if (item.id === id) {
      item.children = cList;
      return;
    } else if (item.children && item.children.length) {
      expendNodeForTreegrid(item.children, id, cList);
    }
  });
}

/**
 * 获取所有节点key
 * @param treeData
 * @param id
 * @param cList
 * @constructor
 */
export function getAllNodeForTreegrid(treeData, rowKey) {
  if (rowKey == undefined) {
    rowKey = 'id';
  }
  let nodeKeys = [];
  if (treeData.length) {
    treeData.map(item => {
      if (item.children && item.children.length) {
        nodeKeys.push(item[rowKey]);
        nodeKeys = nodeKeys.concat(getAllNodeForTreegrid(item.children, rowKey));
      }
    });
  }
  return nodeKeys;
}

/**
 * 根据字段获取节点
 * @param treeData
 * @param fieldName
 * @param fieldValue
 * @returns {*[]}
 */
export function findNodeForTreegrid(treeData, fieldName, fieldValue) {
  if (!treeData || !treeData.length) {
    return [];
  }
  const result = [];
  treeData.map(row => {
    if (row[fieldName] === fieldValue) {
      result.push(row);
    }
    if (row.children && row.children.length) {
      result.push(...findNodeForTreegrid(row.children, fieldName, fieldValue));
    }
  });
  return result;
}

/**
 * 前端代码移除指定节点（treeGrid）
 * @param treeData
 * @param treeNode
 */
export function deleteNodeForTreegrid(treeData, treeNode) {
  //递归删除下一层
  for (let i = 0; i < treeData.length; i++) {
    //匹配treePath路径一致的节点
    if (treeNode.treePath.indexOf(treeData[i].id) != -1) {
      //过滤节点children
      if (treeData[i].treeLevel == treeNode.treeLevel - 1) {
        treeData[i].children = treeData[i].children.filter(item => item.id !== treeNode.id);
        if (treeData[i].children.length == 0) {
          treeData[i].treeLeaf = 'Y';
        }
        break;
      } else {
        //如果节点children不为空，继续递归
        if (treeData[i].children && treeData[i].children.length > 0) {
          deleteNodeForTreegrid(treeData[i].children, treeNode);
        } else {
          continue;
        }
      }
    }
  }
}
