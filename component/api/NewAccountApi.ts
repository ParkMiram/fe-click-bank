import axios, { AxiosResponse } from "axios";
import { api } from "../../config/network";

export const saveAccount = async (token:string, body: any): Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts`, "post", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const getAccountByUserId = async (token: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await api('/api/v1/accounts/user-account', "GET", undefined, {
            'Authorization': `Bearer ${token}`
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

export const setAccountName = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/name`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountPassword = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/password`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountLimit = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/limit`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountMoney = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts/amount`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const deleteAccount = async (account: string, token: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/accounts?account=${account}`, "delete", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

