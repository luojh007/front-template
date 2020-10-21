import axios from 'axios';
import objectAssign from 'object-assign';
import { clearCacheAll } from './storage';
const api = require('../../store/api');

// 序列化get请求参数
const formDataParams = data => {
  return Object.keys(data)
    .map(function (k) {
      let val = data[k];
      if (!val) {
        return encodeURIComponent(k) + '=';
      }
      return (
        encodeURIComponent(k) +
        '=' +
        encodeURIComponent(typeof val === 'string' ? val : JSON.stringify(val))
      );
    })
    .join('&');
};
export default function request(query) {
  let { url, data, method } = query;
  const options = {};
  const optionConfig = {
    withCredentials: true,
    responseType: 'json',
    data: {}
  };
  if (method === 'GET') {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    url += '?' + formDataParams(data);
  } else {
    options.data = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json'
    };
  }
  objectAssign(optionConfig, options);
  return axios(url, optionConfig)
    .then(response => {
      let res = response.data;
      if (
        res &&
        !res.success &&
        (res.errCode === 'LOGIN_IS_NOT' || res.errCode === 'LOGIN_NOT_EXIST')
      ) {
        checkIn();
      }
      if (res) {
        return res;
      } else if (response.request && response.request.responseText) {
        // ??兼容处理 ie9 后端返回的数据格式情况
        res = JSON.parse(response.request.responseText);
        if (
          res &&
          !res.success &&
          (res.errCode === 'LOGIN_IS_NOT' || res.errCode === 'LOGIN_NOT_EXIST')
        ) {
          checkIn();
        }
        return res;
      }
    })
    .catch(error => {
      //
      //checkIn(); // 登录状态已过期，请重新登录
    });
}

export function checkIn() {
  clearCacheAll();
  // window.location.href = `${apiConfig['loginPage']}`
}

export var run = request;
export var fetch = request;
