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

export const updateCardPasssword = async (token: string, cardId: number, data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/password/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};
export const updateCardName = async (token: string, cardId: number,  data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/card-name/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};

export const updateCardOneTimeLimit = async (token: string, cardId: number, data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/day-limit/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};

export const updateCardMonthLimit = async (token: string, cardId: number, data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/month-limit/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};
export const updateCardPaymentDate = async (token: string, cardId: number, data: any): Promise<AxiosResponse<any>> => {
    return apiCard(`api/v1/cards/payment-date/${cardId}`, "PUT", data, {
        'Authorization': `Bearer ${token}`
    });
};



