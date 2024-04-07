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

## Об архитектуре 
```
Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

Приложение построено на основе паттерна MVP (Model-View-Presenter) и состоит из трех основных слоев:

Модель (Model) - отвечает за хранение и обработку данных.
Представление (View)  - отвечает за отображение данных и взаимодействие с пользователем.
Презентер (Presenter) - связывает Модель и Представление, обрабатывает логику приложения и реагирует на события от Представления.
```

## Базовый код 
```
class Api отвечает за работу с сервером.
```
Конструктор класса состоит из 
baseUrl: string URL - для доступа к API
options: RequestInit - настройки/опции запроса

Класс содержит следующие методы 
handleResponse(response: Response): Promise<object> - обрабатывает ответ от сервера
get(uri: string) -  получение данных с сервера
post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправка данных на сервер
```
Класс EventEmitter дает возможность компонентам подписаться на события и реагировать на их выполнение 
```
Конструктор класса инициализирует хранилище событий
Класс содержит следующие методы 
on - позволяет установить обработчик на событие
off - позволяет снять обработчик с события
emit - позволяет инициировать событие с данными
onAll - позволяет слушать все события
offAll - позволяет сбросить все обработчики
trigger - позволяет сделать коллбек триггер, генерирующий событие при вызове

```
abstract class Component абстрактный класс обеспечивает работу с DOM
```
constructor(protected readonly container: HTMLElement) Конструктор класса принимает DOM-элемент 

Методы класса 

toggleClass(element: HTMLElement, className: string, force?: boolean) Переключить класс
setText(element: HTMLElement, value: unknown) Установить текстовое содержимое
setDisabled(element: HTMLElement, state: boolean) Сменить статус блокировки
setHidden(element: HTMLElement) Скрыть элемент
setVisible(element: HTMLElement) Показать элемент
setImage(element: HTMLImageElement, src: string, alt?: string) Установить изображение с алтернативным текстом
render(data?: Partial<T>): HTMLElement Вернуть корневой DOM-элемент
