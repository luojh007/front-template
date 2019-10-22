export const menuData = [
  {
    name: '表单相关演示',
    url: '/lTable.html',
    key: '1',
  },
  {
    name: '导入文件弹窗演示',
    url: '/importModal.html',
    key: '2',
  },
  {
    name: '动态多项新增',
    icon: 'plus',
    key: '3',
    children: [{
      name: '基本弹窗',
      url: '/multipleAdd/base.html',
      key: '3-1',
    }, {
      name: '复杂一',
      url: '/multipleAdd/complexOne.html',
      key: '3-2'
    }]
  },
  {
    name: 'antd文件上传+七牛',
    url: '/uploadMultiple.html',
    key: '4',
  }
]