export interface PaymentData {
    store: string;
    payAmount: number;
    payState: String;
    successRedirect: string;
    failRedirect: string;
}

export interface CardProduct {
    cardImg: string;
}

export interface CardData {
    account: string;
    cardName: string;
    cardNumber: string;
    cardProduct: CardProduct;
}

export interface PayUpdateRequest {
    card_id: number;
    
}