// import { Lang } from '@antv/x6';

function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}
function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}
function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]';
}
function getBaseConfig(node) {
  let { shape, tooltip, x, y, size, id, position, data, form, initialization, component, attrs } =
    node;

  let _width,
    _height,
    _x = x,
    _y = y,
    _form = form,
    _shape = shape,
    _tooltip = tooltip,
    _nodeType = component;
  if (data && data.nodeType) {
    _nodeType = data.nodeType;
  }
  if (size) {
    // x6
    // if (Lang.isObject(size)) {
    //   _width = size.width;
    //   _height = size.height;
    // }

    // x6
    if (isObject(size)) {
      _width = size.width;
      _height = size.height;
    }
  }
  // if (Lang.isObject(position)) {
  //   _x = position.x;
  //   _y = position.y;
  // }

  if (isObject(position)) {
    _x = position.x;
    _y = position.y;
  }

  return {
    type: _shape,
    label: _tooltip,
    x: _x,
    y: _y,
    width: _width,
    height: _height,
    id,
    component: _nodeType,
    data: {
      nodeType: _nodeType,
      initialization,
      tooltip: _tooltip,
      ..._form,
      ...data
    },
    attrs
  };
}

function getVueNode(node, comp) {
  const { x, y, id, data, attrs } = getBaseConfig(node);
  const isText = ['text'].includes(comp);

  let width = node.size.width,
    height = node.size.height < 68 ? 68 : node.size.height;

  if (['text'].includes(comp)) {
    if (node.size) {
      width = node.size.width;
      height = node.size.height;
    } else {
      width = 120;
      height = 40;
    }
  }
  const portAttr = {
    circle: {
      dataClass: 'choice-point',
      r: 6,
      magnet: true,
      stroke: '#5b8ffa',
      strokeWidth: 1,
      fill: '#fff'
    }
  };
  const mormalNodePorts = {
    groups: {
      port_t: {
        attrs: portAttr,
        position: {
          name: 'ellipseSpread',
          args: {
            start: 0
          }
        }
      },
      port_r: {
        attrs: portAttr,
        position: {
          name: 'ellipseSpread',
          args: {
            start: 90,
            dy: -10
          }
        }
      },
      port_b: {
        attrs: portAttr,
        position: {
          name: 'ellipseSpread',
          args: {
            start: 180,
            dy: -20
          }
        }
      },
      port_l: {
        attrs: portAttr,
        position: {
          name: 'ellipseSpread',
          args: {
            start: 270,
            dy: -10
          }
        }
      }
    },
    items: [
      { group: 'port_t', id: 'p_top' },
      { group: 'port_r', id: 'p_right' },
      { group: 'port_b', id: 'p_bottom' },
      { group: 'port_l', id: 'p_left' }
    ]
  };
  return {
    id,
    shape: comp,
    x,
    y,
    width: width,
    height: height,
    zIndex: 100,
    data,
    component: comp,
    ports: isText ? {} : mormalNodePorts,
    attrs
  };
}

function getEdgeDeriction(edgePortToNode = 'p_top') {
  return edgePortToNode?.substring(2);
}

function getEdgeNode(edge) {
  let edegStatu = {},
    edegAttrs = {};

  if (edge.data.edegStatus && edge.data.edegStatus == 'norun') {
    edegStatu = {
      stroke: '#6a6a6a'
    };
  }

  // 退回、拿回、跳转的流转线
  if (edge.data.edegStatus && edge.data.edegStatus == 'jump') {
    edegStatu = {
      stroke: '#ff0000'
    };
  }

  edge.router = {
    name: 'manhattan',
    args: {
      startDirections: [getEdgeDeriction(edge.source.port)],
      endDirections: [getEdgeDeriction(edge.target.port)]
    }
  };

  // edegAttrs = updateEdgeView(edge)
  // console.log('getEdgeNode edge = ',edge)
  return {
    zIndex: -1,
    attrs: {
      line: {
        stroke: '#1890ff',
        strokeWidth: 1,
        targetMarker: {
          name: 'block',
          args: {
            size: '6'
          }
        },
        strokeDasharray: 0, //虚线
        style: {
          animation: 'ant-line 30s infinite linear'
        },
        ...edegStatu
      }
    },
    ...edge,
    ...edegAttrs
  };
}

