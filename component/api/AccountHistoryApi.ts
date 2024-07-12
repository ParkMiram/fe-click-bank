import {AxiosResponse} from "axios";
import {api} from "../../config/network";

export const getAccountHistory = async (account: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/histories?account=${account}`, "get");
}