// import Vue from 'vue';
/**
 * Creates a XHR request
 *
 * @param {Object} options
 */
export const createRequest = options => {
  // const microToken = Vue.prototype.$getMicroToken();
  const microToken = '';
  const xhr = new XMLHttpRequest();
  xhr.open(options.method || 'GET', options.url);
  xhr.responseType = 'json';
  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key]);
    });
  }
  if (microToken) {
    xhr.setRequestHeader('x-kong-api-key', 'bearer ' + microToken);
  }
  return xhr;
};

/**
 * Sends a XHR request with certain body
 *
 * @param {XMLHttpRequest} xhr
 * @param {Object} body
 */
export const sendRequest = (xhr, body) => {
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response;
        try {
          response = JSON.parse(xhr.response);
        } catch (err) {
          response = xhr.response;
        }
        resolve(dispose(response));
      } else {
        reject(dispose(xhr.response));
      }
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.send(JSON.stringify(body));
  });
};

/**
 * Sends a XHR request with certain form data
 *
 * @param {XMLHttpRequest} xhr
 * @param {Object} data
 */
export const sendFormRequest = (xhr, data) => {
  const body = new FormData();
  for (const name in data) {
    body.append(name, data[name]);
  }

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response;
        try {
          response = JSON.parse(xhr.response);
        } catch (err) {
          response = xhr.response;
        }
        resolve(dispose(response));
      } else {
        reject(dispose(xhr.response));
      }
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.send(body);
  });
};

/**
 * Creates and sends XHR request
 *
 * @param {Object} options
 *
 * @returns Promise
 */
export default function (options) {
  const xhr = createRequest(options);

  return sendRequest(xhr, options.body);
}

//平台报文格式处理
const dispose = function (response) {
  const newData = {};
  if (response) {
    newData.code = response.retCode;
    if (response.retCode == 200) {
      newData.success = true;
    } else {
      newData.success = false;
    }
    newData.message = response.message;
    newData.data = response.responseBody;
    response = newData;
  } else {
    newData.code = 504;
    newData.success = false;
    newData.retCode = 504;
  }
  return response;
};
