import LoginPages from "layouts/LoginPages.jsx";
import HomePages from "layouts/HomePages.jsx";
const indexRoutes = [
    {
        path: "/sym/login",
        name: "Login ",
        short: "Login",
        mini: "LP",
        component: LoginPages
    },
    {
      path: "/sym/home",
      name: "Home",
      short: "Home",
      mini: "HP",
      component: HomePages
    },
    {
      path: "*",
      redirect: true,
      pathTo: "/sym/login",
      name: "Register"
    },
];
export default indexRoutes;
