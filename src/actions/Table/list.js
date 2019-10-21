import request from "../../core/_utils/request";

export function getTableList(query) {
  return request({
    url: `//staff-sit.317hu.com/nurse-staff-web/certificate/read/page/filter`,
    options: {
      method: "GET",
      data: query
    },
    api: "www_form_urlencoded_archivesApi"
  });
}
