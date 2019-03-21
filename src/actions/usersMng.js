import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_USERINFO = "GET_REQUEST_USERINFO";
export const GET_SUCCESS_USERINFO = "GET_SUCCESS_USERINFO";
export const GET_FAIL_USERINFO = "GET_FAIL_USERINFO";

export const DELETE_REQUEST_UserInfo = "DELETE_REQUEST_UserInfo";
export const DELETE_SUCCESS_UserInfo = "DELETE_SUCCESS_UserInfo";
export const DELETE_FAIL_UserInfo = "DELETE_FAIL_UserInfo";

export const GET_REQUEST_UpdateInfo = "GET_REQUEST_UpdateInfo";
export const GET_SUCCESS_UpdateInfo = "GET_SUCCESS_UpdateInfo";
export const GET_FAIL_UpdateInfo = "GET_FAIL_UpdateInfo";

export const GET_REQUEST_addList = "GET_REQUEST_addList";
export const GET_SUCCESS_addList = "GET_SUCCESS_addList";
export const GET_FAIL_addList = "GET_FAIL_addList";
 
export const GET_REQUEST_addOldList = "GET_REQUEST_addOldList";
export const GET_SUCCESS_addOldList = "GET_SUCCESS_addOldList";
export const GET_FAIL_addOldList = "GET_FAIL_addOldList";

export const GET_REQUEST_ComInfo = "GET_REQUEST_ComInfo";
export const GET_SUCCESS_ComInfo = "GET_SUCCESS_ComInfo";
export const GET_FAIL_ComInfo = "GET_FAIL_ComInfo";

export function getCompanyInfo(params) {
    return {
        types: [GET_REQUEST_ComInfo, GET_SUCCESS_ComInfo, GET_FAIL_ComInfo],
        promise: client => client.get('/sreport/organization/queryTenant',{params:params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function addUserInfoList(params) {
    return {
        types: [GET_REQUEST_addList, GET_SUCCESS_addList, GET_FAIL_addList],
        promise: client => client.post('/sreport/organization/addUser', params),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
           if(response.data.code===0){
                message.success(response.data.msg);
                const newparams = {
                    pageNo:1,
                    pageSize:10,
                    
                };
                if(window.sessionStorage.getItem('role')=='ROLE_ADMIN'){
        	         newparams.tenantId = params.tenantId;
                }else{
                	newparams.tenantId = ''
                }
               
                dispatch(getUserInfoMng(newparams));
            }else {
                message.error(response.data.msg);
            }
        },
    }
}
export function addOldUserInfoList(params) {
    return {
        types: [GET_REQUEST_addOldList, GET_SUCCESS_addOldList, GET_FAIL_addOldList],
        promise: client => client.post('/sreport/organization/addOldUser', params),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
           if(response.data.code===0){
                message.success(response.data.msg);
                const newparams = {
                    pageNo:1,
                    pageSize:10,
                    
                };
                newparams.tenantId = params.tenantId;
                dispatch(getUserInfoMng(newparams));
            }else {
                message.error(response.data.msg);
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
                message.success(response.data.msg);
                const newparams = {
                    pageNo:params.pageNo,
                    pageSize:10,
                                   
                };
                if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN'){                	
                	newparams.tenantId=window.sessionStorage.getItem('tenantId')
                }
                dispatch(getUserInfoMng(newparams));
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
export function deleteDataUserInfo(params) {
    return {
        types: [DELETE_REQUEST_UserInfo, DELETE_SUCCESS_UserInfo, DELETE_FAIL_UserInfo],
        promise: client => client.post('/sreport/organization/deleteUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.success(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN'){
                	params.tenantId=window.sessionStorage.getItem('tenantId')
                }
                dispatch(getUserInfoMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}