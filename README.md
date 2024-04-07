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

# Об архитектуре 
```
Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном
коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

Приложение построено на основе паттерна MVP (Model-View-Presenter) и состоит из трех основных слоев:

Модель (Model) - отвечает за хранение и обработку данных.
Представление (View)  - отвечает за отображение данных и взаимодействие с пользователем.
Презентер (Presenter) - связывает Модель и Представление, обрабатывает логику приложения и реагирует на события от Представления.
```

# Базовый код 

## class Api отвечает за работу с сервером.

### Конструктор класса состоит из 
- baseUrl: string URL для доступа к API
- options: RequestInit настройки/опции запроса

### Класс содержит следующие методы 
- handleResponse(response: Response): Promise<object> обрабатывает ответ от сервера
- get(uri: string) получение данных с сервера
- post(uri: string, data: object, method: ApiPostMethods = 'POST') отправка данных на сервер
  
## Класс EventEmitter дает возможность компонентам подписаться на события и реагировать на их выполнение 
Конструктор класса инициализирует хранилище событий

### Класс содержит следующие методы 
- on позволяет установить обработчик на событие
- off позволяет снять обработчик с события
- emit позволяет инициировать событие с данными
- onAll позволяет слушать все события
- offAll позволяет сбросить все обработчики
- trigger позволяет сделать коллбек триггер, генерирующий событие при вызове

## abstract class Component абстрактный класс обеспечивает работу с DOM
Конструктор класса принимает DOM-элемент constructor(protected readonly container: HTMLElement) 

### Методы класса 
- toggleClass(element: HTMLElement, className: string, force?: boolean) Переключить класс
- setText(element: HTMLElement, value: unknown) Установить текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) Сменить статус блокировки
- setHidden(element: HTMLElement) Скрыть элемент
- setVisible(element: HTMLElement) Показать элемент
- setImage(element: HTMLImageElement, src: string, alt?: string) Установить изображение с алтернативным текстом
- render(data?: Partial<T>): HTMLElement Вернуть корневой DOM-элемент
  
# Компоненты модели данных 

## class ShopAPI расширяет стандартные возможности API
### свойства класса
- cdn(string) ссылка для загрузки изображений товаров

### Конструктор класса состоит из 

- cdn: string — ссылка для загрузки изображений товаров
- baseUrl: string — базовая ссылка на API
- options?: RequestInit — список настроек запроса

### методы

- getProductsList: () => Promise<IProduct[]>; /*Получить с сервера все продукты*/
- getProductId: (id: string) => Promise<IProduct>; /*Получить определенный продукт по ID*/
- orderProduct: (order: IOrder) => Promise<IOrderResult>; /*Отправка на сервер заказа*/

### интерфейс класса
```
interface IShopAPI {
- getProductsList: () => Promise<IProduct[]>; /*Получить с сервера все продукты*/
- getProductId: (id: string) => Promise<IProduct>; /*Получить определенный продукт по ID*/
- orderProduct: (order: IOrder) => Promise<IOrderResult>; /*Отправка на сервер заказа*/
}
```

## class personalAccount класс отражающий состояние сайта для пользователя 

### свойства класса
- shop: IProduct[]; /*картчоки товаров на главной*/
- basket: IProduct[]; /*корзина пользователя*/
- preview: string  /*айди товара для открытия окна с описанием*/
- order: IOrder | null ; /*заказ пользователя*/
- formErrors: FormErrors  ; /*ошибки в форме заказа*/


  ### методы класса
- addToBasket(value: Product): void; /*метод добавления товара в корзину пользователя*/
- deleteFromBasket(id: string): void; /*метод удаления товара из корзины пользователя*/
- changeBasket() /*изменения состояния корзины*/
- clearBasket(): void; /*метод полной очистки корзины пользователя*/
- validateForm(); /* метод валидации формы заказа пользователя*/
- updateFormErrors(errors: FormErrors) /*метод обновления ошибок форме*/
- clearOrder(): boolean; /* метод полной очистки заказа пользователя*/
- resetpurchased(): void; /* метод обновления поля добавления в корзину товара после заверешния покупки*/
- showTotalCost(): number; /* метод показа стоимости корзины*/
- showQuantityProduct(): number; /*метод показа количества товаров в корзине*/
- сreationCatalog(shop: IProduct[]): void /*метод отоборжение карточек на главной*/
- сreationPreview(shop: IProduct): void /*метод отображение опсиания карточки*/
}

