import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUSET_User_Password = "GET_REQUSET_User_Password";
export const GET_SUCCESS_User_Password = "GET_SUCCESS_User_Password";
export const GET_FAIL_User_Password = "GET_FAIL_User_Password";

export const RESET_REQUEST_User_Password = "RESET_REQUEST_User_Password";
export const RESET_SUCCESS_User_Password = "RESET_SUCCESS_User_Password";
export const RESET_FAIL_User_Password = "RESET_FAIL_User_Password";

export function resetUserPassword(params) {
    return {
        types: [RESET_REQUEST_User_Password, RESET_SUCCESS_User_Password, RESET_FAIL_User_Password],
        promise: client => client.post('/sreport/organization/updatePassword',params),
        afterSuccess:(dispatch,getState,response)=>{
           if(response.data.code===0){
           	message.info(response.data.msg)
           }else{
           	message.info(response.data.msg)
           }
        },
    }
}
export function getUserPassword(params) {
	return {
		types:[GET_REQUSET_User_Password, GET_SUCCESS_User_Password, GET_FAIL_User_Password],
		promise: client => client.get('/sreport/organization/queryUser',{params: params}),
		afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
           
        },
	}
}

