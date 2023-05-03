import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/login/login";
import { localStorageConstants } from "./constants/localstorageConstants";
import { getFromStorage } from "./utills/helper";
import { routes } from "./components/routes";
import Sidebar from "./components/sidebar";
import { RouteConstants } from "./constants/routeConstants";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * App component
 * @category web app
 * @module App
 */
function App() {
  const navigate = useNavigate();
  const { AUTH_TOKEN } = localStorageConstants;
  const token = getFromStorage(AUTH_TOKEN);
  const {DEFAULT_PATH, USER_LOGIN} = RouteConstants

  useEffect(() => {
    if (!token) {
      navigate(DEFAULT_PATH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="App" data-testid="app-component">
      <>
        <ToastContainer position={"top-right"} closeOnClick limit={1} autoClose={1000} />
        {token && <Sidebar />}
        <Routes>
          <Route path={DEFAULT_PATH} element={<Login />} />
          <Route path={USER_LOGIN} element={<Login />} />
          {routes?.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                index
                Component={route.Component}
              />
            );
          })}
        </Routes>
      </>
    </div>
  );
}

export default App;
