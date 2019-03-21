import {GET_SUCCESS_USERINFO } from "actions/reportVersion";
import {GET_SUCCESS_UpdateInfo } from "actions/reportVersion";
import {GET_SUCCESS_addList } from "actions/reportVersion";
import {QUERY_SUCCESS_Version} from "actions/reportVersion";

const initState = {
    responseGetChatMng:'',
    responseActiveChatMng:'',
    updateuserinfo:'',
    responseOtherRobotChatMng:'',
    responseOtherKillGroupChatMng:'',
    tableDataChatMng:'',
    tableCountChatMng:'',
    queryUserInfo:'',
};
export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_addList:
            const responseOtherKillGroupChatMng = action.result.data;
            return {
                ...state,
                responseOtherKillGroupChatMng:responseOtherKillGroupChatMng,
            };
        case GET_SUCCESS_UpdateInfo:
            const updateuserinfo = action.result.data;
            return {
                ...state,
                updateuserinfo:updateuserinfo,
            };
        case GET_SUCCESS_USERINFO:
            const getUserInfo = action.result.data;
            return {
                ...state,
                userinfodetail:getUserInfo.rows,
                userinfototal:getUserInfo.total,
            };
        case QUERY_SUCCESS_Version:
            const queryAllReportVersion = action.result.data;
            return {
            	...state,
            	queryAllReportVersionData:queryAllReportVersion.rows,
            	queryAllReportVersionTotal:queryAllReportVersion.total,
            	queryAllReportVersion:queryAllReportVersion
            }

        default:
            return state
    }
}
