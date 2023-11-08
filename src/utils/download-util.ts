import { notification, message } from 'ant-design-vue';
import { formateObjToParamStr } from './common-util';
import { useUserStore } from '@/store/user';
import { settings } from '@/settings';
export interface downloadParam {
  url: string;
  data: any;
  method: string;
  listenerProgress: any;
  fileName: string;
  isdownload: boolean;
  messageTime: any;
  callBack: any;
}
// API 请求的默认前缀
const baseURL = settings.axiosRequestConfig.baseURL;
/**
 * 文件下载
 * @param {*} url
 * @param {*} parameter 请求参数
 * @param {*} method  http请求类型
 * @param {*} listenerProgress 下载进度监听事件
 * @param {*} fileName  文件名，如果不传会到Content-disposition中filename取
 * @param {*} isdownload  是否下载
 * @param {*} messageTime  提示消息时间
 */
export function download({
  url,
  data: parameter = null,
  method = 'get',
  listenerProgress,
  fileName = '',
  isdownload = true,
  messageTime = 4,
  callBack
}) {
  const p = new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    //get 拼接url参数
    if (method == 'get' && parameter != null) {
      const params = formateObjToParamStr(parameter);
      if (params) {
        if (url.indexOf('?') != -1) {
          url += '&' + params;
        } else {
          url += '?' + params;
        }
      }
    }
    let newUrl = '';
    if (baseURL && baseURL == '/') {
      newUrl = url;
    } else {
      newUrl = (baseURL || '') + url;
    }
    xhr.open(method, newUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status == 200) {
        const blob = this.response;
        //获取文件名
        if (!fileName) {
          if (xhr.getResponseHeader('Content-disposition')) {
            const reg = new RegExp('(^|)filename=([^&]*)(&|$)');
            const r = xhr.getResponseHeader('Content-disposition').match(reg);
            fileName = decodeURIComponent(r[2]).replace(/%20/g, ' ');
          }
        }
        if (isdownload) {
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
        if (callBack) {
          callBack(true);
        }
        resolve(blob);
      } else {
        //下载失败处理提示
        let json = null;
        try {
          const res = this.response;
          const bal = new Blob([res]);
          const reader = new FileReader();
          reader.addEventListener('loadend', function () {
            try {
              json = JSON.parse(reader.result.toString());
            } catch (e) {
              json = { message: reader.result };
            }
            if (callBack) {
              callBack(false);
            }
            if (decodeURI(json.message).indexOf('不允许预览') > -1) {
              message.error('不允许预览当前附件！');
            } else {
              notification.error({
                message: '系统提示',
                description: json.message ? decodeURI(json.message) : '请求资源失败',
                duration: messageTime
              });
            }
          });
          reader.readAsBinaryString(bal);
        } catch (e) {
          notification.error({
            message: '系统提示',
            description: '请求资源失败',
            duration: messageTime
          });
        }
        reject();
      }
    };
    xhr.addEventListener('progress', function (evt) {
      if (evt.lengthComputable && listenerProgress) {
        const percentComplete = evt.loaded / evt.total;
        listenerProgress((percentComplete * 100).toFixed(2));
      }
    });
    const formData = new FormData();
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      xhr.setRequestHeader('X-Access-Token', token);
    }
    if (settings.appId) {
      xhr.setRequestHeader('X-App-Id', settings.appId);
    }
    //post 转换数据
    if (method == 'post') {
      if (typeof parameter === 'object') {
        Object.keys(parameter).forEach(key => {
          formData.append(key, parameter[key]);
        });
        xhr.send(formData);
      } else {
        // 电子表单修改
        xhr.send(parameter);
      }
    } else {
      xhr.send();
    }
  });
  return p;
}

