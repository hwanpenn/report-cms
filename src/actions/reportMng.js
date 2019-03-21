import { message } from 'antd';
message.config({
	duration: 1,
});

export const GET_REQUEST_REPORTSORT = "GET_REQUEST_REPORTSORT";
export const GET_SUCCESS_REPORTSORT = "GET_SUCCESS_REPORTSORT";
export const GET_FAIL_REPORTSORT = "GET_FAIL_REPORTSORT";

export const add_REQUEST_REPORTSORT = "add_REQUEST_REPORTSORT";
export const add_SUCCESS_REPORTSORT = "add_SUCCESS_REPORTSORT";
export const add_FAIL_REPORTSORT = "add_FAIL_REPORTSORT";

export const DELETE_REQUEST_ReportSort = "DELETE_REQUEST_ReportSort";
export const DELETE_SUCCESS_ReportSort = "DELETE_SUCCESS_ReportSort";
export const DELETE_FAIL_ReportSort = "DELETE_FAIL_ReportSort";

export const GET_REQUEST_UpdateSort = "GET_REQUEST_UpdateSort";
export const GET_SUCCESS_UpdateSort = "GET_SUCCESS_UpdateSort";
export const GET_FAIL_UpdateSort = "GET_FAIL_UpdateSort";

export const GET_REQUEST_addList = "GET_REQUEST_addList";
export const GET_SUCCESS_addList = "GET_SUCCESS_addList";
export const GET_FAIL_addList = "GET_FAIL_addList";

export const GET_REQUEST_REPORTDetail = "GET_REQUEST_REPORTDetail";
export const GET_SUCCESS_REPORTDetail = "GET_SUCCESS_REPORTDetail";
export const GET_FAIL_REPORTDetail = "GET_FAIL_REPORTDetail";

export const UPDATE_REQUEST_Status = "UPDATE_REQUEST_Status";
export const UPDATE_SUCCESS_Status = "UPDATE_SUCCESS_Status";
export const UPDATE_FAIL_Status = "UPDATE_FAIL_Status";

export const DELETE_REQUEST_REPORTDetail = "DELETE_REQUEST_REPORTDetail";
export const DELETE_SUCCESS_REPORTDetail = "DELETE_SUCCESS_REPORTDetail";
export const DELETE_FAIL_REPORTDetail = "DELETE_FAIL_REPORTDetail";

export function addUserInfoList(params) {
	return {
		types: [GET_REQUEST_addList, GET_SUCCESS_addList, GET_FAIL_addList],
		promise: client => client.post('/sreport/organization/addUser', params),
		afterSuccess: (dispatch, getState, response) => {
			/*请求成功后执行的函数*/
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const params = {
					pageNo: 1,
					pageSize: 10,
				};
				dispatch(getReportSort(params));
			} else {
				message.info(response.data.msg);
			}
		},
	}
}
export function UpdateReportSort(params) {
	return {
		types: [GET_REQUEST_UpdateSort, GET_SUCCESS_UpdateSort, GET_FAIL_UpdateSort],
		promise: client => client.post('/sreport/sreport/updateSreportCategory', params),
		afterSuccess: (dispatch, getState, response) => {
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const newparams = {
					pageNo: 1,
					pageSize: 10,
				};
				if(params.categoryId != undefined){
					newparams.tenantId = params.tenantId
				}
				dispatch(getReportSort(newparams));
			} else {
				message.info(response.data.msg);
			}
		},
	}
}
export function getReportSort(params) {
	return {
		types: [GET_REQUEST_REPORTSORT, GET_SUCCESS_REPORTSORT, GET_FAIL_REPORTSORT],
		promise: client => client.get('/sreport/sreport/querySreportCategory', {
			params: params
		}),
		afterSuccess: (dispatch, getState, response) => {
			/*请求成功后执行的函数*/
		},
	}
}
export function addReportSort(params) {
	return {
		types: [add_REQUEST_REPORTSORT, add_SUCCESS_REPORTSORT, add_FAIL_REPORTSORT],
		promise: client => client.post('/sreport/sreport/addSreportCategory', params),
		afterSuccess: (dispatch, getState, response) => {
			/*请求成功后执行的函数*/
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const newparams = {
					pageNo: 1,
					pageSize: 10,
				};
				if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
					newparams.tenantId = window.sessionStorage.getItem('tenantId')
				} else if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
					newparams.tenantId = params.tenantId
				}
				dispatch(getReportSort(newparams));
			} else {
				message.info(response.data.msg);
			}
		},
	}
}
export function deleteDataReportSort(params) {
	return {
		types: [DELETE_REQUEST_ReportSort, DELETE_SUCCESS_ReportSort, DELETE_FAIL_ReportSort],
		promise: client => client.post('/sreport/sreport/deleteSreportCategory', params),
		afterSuccess: (dispatch, getState, response) => {
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const newparams = {
					pageNo: 1,
					pageSize: 10,
				};
				if(params.tenantId != undefined){
					newparams.tenantId = params.tenantId
				}
				dispatch(getReportSort(newparams));
			} else {
				message.info(response.data.msg);
			}
		},
	}
}
export function getReportDetail(params) {
	return {
		types: [GET_REQUEST_REPORTDetail, GET_SUCCESS_REPORTDetail, GET_FAIL_REPORTDetail],
		promise: client => client.get('/sreport/sreport/querySreport', {
			params: params
		}),
		afterSuccess: (dispatch, getState, response) => {
			/*请求成功后执行的函数*/
		},
	}
}
export function updateReportStatus(params) {
	return {
		types: [UPDATE_REQUEST_Status, UPDATE_SUCCESS_Status, UPDATE_FAIL_Status],
		promise: client => client.post('/sreport/sreport/updateSreportVersion', params),
		afterSuccess: (dispatch, getState, response) => {
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const newsparams = {
					pageNo: 1,
					pageSize: 10,
					categoryId:params.categoryId,
					tenantId:params.tenantId
				};
				dispatch(getReportDetail(newsparams));
			} else {
				message.info(response.data.msg);
			}
		}
	}
}
export function deleteDataReportDetail(params) {
	return {
		types: [DELETE_REQUEST_REPORTDetail, DELETE_SUCCESS_REPORTDetail, DELETE_FAIL_REPORTDetail],
		promise: client => client.post('/sreport/sreport/deleteSreport', params),
		afterSuccess: (dispatch, getState, response) => {
			if(response.data.code === 0) {
				message.info(response.data.msg);
				const newparams = {
					pageNo: 1,
					pageSize: 10,
				};
				if(params.tenantId != undefined){
					newparams.tenantId = params.tenantId
				}
				dispatch(getReportDetail(newparams));
			} else {
				message.info(response.data.msg);
			}
		}
	}
}