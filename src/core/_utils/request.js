import axios from 'axios';
import objectAssign from 'object-assign';
import { clearCacheAll } from './storage';
const api = require('../../store/api')
// const apiConfig = boz['api'][boz.env];
/** @发起请求
 * 支持请求方式： GET | POST | PUT | DELETE
 *
 * @param    {object}   query
 * 一）query 查询字段：
 * url
 * options
 *   method
 *   data
 * api
 *           
 * 二）api 定义接口类型：
 *   www_form_urlencoded_nurseTrainApi| mock_nurseTrainApi | nurseTrainApi
 *   
 * @returns  {Promise}  result
 *
 * @date     
 * @alias    request | fetch | run 
 * @author   galaxyw<galaxybing@gmail.com>
 */

export default function request(query) {

  let { url, options, api } = query;
  let headers = {};
  let params;
  let body = options.data;
  let cancel, optionConfig = {
    'withCredentials': true,
    'responseType': 'json',
    'data': {}
  };
  if (options) { // && options.method !== 'GET'
    if (!api || api.split('_')[0] === 'www' || api.split('_')[0] === 'mock') {
      params = typeof body == 'string' ? body : (typeof body == 'undefined' ? '' : Object.keys(body).map(function (k) {
        let val = body[k];
        if (!val) {
          return encodeURIComponent(k) + '='
        }
        return encodeURIComponent(k) + '=' + encodeURIComponent(typeof val === 'string' ? val : JSON.stringify(val))
      }).join('&'));
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

    } else { // 针对原有的老接口调用，使用的 Content-Type 消息头
      params = body;
      headers = {
        'Content-Type': 'application/json'
      };
    }

    // if((options.method=='GET' || options.method == 'PUT')&&params){
    //  后端接口如果未针对 PUT 请求传参作处理时，需要拼接传参形式
    if (options.method == 'GET' && params) {
      url += '?' + params;
    }
  } else {
    params = body
  }

  options.data = params;
  options.headers = headers;

  if (api && api.split('_')[0] === 'mock') {// 处理 mock 时 cookie 跨域问题
    options.withCredentials = false;
  }

  objectAssign(optionConfig, options);

  return axios(url, optionConfig)
    // .then((response) => response.data)
    .then((response) => {
      let res = response.data;

      if (res && !res.success && (res.errCode === 'LOGIN_IS_NOT' || res.errCode === 'LOGIN_NOT_EXIST')) {
        checkIn();
      }
      if (res) {
        return res;
      } else if (response.request && response.request.responseText) { // ??兼容处理 ie9 后端返回的数据格式情况
        res = JSON.parse(response.request.responseText);
        if (res && !res.success && (res.errCode === 'LOGIN_IS_NOT' || res.errCode === 'LOGIN_NOT_EXIST')) {
          checkIn();
        }
        return res;
      }

    })
    .catch((error) => {
      //
      //checkIn(); // 登录状态已过期，请重新登录
    });
}

export function checkIn() {
  clearCacheAll()
  // window.location.href = `${apiConfig['loginPage']}`
}

export var run = request;
export var fetch = request;
