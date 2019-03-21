import LoginPage from "views/LoginPages/LoginPage.jsx";
import Fingerprint from "@material-ui/icons/Fingerprint";

const pagesRoutes = [
  {
    path: "/sym/login/normal",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
      redirect: true,
      path: "/sym/login",
      pathTo: "/sym/login/normal",
      name: "Register"
  },
];

export default pagesRoutes;