/**
 * 冻结画布
 */
function freezeGraph(graph) {
  const cells = graph.getCells();
  if (cells.length) {
    cells.forEach(cell => {
      cell.removeTools();
      cell.setData({ disableMove: true });
    });
  }
  // 移除连接桩子会导致 边 移除
  // const nodes = graph.getNodes()
  // for (const node of nodes) {
  //     // 禁用所有连接桩
  //     node.removePorts()
  // }
  // graph.freeze()
  // // 单选框
  //   .disableSelection()
  // // 多选框
  //   .disableMultipleSelection()
  // // 清空选区
  //   .cleanSelection()
  // // 剪切板
  //   .disableClipboard()
  // // 历史记录
  //   .disableHistory()
  // // 对齐线
  //   .disableSnapline()
  // // 快捷键
  //   .disableKeyboard();
}

/**
 * 解冻
 */
function unfreezeGraph(graph) {
  const cells = graph.getCells();
  if (cells.length) {
    cells.forEach(cell => {
      cell.setData({ disableMove: false });
    });
  }
  // graph.unfreeze()
  //   .enableSelection()
  //   .enableMultipleSelection()
  //   .enableClipboard()
  //   .enableHistory()
  //   .enableSnapline()
  //   .enableKeyboard();
}

/**json格式化 */
function fmtJSON(target) {
  // try {
  //   if (Lang.isString(target)) return JSON.parse(target);
  //   if (Lang.isArray(target)) return target.map((item) => {
  //     if (Lang.isObject(item)) return item;
  //     return JSON.parse(item);
  //   });
  //   else if (Lang.isObject(target)) return target;
  //   else {
  //     return false;
  //   }
  // } catch (error) {
  //   return {};
  // }

  try {
    if (isString(target)) return JSON.parse(target);
    if (isArray(target))
      return target.map(item => {
        if (isObject(item)) return item;
        return JSON.parse(item);
      });
    else if (isObject(target)) return target;
    else {
      return false;
    }
  } catch (error) {
    return {};
  }
}

function getNodeJSON(nodes) {
  const nodeList = [];
  for (const node of nodes) {
    const nodeJSON = fmtJSON(node);
    const nodeType = nodeJSON.component;
    if (!nodeType) {
      return;
    }
    nodeList.push(getVueNode(nodeJSON, nodeType));
  }
  return nodeList;
}

function getEdgeJSON(edges) {
  const edgeList = [];
  for (const edge of edges) {
    const edgeJSON = fmtJSON(edge);
    edgeList.push(getEdgeNode(edgeJSON));
  }
  return edgeList;
}

/**
 * 反序列化
 * 按照指定的 JSON 数据渲染节点和边。
 */
function fromJSON(graph, nodes, edges) {
  // if (!Lang.isArray(nodes) || !Lang.isArray(edges)) {
  //   return;
  // }

  if (!isArray(nodes) || !isArray(edges)) {
    return;
  }

  graph.fromJSON({
    nodes: getNodeJSON(nodes),
    edges: getEdgeJSON(edges)
  });
}

export const onlyLook = (bool, graph) => {
  if (!graph) return;
  if (bool) freezeGraph(graph);
  else unfreezeGraph(graph);
};

export const initDefaultData = (nodes, edges, graph) => {
  if (!graph) return;
  fromJSON(graph, nodes, edges);
};

// 初始化内部nodeArr属性
export const fixFireFox = nodeArrs => {
  if (!nodeArrs) return;

  // 修复火狐时的一些阴间问题
  if (navigator.userAgent.indexOf('Firefox') > 0) {
    // console.log('navigator.userAgent = ',navigator.userAgent)

    for (const node of nodeArrs) {
      document.querySelector(`[data-cell-id="${node.id}"]`).style.display = 'none';
    }

    setTimeout(() => {
      for (const node of nodeArrs) {
        document.querySelector(`[data-cell-id="${node.id}"]`).style.display = 'block';
      }
    }, 0);
  }
};
