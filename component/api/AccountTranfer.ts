import { AxiosResponse } from "axios";
import { api } from "../../config/network";

export const getAccountUserInfo = async (account: string, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/others?account=${account}`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountMoney = async (body: any, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/amount`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}