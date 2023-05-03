import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { request } from "../../service";
import { UrlConstants } from "../../constants/UrlConstants";
import { localStorageConstants } from "../../constants/localstorageConstants";
import { getFromStorage, setInStorage } from "../../utills/helper";
import { RouteConstants } from "../../constants/routeConstants";
import {
  DivContainer,
  DivLoginContainer,
  DivLoginHeader,
  DivInputContainer,
  DivInput,
  DivLoginFooter,
  SpanRequired,
} from "./login.styles";

/**
 * Contain login section
 * @category login
 * @module Login
 */
export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const { AUTH_TOKEN } = localStorageConstants;
  const { mutate, isLoading } = useMutation(
    ["login"],
    async (data: typeof login) => {
      return adminLogin(data.email, data.password);
    }
  );
  const { HOME } = RouteConstants;

  useEffect(() => {
    const token = getFromStorage(AUTH_TOKEN);
    if (token) {
      navigate(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Login the admin
   * @param email
   * @param password
   */
  function adminLogin(email: string, password: string) {
    request(UrlConstants.ADMIN_LOGIN_URL, "post", { email, password }, navigate)
      .then((data) => {
        if (data?.status === "0") {
          return toast.error(data?.message || "");
        }
        if (data?.status === "1") {
          const token = data?.token || "";
          setInStorage(AUTH_TOKEN, token);
          navigate(HOME);
          return toast.success(data?.message || "");
        }
        if (data?.response?.data?.errors?.length > 0) {
          return toast.error(data?.response?.data?.errors?.[0]?.msg || "");
        }
      })
      .catch((error) => {
        if (error?.response?.data?.errors?.length > 0) {
          return toast.error(error?.response?.data?.errors?.[0]?.msg || "");
        }
      });
  }

  /**
   * Set the appropriate value to the key
   * @param e
   */
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e?.target?.name]: e?.target?.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email = "", password = "" } = login;
    if (!email) {
      return toast.warn("Email is required.");
    }
    if (!password) {
      return toast.warn("Password is required.");
    }
    mutate({ email, password });
  };
  return (
    <DivContainer>
      <DivLoginContainer>
        <DivLoginHeader>
          <h3>Sign In</h3>
        </DivLoginHeader>
        <DivInputContainer>
          <DivInput>
            <label>
              Email address <SpanRequired>*</SpanRequired>
            </label>
            <input
              type={"email"}
              name="email"
              required={true}
              onChange={(e) => handleOnchange(e)}
              value={login.email || ""}
            />
          </DivInput>
          <DivInput>
            <label>
              Password <SpanRequired>*</SpanRequired>
            </label>
            <input
              type={"password"}
              name="password"
              required={true}
              onChange={(e) => handleOnchange(e)}
              value={login.password || ""}
            />
          </DivInput>
        </DivInputContainer>
        <DivLoginFooter isLoading={isLoading}>
          <button type={"submit"} onClick={handleSubmit}>
            Sign In
          </button>
        </DivLoginFooter>
      </DivLoginContainer>
    </DivContainer>
  );
}