### интерфейс класса
```
interface IPersonalAccount {
- shop: IProduct[]; /*картчоки товаров на главной*/
- basket: IProduct[]; /*корзина пользователя*/
- preview: string /*айди товара для открытия окна с опсианием*/
- order: IOrder | null ; /*заказ пользователя*/
- contactsForm:IContactsForm /*форма с контактными данными*/
- adressForm: IAdressForm /*форма с адрессом*/
}
```

# Компоненты представления
## class Modal для взаимодействия с модальными окнами
### Конструктор класса:
constructor(container: HTMLElement, protected events: IEvents) - принимает контейнер для окна и объект для управления событиями
### методы
- set content(value: HTMLElement) - создание содержимого модального окна
- open() - открытие окна
- close() - закрытие окна
- render(data: IModalData): HTMLElement - рендер окна
### интерфейс класса
```
interface IModalData {
  content: HTMLElement; /*наполнение окна*/
}	
```
## class Form для взаимодействия с формами
### Конструктор класса:
constructor(protected container: HTMLFormElement, protected events: IEvents) - принимает контейнер для формы и объект для управления событиями
### методы
- onInputChange(field: keyof T, value: string) - обработчик событий ввода
- set valid(value: boolean) - проверка валидности формы для кнопки отправки
- set errors(value: string) - отображает ошибки валидации формы
- render(state: Partial<T> & IFormState) - отображает состояние формы
### интерфейс класса
```
interface IFormState {
- valid: boolean;
- errors: string[];
}
```
## class Page класс для основных элементов интерфейса страницы
### свойства класса
- protected _counter: HTMLElement; счетчик товаров в корзине
- protected _catalog: HTMLElement; контейнер для каталога товаров
- protected _wrapper: HTMLElement; обертка страницы
- protected _basket: HTMLElement;  элемент корзины
### конструктор класса
constructor(container: HTMLElement, protected events: IEvents) инициализирует элементы и назначает обработчики событий
### методы
- set counter(value: number) счетчик товаров в корзине
- set shop(items: HTMLElement[]) заполняет каталог товаров
- set locked(value: boolean)  блокировка страницы
### интерфейс класса
```
interface IPage {
counter: number; счетчик товара
shop: HTMLElement[]; картчоки товаров
locked: boolean; блокировка страницы
}
```
## class Card для управления карточками товара
### свойства класса
- protected _title: HTMLElement; название товара
- protected _image: HTMLImageElement; изображение товара
- protected _description: HTMLElement; описание товара
- protected _button: HTMLButtonElement; кнопка товара
- protected _index: HTMLElement; индекс товара
- protected _price: HTMLButtonElement; цена товара
- protected _category: HTMLButtonElement; категория товара
### конструктор класса
constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) инициализирует элементы карточки и устанавливает обработчики событий для кнопок
### методы
- set/get id управляет индификатором карточки
- set/get title управляет названием товара
- set description устанавливает описание товара
- set/get price управляет ценой товара
- set image устанавливает изображение товара
- set/get category управляет категорией и ее цветом
### интерфейс класса
```
interface ICard<T> {
title: string; название товара
description: string | string[]; описание товара
image: string; изображение товара
status: T;
price: number; цена товара
category: string; категория товара
}
```
## class Basket для управления корзиной
### свойства класса
- protected _list: HTMLElement; список товаров
- protected _total: HTMLElement; общая стоимость товаров
- protected _button: HTMLElement; кнопка перехода к оформлению заказа
### конструктор класса
constructor(container: HTMLElement, protected events: EventEmitter) инициализирует элементы корзины  и устанавливает обработчики событий
### методы
- set items(items: HTMLElement[]) устанановка данных в корзине
- set total(total: number) устанановка общей суммы товаров в корзине
- set selected(items: number) отключение кнопки оформления заказа если корзина пустая
### интерфейс класса
```
interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
```

## class AdressForm класс с элементами управления формой с выбором оплаты и адрессом
### свойства класса
- _buttonCard - кнопка выбора оплаты картой
- _buttonCash - кнопка оплаты наличными
### конструктор класса
constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) инициализирует элементы формы  и устанавливает обработчики событий
### методы
- toggleStateButton(target: HTMLElement) - переключение кнопки оплаты
- set address(value: string) - установка адресса 
### интерфейс класса
```
interface interface IAdressForm {
	payment: TypePayment Способы оплаты
	address: string Адрес доставки
```

