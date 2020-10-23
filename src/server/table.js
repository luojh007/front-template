import request from '../core/_utils/request';

// 获取表格数据
export const getTableData = params => {
  return request({
    method: 'GET',
    url: 'http://172.17.90.55/Acme/ehrNewborn/online/sample',
    data: { ...params }
  });
};

// 获取head头部
export const getColunmData = params => {
  return request({
    method: 'GET',
    url: 'http://172.17.90.55/Acme/cm/formlist',
    data: { ...params }
  });
};

// 获取额外的table数据
export const getExtraTableData = params => {
  return request({
    method: 'GET',
    url: 'http://172.17.90.55/Acme/iEhr/SampleData',
    data: { ...params }
  });
};
