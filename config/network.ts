import axios, { Method, AxiosResponse } from 'axios';

interface ApiRequestBody {
    [key: string]: any; // 이 부분은 body가 어떤 형식의 데이터인지에 따라 더 구체화할 수 있습니다.
}

export const api = async (
    url: string,
    method: Method,
    body?: ApiRequestBody,
    headers?: Record<string, string>
): Promise<AxiosResponse<any>> => {
    axios.defaults.baseURL = "http://35.223.135.5:32041";

    const res = await axios({
        url,
        method,
        data: body,
        headers: headers
    });

    return res;
};
