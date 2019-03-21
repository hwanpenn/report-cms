import usersMng from "views/Tables/usersMng.jsx";
import passwordMng from "views/Tables/passwordMng.jsx";
import tablesIndex from "views/Tables/tablesIndex.jsx";
import reportMng from "views/Tables/reportMng.jsx";
import reportDetail from "views/Tables/reportDetail.jsx";
import reportVersion from "views/Tables/reportVersion.jsx";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Lock from "@material-ui/icons/Lock";
import DateRange from "@material-ui/icons/DateRange";
import Assignment from "@material-ui/icons/Assignment";

const dashRoutes = [
    {
        collapse: true,
        path: "/sym/home/tables",
        name: "用户管理",
        state: "openTables2",
        icon: SupervisorAccount,
        views: [
            {
                path: "/sym/home/tables/usermng",
                name: "用户管理",
                mini: "RF",
                component: usersMng
            }
        ]
    },
    {
        collapse: true,
        path: "/sym/home/tables",
        name: "报表管理",
        state: "openTables5",
        icon: DateRange,
        views: [
            {
                path: "/sym/home/tables/report",
                name: "报表分类",
                mini: "GS",
                component: reportMng
            },
            {
            	path: "/sym/home/tables/detail",
            	name: "报表详情",
            	mini: "GS",
            	status:'hidden',
            	component: reportDetail
            },
            {
            	path: "/sym/home/tables/version",
            	name: "所有版本",
            	mini: "GS",
            	status:'hidden',
            	component: reportVersion
            },
            
         ]
    },
    {
        redirect: true,
        path: "/sym/home",
        pathTo: "/sym/home/tables/usermng",
        name: "Register"
    },
];

export default dashRoutes;
