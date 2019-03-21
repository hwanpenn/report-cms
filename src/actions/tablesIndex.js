import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_Company = "GET_REQUEST_Company";
export const GET_SUCCESS_Company = "GET_SUCCESS_Company";
export const GET_FAIL_Company = "GET_FAIL_Company";

export const CREATE_REQUEST_Company = "CREATE_REQUEST_Company";
export const CREATE_SUCCESS_Company = "CREATE_SUCCESS_Company";
export const CREATE_FAIL_Company = "CREATE_FAIL_Company";

export const UPDATE_REQUEST_Company = "UPDATE_REQUEST_Company";
export const UPDATE_SUCCESS_Company = "UPDATE_SUCCESS_Company";
export const UPDATE_FAIL_Company = "UPDATE_FAIL_Company";

export const DELETE_REQUEST_Company = "DELETE_REQUEST_Company";
export const DELETE_SUCCESS_Company = "DELETE_SUCCESS_Company";
export const DELETE_FAIL_Company = "DELETE_FAIL_Company";

export function getDataCompany(params) {
    return {
        types: [GET_REQUEST_Company, GET_SUCCESS_Company, GET_FAIL_Company],
        promise: client => client.get('/sreport/organization/queryTenant',{params:params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataCompany(params) {
    return {
        types: [CREATE_REQUEST_Company, CREATE_SUCCESS_Company, CREATE_FAIL_Company],
        promise: client => client.post('/sreport/organization/addTenant',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.success(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataCompany(params) {
    return {
        types: [UPDATE_REQUEST_Company, UPDATE_SUCCESS_Company, UPDATE_FAIL_Company],
        promise: client => client.post('/sreport/organization/updateTenant',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.success(response.data.msg);
                const newparams = {
                    pageNo:params.pageNo,
                    pageSize:10,
                };
                dispatch(getDataCompany(newparams));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataCompany(params) {
    return {
        types: [DELETE_REQUEST_Company, DELETE_SUCCESS_Company, DELETE_FAIL_Company],
        promise: client => client.post('/sreport/organization/deleteTenant',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.success(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
