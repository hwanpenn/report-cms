import usersMng from "views/Tables/usersMng.jsx";
import passwordMng from "views/Tables/passwordMng.jsx";
import tablesIndex from "views/Tables/tablesIndex.jsx";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Lock from "@material-ui/icons/Lock";
import DateRange from "@material-ui/icons/DateRange";
import Assignment from "@material-ui/icons/Assignment";

const dashRoutes = [
    {
        collapse: true,
        path: "/sym/home/tables",
        name: "企业管理",
        state: "openTables0",
        icon: Assignment,
        views: [
            {
            path: "/sym/home/tables/company",
            name: "企业管理",
            mini: "N",
            component: tablesIndex
            }
        ]
    },
    {
        collapse: true,
        path: "/sym/home/tables",
        name: "用户管理",
        state: "openTables1",
        icon: SupervisorAccount,
        views: [
            {
            path: "/sym/home/tables/user",
            name: "用户管理",
            mini: "N",
            component: usersMng
            }
        ]
    },
    {
        collapse: true,
        path: "/sym/home/tables",
        name: "密码管理",
        state: "openTables2",
        icon: Lock,
        views: [
            {
                path: "/sym/home/tables/password",
                name: "密码管理",
                mini: "RF",
                component: passwordMng
            },
        ]
    },
    {
        redirect: true,
        path: "/sym/home",
        pathTo: "/sym/home/tables/company",
        name: "Register"
    },
];

export default dashRoutes;
