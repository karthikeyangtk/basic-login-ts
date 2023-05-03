import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router";
import { getFromStorage, ValueOf, removeFromStorage } from "./utills/helper";
import { localStorageConstants } from "./constants/localstorageConstants";
import { UrlConstants } from "./constants/UrlConstants";
import { NODE_URL } from "./utills/environmentHelper";

type Method = "get" | "post" | "delete" | "put";

type URL = ValueOf<typeof UrlConstants>;

const { AUTH_TOKEN } = localStorageConstants;

/**
 * API call
 * @param url
 * @param method
 * @param data
 */
export const request = async (
  url: URL | string,
  method: Method,
  params: any = {},
  navigaet: NavigateFunction
) => {
  let AUTH = getFromStorage(AUTH_TOKEN);
  if (AUTH) {
    axios.defaults.headers["authorization"] = AUTH;
  }
  try {
    const { data } = await axios[method](`${NODE_URL}${url}`, params);
    return data;
  } catch (error) {
    const err = error as AxiosError
    if (err?.response?.status === 401) {
      removeFromStorage(AUTH_TOKEN);
      setTimeout(() => {
        navigaet('/');
      }, 500);
    }
    return err;
  }
};
