export const categoryCard: Record < string, string > = {
    'кнопка': 'button',
    'хард-скил': 'hard',
    'софт-скил': 'soft',
    'другое': 'other',
    'дополнительное': 'additional',
};

export type OrderPay = 'card' | 'cash';

export type FormErrors = Partial < Record < keyof IOrder, string >> ;

export interface IAppState {
    catalog: ICard[];
    basket: string[];
    order: IOrder | null;
    total: number | null;
}

export interface ICard {
    id: string;
    price: number | null;
    title: string;
    description ? : string;
    image ? : string;
    category ? : string;
    index ? : number;
    deleteButton ? : string;
}

export interface IOrderForm {
    payment ? : OrderPay;
    address ? : string;
    email ? : string;
    phone ? : string;
}

export interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type CatalogChangeEvent = {
    catalog: ICard[];
};