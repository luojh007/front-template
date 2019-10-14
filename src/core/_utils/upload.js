const apiConfig = require('../../store/api');
export function customRequest(info) {
	const oMyForm = new FormData();
	oMyForm.append('token', apiConfig.uptoken);
	
	oMyForm.append('file', info.file);
	const oReq = new XMLHttpRequest();
	oReq.upload.onprogress = function (e) {
		if (e.total > 0) {
			e.percent = e.loaded / e.total * 100;
		}
		info.onProgress(e);
	};
	oReq.open('POST', '//upload.qiniup.com');
	oReq.onload = function (oEvent) {
		if (oReq.status === 200) {
			info.onSuccess({ response: oReq.response });
		} else {
			info.onError(oReq.response);
		}
	};
	oReq.onerror = function (oEvent) {
		info.onError(oReq.response);
	};
	oReq.send(oMyForm);
}
