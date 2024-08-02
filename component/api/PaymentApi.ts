import { AxiosResponse } from "axios";
import { api } from "../../config/network";

export const getPaymentInfo = async (payment_id:string):Promise<AxiosResponse<any>> => {
    return await api(``, "get");
}

export const getCardInfo = async (card_id:string):Promise<AxiosResponse<any>> => {
    return await api(``, "get");
}