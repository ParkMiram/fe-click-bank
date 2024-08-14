import { AxiosResponse } from "axios";
import { api } from "../../config/network";
import { UserInfo } from "../../types/AuthTypes";

export const getUserInfo = async (token:string):Promise<AxiosResponse<UserInfo>> => {
    return await api(`api/v1/auth/token/${token}`, "get", {}, {});
}

export const setMainAccount = async (id:string, account:any):Promise<AxiosResponse<any>> => {
    return await api(`api/v1/auth/${id}/main-account`, "put", account, {});
}