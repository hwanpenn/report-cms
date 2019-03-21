import {RESET_SUCCESS_User_Password } from "actions/passwordMng";
import {GET_SUCCESS_User_Password } from "actions/passwordMng";
const initState = {
    queryUserInfo:'',
    resetUserPassword:'',
};
export default function reducer(state = initState,action) {
    switch (action.type) {
    	case GET_SUCCESS_User_Password:
    	    const queryUserInfo = action.result.data;
    	    return {
    	    	...state,
    	    	UserInfoDetail:queryUserInfo.rows,
    	    	UserInfoAccount:queryUserInfo.total,
    	    	queryUserInfo:queryUserInfo
    	    };
        case RESET_SUCCESS_User_Password:
            const resetUserPassword = action.result.data;
            return {
                ...state,
                resetPasswordDetail:resetUserPassword.rows,
                resetUserPassword:resetUserPassword,
            };
        default:
            return state
    }
}
