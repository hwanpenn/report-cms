import {GET_SUCCESS_REPORTSORT } from "actions/reportMng";
import {DELETE_SUCCESS_ReportSort } from "actions/reportMng";
import {GET_SUCCESS_UpdateSort } from "actions/reportMng";
import {GET_SUCCESS_addList } from "actions/reportMng";
import {add_SUCCESS_REPORTSORT} from "actions/reportMng";
import {GET_SUCCESS_REPORTDetail} from "actions/reportMng";
import {UPDATE_SUCCESS_Status} from "actions/reportMng";
import {DELETE_SUCCESS_REPORTDetail} from "actions/reportMng";
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
    getReportSort:'',
    addReportSort:'',
    getReportDetailData:'',
    getReportDetailTotal:'',
    getReportDetail:'',
    updateReportStatus:'',
    deleteReportDetail:'',
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_addList:
            const responseOtherKillGroupChatMng = action.result.data;
            return {
                ...state,
                responseOtherKillGroupChatMng:responseOtherKillGroupChatMng,
            };
        case GET_SUCCESS_UpdateSort:
            const updateuserinfo = action.result.data;
            return {
                ...state,
                updateuserinfo:updateuserinfo,
            };
        case GET_SUCCESS_REPORTSORT:
            const getReportSort = action.result.data;
            return {
                ...state,
                reportSortdetail:getReportSort.rows,
                reportSorttotal:getReportSort.total,
            };
        case add_SUCCESS_REPORTSORT:
             const addReportSort = action.result.data;
            return {
                ...state,
                addreportSortdetail:addReportSort.rows,
                addreportSorttotal:addReportSort.total,
            };
        case DELETE_SUCCESS_ReportSort:
            const responseDeleteChatMng = action.result.data;
            return {
                ...state,
                responseDeleteChatMng:responseDeleteChatMng
            };
        case GET_SUCCESS_REPORTDetail:
            const getReportDetail = action.result.data;
            return {
            	...state,
            	getReportDetailData:getReportDetail.rows,
            	getReportDetailTotal:getReportDetail.total,
            	getReportDetail:getReportDetail
            };
        case UPDATE_SUCCESS_Status:
            const updateReportStatus = action.result.data;
            return {
            	...state,
            	updateReportStatus:updateReportStatus
            };
        case DELETE_SUCCESS_REPORTDetail:
            const deleteReportDetail = action.result.data;
            return{
            	...state,
            	deleteReportDetail:deleteReportDetail
            }
        default:
            return state
    }
}
