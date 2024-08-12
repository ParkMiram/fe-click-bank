import axios, { AxiosResponse } from "axios";
import { api, apiAccount } from "../../config/network";

export const saveAccount = async (token:string, body: any): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts`, "post", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const saveGroup = async (token:string, body: any): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts/group`, "post", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const waitGroupMember = async (token:string, account: string, body: any): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts/group/wait?account=${account}`, "post", body, {
        'Authorization': `Bearer ${token}`
    });
}


export const getUserInfo = async (token: string): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts/users`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const acceptGroupAccount = async (token: string): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts/group/accept`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const getGroupAccount = async (token: string, account: string): Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts/group?account=${account}`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const getFriends = async (token: string, account: string): Promise<AxiosResponse<any>> => {
    return apiAccount(`api/v1/accounts/friends?account=${account}`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const getAccountByUserId = async (token: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await apiAccount('/api/v1/accounts/user-account', "GET", undefined, {
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

export const getAccountByType = async (token: string):Promise<AxiosResponse<any>> => {
    return await apiAccount(`/api/v1/accounts/saving`, "get", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountName = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await apiAccount(`/api/v1/accounts/name`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountPassword = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await apiAccount(`/api/v1/accounts/password`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const setAccountLimit = async (body: object, token: string):Promise<AxiosResponse<any>> => {
    return await apiAccount(`/api/v1/accounts/limit`, "put", body, {
        'Authorization': `Bearer ${token}`
    });
}

export const deleteAccount = async (token: string, account: string):Promise<AxiosResponse<any>> => {
    return apiAccount(`/api/v1/accounts?account=${account}`, "delete", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

export const deleteGroupMember = async (token: string, account: string):Promise<AxiosResponse<any>> => {
    return await apiAccount(`/api/v1/accounts/group?account=${account}`, "delete", undefined, {
        'Authorization': `Bearer ${token}`
    });
}

