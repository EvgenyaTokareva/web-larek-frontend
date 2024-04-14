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
- src/scss/styles.scss — корневой файл стилей
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

## abstract class Model<T> 
Базовая модель, чтобы можно было отличить ее от простых объектов с данными. Получает тип в виде дженерика.
### Конструктор класса 
constructor(data: Partial<T>, protected events: IEvents)
### Класс содержит следующий метод
emitChanges(event: string, payload?: object) сообщает всем, что модель поменялась

## class Api 
отвечает за работу с сервером - отправка данных на сервер, принятие ответа, получение данных с сервера. 

### Конструктор класса состоит из 
- baseUrl: string URL для доступа к API
- options: RequestInit настройки/опции запроса

### Класс содержит следующие методы 
- handleResponse(response: Response): Promise<object> обрабатывает ответ от сервера
- get(uri: string) получение данных с сервера
- post(uri: string, data: object, method: ApiPostMethods = 'POST') отправка данных на сервер

## экземпляр класса Api ShopAPI расширяет стандартные возможности API
### свойства класса
- cdn(string) ссылка для загрузки изображений товаров

### Конструктор класса состоит из 

- cdn: string — ссылка для загрузки изображений товаров
- baseUrl: string — базовая ссылка на API
- options?: RequestInit — список настроек запроса

### методы

- getProductsList: () => Promise<ICard[]>; /*Получить с сервера все продукты*/
- getProductId: (id: string) => Promise<ICard[]>; /*Получить определенный продукт по ID*/
- orderProducts: (order: IOrder) => Promise<IOrderResult>; /*Отправка на сервер заказа*/

### интерфейс класса
```
interface IShopAPI {
- getProductsList: () => Promise<ICard[]>; /*Получить с сервера все продукты*/
- getProductId: (id: string) => Promise<ICard[]>; /*Получить определенный продукт по ID*/
- orderProducts: (order: IOrder) => Promise<IOrderResult>; /*Отправка на сервер заказа*/
}
```

## Класс EventEmitter дает возможность компонентам подписаться на события и реагировать на их выполнение 
Конструктор класса инициализирует хранилище событий и позволяет устанавливать, снимать слушатели.

### Класс содержит следующие методы 
- on позволяет установить обработчик на событие
- off позволяет снять обработчик с события
- emit позволяет инициировать событие с данными
- onAll позволяет слушать все события
- offAll позволяет сбросить все обработчики
- trigger позволяет сделать коллбек триггер, генерирующий событие при вызове

## abstract class Component<T> 
Абстрактный базовый класс, предназначенным для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления(View), получает тип в виде дженерика.
### Конструктор класса принимает DOM-элемент constructor(protected readonly container: HTMLElement) 

### Методы класса 
- toggleClass(element: HTMLElement, className: string, force?: boolean) Переключить класс
- setText(element: HTMLElement, value: unknown) Установить текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) Сменить статус блокировки
- setHidden(element: HTMLElement) Скрыть элемент
- setVisible(element: HTMLElement) Показать элемент
- setImage(element: HTMLImageElement, src: string, alt?: string) Установить изображение с алтернативным текстом
- render(data?: Partial<T>): HTMLElement Вернуть корневой DOM-элемент
  

# Компоненты модели данных 
## class AppState класс отражающий состояние всего сайта и возможные события

### свойства класса
basket: string[];
catalog: ICard[];
formErrors: FormErrors = {};
order: IOrder = {
  payment: 'card',
  items: [],
  address: '',
  phone: '',
  email: '',
  total: null,
	};

  ### методы класса
setCatalog(items: ICard[])
validateFormFirst() валидация первой части формы
validateFormSecond() валидация второй части формы
}

### интерфейс класса
```
catalog: ICard[]; каталог товаров
basket: string[]; коризна
order: IOrder | null; заказ
total: number | null; итоговая сумма
}
```

# Компоненты представления
## class Modal класс для взаимодействия с модальными окнами - открытие, закрытие
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
## class Form<T> для взаимодействия с формами Получает тип в виде дженерика.
### Конструктор класса:
constructor(protected container: HTMLFormElement, protected events: IEvents) - принимает контейнер для формы и объект для управления событиями
### методы
- onInputChange(field: keyof T, value: string) - обработчик событий ввода
- set valid(value: boolean) - проверка валидности формы для кнопки отправки
- set errors(value: string) - отображает ошибки валидации формы
- handlePaymentChange(value: string) обработка изменения способа оплаты
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
## class Card для управления карточками товара и отображения полной версии
### свойства класса
- protected _title: HTMLElement; название товара
- protected _image: HTMLImageElement; изображение товара
- protected _description: HTMLElement; описание товара
- protected _category: HTMLButtonElement; категория товара
- protected _button: HTMLButtonElement; кнопка товара
- protected _id: HTMLElement; айди товара
- protected _price: HTMLButtonElement; цена товара

