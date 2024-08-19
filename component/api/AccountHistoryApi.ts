import {                                                           AxiosResponse} from "axios";
import {api} from "../../config/network";

export const getAccountHistory = async (account: string):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/histories?account=${account}`, "get");
}

export const getAccountHistoryDetail = async (id: number):Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/histories/detail/${id}`, "get");
}

export const updateAccountHistoryMemo = async (data: any): Promise<void> => {
    await api(`/api/v1/histories/detail/${data.id}`, "put", data.memo, { "Content-Type": "text/plain" });
}

export const getAccountHistoryStatistics = async (data: string): Promise<AxiosResponse<any>> => {
    // return await api(`/api/v1/histories/statistics?month=${data.month}&account=${data.account}`, "get")
    return await api(`/api/v1/histories/statistics?account=${data}`, "get")
}

export const getAccountBudget = async (account: string) : Promise<AxiosResponse<any>> => {
    return await api(`/api/v1/histories/budget?myAccount=${account}`, "get");
}

export const updateNewBudget = async (data: any) : Promise<void> => {
    await api(`/api/v1/histories/budget?myAccount=${data.account}`, "put", data.budget, { "Content-Type": "application/json" });
}

export const updateAccountHistoryCategory = async (data: any): Promise<void> => {
    await api(`/api/v1/histories/detail/${data.id}/category/${data.categoryId}`, "put");
}

export const getPastAllHistories = async (data:any): Promise<AxiosResponse<any>> => {
    return await api(`api/v1/histories/past?account=${data.account}&page=${data.count}&size=10`, "get");
}

export const getPastHistoryDetail = async (id: number): Promise<AxiosResponse<any>> => {
    console.log("MongoDB 조회")
    return await api(`api/v1/histories/past/${id}`, "get");
}

export const updatePastHistorymemo = async (data:any) : Promise<void> => {
    await api(`api/v1/histories/past/${data.id}/memo`, "put", data.memo, { "Content-Type": "application/json" });
}

export const updatePastHistoryCategory = async (data: any): Promise<void> => {
    await api(`api/v1/histories/past/${data.id}/category/${data.categoryId}`, "put");
}