## class ContactsForm класс с элементами управления формой с теелфоном и почтой
### конструктор класса
constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) инициализирует элементы формы  и устанавливает обработчики событий
### методы
- set email(value: string) - установка почты
- set email(value: string) - установка телефона
### интерфейс класса
```
interface interface IContactsForm {
	phone: string Способы оплаты
	email: string Адрес доставки }
```

## class Success класс отображающий сообщение об успешной покупке
### конструктор класса
constructor(container: HTMLElement, actions: ISuccessActions) инициализирует элементы и устанавливает обработчики событий
### методы
- set total(value: string) установка информации об успешной покупке
### интерфейс класса
```
interface ISuccess {
    total: number; итоговая сумма заказа
}
```

# Ключевые типы данных
возможные значения категории товара
```
enum ProductCategory { 
    СategorySoft = "софт-скил", 
    СategoryOther = "другое", 
    СategoryAdditional = "дополнительное", 
    СategoryButton = "кнопка", 
    СategoryHard = "хард-скил" 
}; 
```
интерфейс описания товара с сервера
```
interface IProduct { 
    id: string; /*айди товара*/ 
    category: ProductCategory; /*категория товара*/ 
    title: string; /*название*/ 
    description: string; /*описание*/ 
    image: string; /*изображение*/ 
    price: number | null; /*цена*/ 
}
```
Тип описывающий ошибки валидации формы 
```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```
возможные значения оплаты
```
enum TypePayment {
Cash =  "наличка",
Card = "картой"
}
```
состояние сайта для пользователя 
```
interface IPersonalAccount {
- shop: IProduct[]; /*картчоки товаров на главной*/
- basket: IProduct[]; /*корзина пользователя*/
- preview: string /*айди товара для открытия окна с опсианием*/
- order: IOrder | null ; /*заказ пользователя*/
- contactsForm:IContactsForm /*форма с контактными данными*/
- adressForm: IAdressForm /*форма с адрессом*/
}
```
основные элементы интерфейса страницы
```
interface IPage {
counter: number; счетчик товара
shop: HTMLElement[]; картчоки товаров
locked: boolean; блокировка страницы
}
```
картчоки товара
```
interface ICard<T> {
title: string; название товара
description: string | string[]; описание товара
image: string; изображение товара
status: T;
price: number; цена товара
category: string; категория товара
}
```

# Взаимодействие компонентов
В файле index.ts находится код, который управляет взаимодействием между представлением и данными. Он выполняет роль презентера, который связывает эти два компонента.

Для обеспечения взаимодействия используется брокер событий, который генерирует события, а также обработчики этих событий, описанные в index.ts.

В начале файла index.ts создаются экземпляры всех необходимых классов, которые будут использоваться в процессе взаимодействия.

Затем настраивается обработка событий. Это означает, что определенные действия будут выполняться при возникновении определенных событий. Например, при событии "клик на кнопку" может быть вызван соответствующий обработчик, который выполнит определенные действия, связанные с этим событием.
## Список событий 
- 'basket:open' /* при нажатии на иконку корзины открывается окно в котором находятся товары которые пользователь добавил в коризну */ 
- 'basket:order' /*при нажатии на кнопку оформить заказ открывается окно с формой для заполнения */
- 'basket:delete' /* при нажатии на удаление товара удаляет товар из корзины, меняет итоговую сумму в корзине и количество товаров, меняет кнопку у товара с добавленного на недобавленный */
- 'modal:open' /*открывается модальное окно*/
- 'modal:close' /*закрывается модальное окно при нажатии на крестик или оверлей*/
- 'card:addToBasket' /*при нажатии на добавление товара в коризу меняет счетчик в корзине итоговой стоимости и количества товара. Также меняет кнопку на неактивную чтобы нельзя было добавить товар еще раз*/
- preview:changed  /*открытие окна карточки*/
- 'card:open' /*открывает полную карточку товара с опсианием */
- 'order:submit' /*меняет окно формы для заполнения на следующий шаг при нажатии на кнопку далее*/
- 'order:success' /*при нажатии на кнопку заказать открывается модальное окно с информацией об успешной покупке*/ 
