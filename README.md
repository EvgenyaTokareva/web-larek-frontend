# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

/*Перечисление всех возможных варинатов категорий товаров*/
```
enum ProductCategory {
    СategorySoft = "софт-скил",
    СategoryOther = "другое",
    СategoryAdditional = "дополнительное",
    СategoryButton = "кнопка",
    СategoryHard = "хард-скил"
};
```
/*Интерфейс продукта*/
```
interface IProduct {
    id: string; /*айди товара*/
    category: ProductCategory; /*категория товара*/
    title: string; /*название*/
    description: string; /*описание*/
    image: string; /*изображение*/
    price: number | null; /*цена*/
    purchased: boolean; /*добавлен ли товар в корзину*/
}
```
/*Интерфейс формы заказа*/
```
interface IOrder {
    products: string[];
    paymentType: string;
    address: string;
    email: string;
    phone: string;
    totalPrice: number;
}
```

/*Интерфейс хранения данных пользователя и методы сайта*/
```
interface IPersonalAccount {
    shop: Product[]; /*картчоки товаров на главной*/
    basket: Product[]; /*корзина пользователя*/
    order: IOrder; /*заказ пользователя*/
    addToBasket(value: Product): void; /*метод добавления товара в корзину пользователя*/
    deleteFromBasket(id: string): void; /*метод удаления товара из корзины пользователя*/
    clearBasket(): void; /*метод полной очистки корзины пользователя*/
    validateForm(): boolean; /* метод валидации формы заказа пользователя*/
    clearOrder(): boolean; /* метод полной очистки заказа пользователя*/
    resetpurchased(): void; /* метод обновления поля добавления в корзину товара после заверешния покупки*/
    showTotalCost(): number; /* метод показа стоимости корзины*/
    showQuantityProduct(): number; /*метод показа количества товаров в коризне*/
}
```
/*Класс продукта*/
```
class Product implements IProduct {
    id: string; /*айди товара*/
    category: ProductCategory; /*категория товара*/
    title: string; /*название*/
    description: string; /*описание*/
    image: string; /*изображение*/
    price: number | null; /*цена*/
    purchased: boolean;
}
```

/*Объект заказа пользователя*/
```
order: IOrder = {
    productы: = [];
    paymentType: '';
    address: '';
    email: '';
    phone: '';
    totalPrice: number;
}
```

/*Интерфейс хранения данных пользователя и методы сайта*/
```
class PersonalAccount implements IPersonalAccount {
    shop: Product[]; /*картчоки товаров на главной*/
    basket: Product[]; /*корзина пользователя*/
    order: IOrder; /*заказ пользователя*/
    addToBasket(value: Product): void; /*метод добавления товара в корзину пользователя*/
    deleteFromBasket(id: string): void; /*метод удаления товара из корзины пользователя*/
    clearBasket(): void; /*метод полной очистки корзины пользователя*/
    validateForm(): boolean; /* метод валидации формы заказа пользователя*/
    clearOrder(): boolean; /* метод полной очистки заказа пользователя*/
    resetpurchased(): void; /* метод обновления поля добавления в корзину товара после заверешния покупки*/
    showTotalCost(): number; /* метод показа стоимости корзины*/
    showQuantityProduct(): number; /*метод показа количества товаров в коризне*/
}
```
```
class Card implements IProduct {
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    /*сеттеры и геттеры*/
    set id(value: string);
    get id(): string;
    set title(value: string);
    get title(): string;
    set purchased(value: boolean);
    set category(value: ProductCategory);
    set image(value: string);
    set price(value: number | null);
}
```
/*корзина пользователя*/
```
interface IBasket { 
    products: ProductPurchased[];
    totalPrice: number;
}
```
```
class Basket implements IBasket {
    protected _products: HTMLElement;
    protected _totalPrice: HTMLElement;
    /*сеттеры и геттеры*/
    set products(items: ProductPurchased[]);
    set totalPrice(price: number);
}
```
/*главная страница*/
```
interface IPage { 
    counter: number; /*количество товаров в корзине */
    shop: Product[]; /*все карточки на странице*/
}
```
```
class Page implements IPage {
    protected _counter: HTMLElement;
    protected _shop: HTMLElement;
    /*сеттеры и геттеры*/
    set counter(value: number);
    set shop(items: Product[]);
}
```

/*события */
```
'basket:open' /* при нажатии на иконку корзины открывается окно в котором находятся товары которые пользователь добавил в коризну */
'basket:order' /*при нажатии на кнопку оформить заказ открывается окно с формой для заполнения */
'basket:delete' /* при нажатии на удаление товара удаляет товар из корзины, меняет итоговую сумму в корзине и количество товаров, меняет кнопку у товара с добавленного на недобавленный */
'modal:close' /*закрывается модальное окно при нажатии на крестик или оверлей*/
'card:addToBasket' /*при нажатии на добавление товара в коризу меняет счетчик в корзине итоговой стоимости и количества товара. Также меняет кнопку на неактивную чтобы нельзя было добавить товар еще раз*/
'card:open' /*открывает полную карточку товара с опсианием */
'order:submit' /*меняет окно формы для заполнения на следующий шаг при нажатии на кнопку далее*/
'order:success' /*при нажатии на кнопку заказать открывается модальное окно с информацией об успешной покупке*/
```
