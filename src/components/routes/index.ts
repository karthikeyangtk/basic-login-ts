import Headers from "../headers";
import { RouteConstants } from "../../constants/routeConstants";

export const routes = [
  {
    path: RouteConstants.HOME,
    Component: Headers,
    name: "Home",
  },
  {
    path: RouteConstants.USER,
    Component: Headers,
    name: "User",
  },
];
