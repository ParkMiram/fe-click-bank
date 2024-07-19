import { AxiosResponse } from "axios";
import { api } from "../../config/network";

export const getAccountUserInfo = async (account: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/others?account=${account}`, "get");
}