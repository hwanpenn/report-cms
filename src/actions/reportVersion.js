import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_USERINFO = "GET_REQUEST_USERINFO";
export const GET_SUCCESS_USERINFO = "GET_SUCCESS_USERINFO";
export const GET_FAIL_USERINFO = "GET_FAIL_USERINFO";

export const GET_REQUEST_UpdateInfo = "GET_REQUEST_UpdateInfo";
export const GET_SUCCESS_UpdateInfo = "GET_SUCCESS_UpdateInfo";
export const GET_FAIL_UpdateInfo = "GET_FAIL_UpdateInfo";

export const GET_REQUEST_addList = "GET_REQUEST_addList";
export const GET_SUCCESS_addList = "GET_SUCCESS_addList";
export const GET_FAIL_addList = "GET_FAIL_addList";

export const QUERY_REQUEST_Version = "QUERY_REQUEST_Version";
export const QUERY_SUCCESS_Version = "QUERY_SUCCESS_Version";
export const QUERY_FAIL_Version = "QUERY_FAIL_Version";

export function addUserInfoList(params) {
    return {
        types: [GET_REQUEST_addList, GET_SUCCESS_addList, GET_FAIL_addList],
        promise: client => client.post('/sreport/organization/addUser', params),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
           if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getUserInfoMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function UpdateUserInfo(params) {
    return {
        types: [GET_REQUEST_UpdateInfo, GET_SUCCESS_UpdateInfo, GET_FAIL_UpdateInfo],
        promise: client => client.post('/sreport/organization/updateUser', params),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
           if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getUserInfoMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function getUserInfoMng(params) {
    return {
        types: [GET_REQUEST_USERINFO, GET_SUCCESS_USERINFO, GET_FAIL_USERINFO],
        promise: client => client.get('/sreport/organization/queryUser', {params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
    }
}
export function queryReportVersion(params) {
	return {
		types:[QUERY_REQUEST_Version,QUERY_SUCCESS_Version,QUERY_FAIL_Version],
		promise: client => client.get('/sreport/sreport/querySreportVersion',{params:params}),
		afterSuccess:(dispatch,getState,response)=>{
		}
	}
}
