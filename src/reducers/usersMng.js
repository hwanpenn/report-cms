import {GET_SUCCESS_USERINFO } from "actions/usersMng";
import {DELETE_SUCCESS_UserInfo } from "actions/usersMng";
import {GET_SUCCESS_UpdateInfo } from "actions/usersMng";
import {GET_SUCCESS_ComInfo } from "actions/usersMng";
import {GET_SUCCESS_addList } from "actions/usersMng";
import {GET_SUCCESS_addOldList} from "actions/usersMng";

const initState = {
    responseGetChatMng:'',
    responseDeleteChatMng:'',
    responseActiveChatMng:'',
    updateuserinfo:'',
    responseOtherRobotChatMng:'',
    responseOtherKillGroupChatMng:'',
    tableDataChatMng:'',
    tableCountChatMng:'',
    queryUserInfo:'',
    responseComInfo:'',
    addolduserinfo:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_addList:
            const responseOtherKillGroupChatMng = action.result.data;
            return {
                ...state,
                responseOtherKillGroupChatMng:responseOtherKillGroupChatMng,
            };
        case GET_SUCCESS_ComInfo:
            const responseComInfo = action.result.data;
            return {
                ...state,
                companyDatas:responseComInfo.rows,
                responseComInfo:responseComInfo,
            };
        case GET_SUCCESS_UpdateInfo:
            const updateuserinfo = action.result.data;
            return {
                ...state,
                updateuserinfo:updateuserinfo,
            };
        case GET_SUCCESS_addOldList:
            const addolduserinfo = action.result.data;
            return {
                ...state,
                addolduserinfo:addolduserinfo,
            };
        case GET_SUCCESS_USERINFO:
            const getUserInfo = action.result.data;
            return {
                ...state,
                userinfodetail:getUserInfo.rows,
                userinfototal:getUserInfo.total,
            };
        case DELETE_SUCCESS_UserInfo:
            const responseDeleteChatMng = action.result.data;
            return {
                ...state,
                responseDeleteChatMng:responseDeleteChatMng
            };

        default:
            return state
    }
}
