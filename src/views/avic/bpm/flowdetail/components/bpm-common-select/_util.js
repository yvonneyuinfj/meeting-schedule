import { uuid } from '@/utils/common-util';
/**
 * 判断是否自动选人
 * @param {*} event
 */
export function isAutoSelectUser(event) {
  if (
    event == 'doretreattodraft' ||
    event == 'doretreattoprev' ||
    event == 'dowithdraw' ||
    event == 'doretreattowant' ||
    event == 'doretreattoactivity'
  ) {
    return true;
  }
  return false;
}

//设置用户 页签数据
export function setUserList(list, treecheckable = true) {
  let userList = [];
  if (list) {
    list.map(user => {
      userList.push({
        key: user.id,
        attributes: {
          deptId: user.deptId,
          deptName: user.deptName,
          nodeType: 'user'
        },
        nodeType: 'user',
        title: user.name,
        deptId: user.deptId,
        deptName: user.deptName,
        givenName: user.givenName,
        isLeaf: true,
        children: null,
        id: user.id,
        name: user.name,
        orderBy: user.orderBy,
        disableCheckbox: false,
        disabled: false,
        checked: false
      });
    });
  }
  return userList;
}
export function processNodes(list) {
  let nodeList = [];
  if (list) {
    list.forEach(user => {
      let newUser = {
        ...user,
        disableCheckbox: false,
        disabled: false,
        checked: false
      };
      // 主要解决群组选择时如果多个群组中存在相同用户，导致树的key重复，滚动时报错
      newUser.key = newUser.key + uuid(32);
      if (user.children && user.children.length > 0) {
        newUser.children = processNodes(newUser.children);
      }
      nodeList.push(newUser);
    });
  }
  return nodeList;
}
