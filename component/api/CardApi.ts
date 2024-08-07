import axios, { Axios, AxiosResponse } from "axios";
import { apiCard } from "../../config/network";

export const saveCard = async (token:string,body:any): Promise<AxiosResponse<any>> =>{
    return apiCard (`api/v1/cards`,"POST",body,{
        'Authorization': `Bearer ${token}`
    });
}

export const deleteCard = async (token: string, cardNumber: string): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards?cardNumber=${cardNumber}`, "DELETE", undefined, {
        'Authorization': `Bearer ${token}`
    });
};
export const updateCard = async (token: string, cardId: number, data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};



