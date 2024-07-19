import axios, { AxiosResponse } from "axios";
import { api } from "../../config/network";

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
