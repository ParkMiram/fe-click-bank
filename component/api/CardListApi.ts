import {AxiosResponse} from "axios";
import {apiCardList} from "../../config/network";

export const getAllMyCard = async (token : any) : Promise<AxiosResponse<any>> => {
    const query = `
        query {
            getAllMyCard {
                cardId
                cardName 
                cardProduct{
                    cardImg
                }
            }
        }
    `;

    const body = { query };
    return await apiCardList(`/graphql`, "post", body, {"Authorization" : "Bearer "+token});
}



export const getAllCardProduct = async ():Promise<AxiosResponse<any>> => {
    const query = `
        query {
            getAllCardProduct {
                cardProductId
                cardProductName 
                cardImg
            }
        }
    `;

    const body = { query };
    return await apiCardList(`/graphql`, "post", body );
}

// {"Authorization" : "Bearer "+token}

export const getCardProduct = async (id: number):Promise<AxiosResponse<any>> => {
    const query = `
        query {
            getCardProduct(cardProductId: ${id}) {
                cardProductId
                cardProductName
                cardAnnualFee
                cardImg
                cardBenefits
            }
        }
    `;

    const body = { query };
    return await apiCardList(`/graphql`, "post", body);
}

export const getMyCard = async (id: number):Promise<AxiosResponse<any>> => {
    const query = `
        query {
            getMyCard(cardId: ${id}) {
                cardId
                cardName
                cardNumber
                account
                cardCVC
                cardMonthLimit
                cardAnnualFee
                cardProduct{
                  cardImg
                  cardBenefits
                }
            }
        }
    `;

    const body = { query };
    return await apiCardList(`/graphql`, "post", body);
}