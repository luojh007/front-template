"use strict";

import request from "../core/_utils/request";
import serialize from "../core/_utils/serialize";
import { getCache } from "../core/_utils/storage";
export const BOZ = require("../../config").BOZ;
export const apiConfig = BOZ["api"][BOZ.env];
//获取左侧菜单
export const getLocalMenus = () => {
  //cookies失效，重新定位到登陆页面
  debugger;
  if (!getCache("QUALITY_USER_INFO")) {
    window.location.href = apiConfig.archivesApi + '/nursing-quality-user/login.html'
  }
  const { modulePrivilegeInfoRespDTOList = {} } =
    getCache("QUALITY_USER_INFO") || {};
  let menus = [];
  console.log(
    "modulePrivilegeInfoRespDTOList->",
    modulePrivilegeInfoRespDTOList
  );
  for (const item of modulePrivilegeInfoRespDTOList) {
    for (const child of item.nursePrivilegeEnumRespDTOList || []) {
      menus.push(child);
    }
  }
  return menus;
};

//获取用户信息
export const getLocalUserInfo = () => {
  return getCache("QUALITY_USER_INFO") || {};
};
export const checkRole = value => {
  const user = getCache("QUALITY_USER_INFO") || {};
  return user.roleType === value;
};
//是否是护士
export const isNurse = () => {
  return checkRole(10);
};

//是否是病区管理员
export const isWardAdmin = () => {
  return checkRole(20);
};

//是否是科室管理员
export const isDeptAdmin = () => {
  return checkRole(30);
};

//是否是医院管理员
export const isHospitalAdmin = () => {
  return checkRole(40);
};

// 获取用户信息下拉
export const getDropdownMenuData = () => {
  return [
    {
      name: "后台管理",
      code: "admin",
      url: "/nursing-quality-admin/word-manage.html",
      auth: !isNurse()
    }
  ];
};