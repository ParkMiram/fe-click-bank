export interface PaymentData {
    payId: number;
    businessName: string;
    failRedirUrl: string;
    successRedirUrl: string;
    payAmount: number;
}

export interface CardProduct {
    cardImg: string;
}

export interface LastCard {
    code: number;
    cardId: null | number;
    userId: String;
}

export interface CardData {
    account: null | string;
    cardName: null | string;
    cardNumber: null | string;
    cardProduct: null | CardProduct;
}

export interface PayUpdateRequest {
    card_id: number;
    
}