### конструктор класса
constructor( container: HTMLElement, actions?: ICardActions) инициализирует элементы карточки и устанавливает обработчики событий для кнопок
### методы
- set/get id управляет индификатором карточки
- set/get title управляет названием товара
- set description устанавливает описание товара
- set/get price управляет ценой товара
- set image устанавливает изображение товара
- set/get category управляет категорией и ее цветом
### интерфейс класса
```
interface ICard {
id: string;
price: number | null;
title: string;
description?: string;
image?: string;
category?: string;
index?: number;
deleteButton?: string;
}
```
## class PromoCard для управления карточками товара и отображения укороченной вермии
### свойства класса
protected _id: string; айди
protected _index: HTMLElement; индекс
protected _title: HTMLElement;
protected _deleteButton: HTMLButtonElement; кнопка удаления
protected _price: HTMLElement;

### конструктор класса
constructor( container: HTMLElement, actions?: ICardActions) инициализирует элементы карточки и устанавливает обработчики событий для кнопок
### методы
- set id управляет индификатором карточки
- set index управляет номером карточки
- set title управляет названием товара
- set price управляет ценой товара
### интерфейс класса
```
interface ICard {
id: string;
price: number | null;
title: string;
description?: string;
image?: string;
category?: string;
index?: number;
deleteButton?: string;
}
```
## class Basket для управления корзиной с товарами
### свойства класса
protected _list: HTMLElement;
protected _totalElement: HTMLElement;
protected _basketItems: HTMLElement[] = [];
protected _button: HTMLButtonElement;
protected _total = '0';
### конструктор класса
constructor(container: HTMLElement, protected events: EventEmitter) инициализирует элементы корзины  и устанавливает обработчики событий
### методы
- updateButtonState()
- getBasketItems()
- addItem(item: HTMLElement
- removeItem(item: HTMLElement)
- removeAllItem()
- set items(items: HTMLElement[])
- get total()
- set total(value: string)

### интерфейс класса
```
interface IBasketView {
    items: HTMLElement[];
    total: number;
```

## class Success класс который создает сообщение о списанной сумме после удачной покупки
### свойства класса
- protected _close: HTMLElement;
- protected _totalElement: HTMLElement;
- protected _total = '0';
### конструктор класса
 constructor(container: HTMLElement, actions: ISuccessActions) инициализирует элементы формы  и устанавливает обработчики событий
### методы
- get total() геттер общей суммы заказа
- set total(value: string)  сообщение о списанной сумме
### интерфейс класса
```
interface interface IAdressForm {
 total: number;
```
## class Order класс совершения заказа первая форма
### конструктор класса
constructor(container: HTMLFormElement, events: IEvents) инициализирует элементы формы  и устанавливает обработчики событий
### методы
- handleButtonClick(clickedButton: HTMLButtonElement) установка нужного вида оплаты
- set address(value: string) сеттер адреса
### интерфейс класса
```
interface interface IOrderForm {
        payment?: OrderPay;
	address?: string;
	email?: string;
	phone?: string;
```
## class ContactsOrder класс совершения заказа вторая форма
### конструктор класса
constructor(container: HTMLFormElement, events: IEvents) инициализирует элементы формы  и устанавливает обработчики событий
### методы
- set phone(value: string) сеттер телефона
- set email(value: string) сеттер почты
### интерфейс класса
```
interface interface IOrderForm {
        payment?: OrderPay;
	address?: string;
	email?: string;
	phone?: string;
```
# Ключевые типы данных
```
export const categoryCard: Record<string, string> = {
	'кнопка': 'button',
	'хард-скил': 'hard',
	'софт-скил': 'soft',
	'другое': 'other',
	'дополнительное': 'additional',
};
```
```
export type OrderPay = 'card' | 'cash';
```
```
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```
```
export interface IAppState {
	catalog: ICard[];
	basket: string[];
	order: IOrder | null;
	total: number | null;
}
```
```
export interface ICard {
	id: string;
	price: number | null;
	title: string;
	description?: string;
	image?: string;
	category?: string;
	index?: number;
	deleteButton?: string;
}
```
```
export interface IOrderForm {
	payment?: OrderPay;
	address?: string;
	email?: string;
	phone?: string;
}
```
```
export interface IOrder extends IOrderForm {
	items: string[];
	total: number;
}
```
```
export interface IOrderResult {
	id: string;
	total: number;
}
```
```

export type CatalogChangeEvent = {
	catalog: ICard[];
};
```

# Взаимодействие компонентов
В файле index.ts находится код, который управляет взаимодействием между представлением и данными. Он выполняет роль презентера, который связывает эти два компонента.

Для обеспечения взаимодействия используется брокер событий, который генерирует события, а также обработчики этих событий, описанные в index.ts.

В начале файла index.ts создаются экземпляры всех необходимых классов, которые будут использоваться в процессе взаимодействия.

Затем настраивается обработка событий. Это означает, что определенные действия будут выполняться при возникновении определенных событий. Например, при событии "клик на кнопку" может быть вызван соответствующий обработчик, который выполнит определенные действия, связанные с этим событием.
## Список событий 
- items:changed Изменились элементы каталога
- order:submit отправка заказа
- formErrors:change изменение ошибок
- order:success успещное завершение заказа
- order:open открытие заказа
- basket:open открытие корзины
- basket:add добавление в корзину
- basket:remove удаление из корзины
- card:select выбор карты
- formContactsErrors:change
- modal:open открытие модального окна
- modal:close закрытие модального окна
