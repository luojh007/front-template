import request from '../core/_utils/request';

export const getTableData = params => {
  return request({
    method: 'GET',
    url: 'http://172.16.0.61:7272/Acme/ehrNewborn/online/sample',
    data: { ...params }
  });
};