export function downloadSysFile({
  url,
  data: parameter = null,
  method = 'get',
  listenerProgress,
  fileName = '',
  isdownload = true,
  messageTime = 4,
  callBack
}) {
  const p = new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    //get 拼接url参数
    if (method == 'get' && parameter != null) {
      const params = formateObjToParamStr(parameter);
      if (params) {
        if (url.indexOf('?') != -1) {
          url += '&' + params;
        } else {
          url += '?' + params;
        }
      }
    }
    let newUrl = '';
    if (baseURL && baseURL == '/') {
      newUrl = url;
    } else {
      newUrl = (baseURL || '') + url;
    }
    xhr.open(method, newUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status == 200) {
        const blob = this.response;
        //获取文件名
        if (!fileName) {
          if (xhr.getResponseHeader('Content-disposition')) {
            const reg = new RegExp('(^|)filename=([^&]*)(&|$)');
            const r = xhr.getResponseHeader('Content-disposition').match(reg);
            fileName = decodeURIComponent(r[2]).replace(/%20/g, ' ');
          }
        }
        if (isdownload) {
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
        if (callBack) {
          callBack(true);
        }
        resolve(blob);
      } else {
        //下载失败处理提示
        let json = null;
        try {
          const res = this.response;
          const bal = new Blob([res]);
          const reader = new FileReader();
          reader.addEventListener('loadend', function () {
            try {
              json = JSON.parse(reader.result.toString());
            } catch (e) {
              json = { message: reader.result };
            }
            if (callBack) {
              callBack(false);
            }
            if (decodeURI(json.message).indexOf('不允许预览') > -1) {
              message.error('不允许预览当前附件！');
            } else {
              notification.error({
                message: '系统提示',
                description: json.message ? decodeURI(json.message) : '请求资源失败',
                duration: messageTime
              });
            }
          });
          reader.readAsBinaryString(bal);
        } catch (e) {
          notification.error({
            message: '系统提示',
            description: '请求资源失败',
            duration: messageTime
          });
        }
        reject();
      }
    };
    xhr.addEventListener('progress', function (evt) {
      // console.log('download progress', evt);
      if (evt.lengthComputable && listenerProgress) {
        const percentComplete = evt.loaded / evt.total;
        listenerProgress((percentComplete * 100).toFixed(2));
      }
    });
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      xhr.setRequestHeader('X-Access-Token', token);
    }
    if (settings.appId) {
      xhr.setRequestHeader('X-App-Id', settings.appId);
    }
    //post 转换数据
    if (method == 'post') {
      // 电子表单修改
      xhr.send(JSON.stringify(parameter));
    } else {
      xhr.send();
    }
  });
  return p;
}

export function downloadFiles({
  url,
  data: parameter = null,
  method = 'get',
  listenerProgress,
  fileName = '',
  isdownload = true,
  messageTime = 4,
  callBack
}) {
  const p = new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    //get 拼接url参数
    if (method == 'get' && parameter != null) {
      const params = formateObjToParamStr(parameter);
      if (params) {
        if (url.indexOf('?') != -1) {
          url += '&' + params;
        } else {
          url += '?' + params;
        }
      }
    }
    let newUrl = '';
    if (baseURL && baseURL == '/') {
      newUrl = url;
    } else {
      newUrl = (baseURL || '') + url;
    }
    xhr.open(method, newUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status == 200) {
        const blob = this.response;
        //获取文件名
        if (!fileName) {
          if (xhr.getResponseHeader('Content-disposition')) {
            const reg = new RegExp('(^|)filename=([^&]*)(&|$)');
            const r = xhr.getResponseHeader('Content-disposition').match(reg);
            fileName = decodeURIComponent(r[2]).replace(/%20/g, ' ');
          }
        }
        if (isdownload) {
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
        if (callBack) {
          callBack(true);
        }
        resolve(blob);
      } else {
        //下载失败处理提示
        let json = null;
        try {
          const res = this.response;
          const bal = new Blob([res]);
          const reader = new FileReader();
          // 流程详情页批量下载加权限判断修改
          reader.readAsText(bal, 'utf-8');
          reader.addEventListener('loadend', function () {
            try {
              json = JSON.parse(reader.result.toString());
            } catch (e) {
              json = { message: reader.result };
            }
            if (callBack) {
              callBack(false);
            }
            if (decodeURI(json.message).indexOf('不允许预览') > -1) {
              message.error('不允许预览当前附件！');
            } else if (decodeURI(json.message).indexOf('不允许下载') > -1) {
              // 流程详情页批量下载加权限判断修改
              message.error(decodeURI(json.message));
            } else {
              notification.error({
                message: '系统提示',
                description: json.message ? decodeURI(json.message) : '请求资源失败',
                duration: messageTime
              });
            }
          });
        } catch (e) {
          notification.error({
            message: '系统提示',
            description: '请求资源失败',
            duration: messageTime
          });
        }
        reject();
      }
    };
    xhr.addEventListener('progress', function (evt) {
      if (evt.lengthComputable && listenerProgress) {
        const percentComplete = evt.loaded / evt.total;
        listenerProgress((percentComplete * 100).toFixed(2));
      }
    });
    const formData = new FormData();
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      xhr.setRequestHeader('X-Access-Token', token);
    }
    if (settings.appId) {
      xhr.setRequestHeader('X-App-Id', settings.appId);
    }
    //post 转换数据
    if (method == 'post') {
      if (typeof parameter === 'object') {
        Object.keys(parameter).forEach(key => {
          formData.append(key, parameter[key]);
        });
        xhr.send(formData);
      } else {
        // 电子表单修改
        xhr.send(parameter);
      }
    } else {
      xhr.send();
    }
  });
  return p;
}
