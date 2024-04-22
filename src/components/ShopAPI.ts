import {
    Api,
    ApiListResponse
} from './base/Api';
import {
    IOrder,
    IOrderResult,
    ICard
} from '../types';

export interface IShopAPI {
    getProductsList: () => Promise < ICard[] > ;
    getProductId: (id: string) => Promise < ICard > ;
    orderProducts: (order: IOrder) => Promise < IOrderResult > ;
}

export class ShopAPI extends Api implements IShopAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options ? : RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductsList(): Promise < ICard[] > {
        return this.get('/product').then((data: ApiListResponse < ICard > ) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
            }))
        );
    }

    getProductId(id: string): Promise < ICard > {
        return this.get(`/product/${id}`).then((item: ICard) => ({
            ...item,
            image: this.cdn + item.image,
        }));
    }

    orderProducts(order: IOrder): Promise < IOrderResult > {
        return this.post('/order', order).then((data: IOrderResult) => data);
    }
}