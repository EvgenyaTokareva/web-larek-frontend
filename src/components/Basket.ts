import {
  createElement
}
from '../utils/utils';
import {
  Component
}
from './base/Component';
import {
  EventEmitter
}
from './base/Events';
import {
  ICard
}
from '../types/index';
interface IBasketView {
  items ? : HTMLElement[];
  total ? : number;
}
export class Basket extends Component < IBasketView > {
  protected _list: HTMLElement;
  protected _totalElement: HTMLElement;
  protected _basketItems: HTMLElement[] = [];
  protected _button: HTMLButtonElement;
  protected _total = '0';
  constructor(container: HTMLElement, protected events:
    EventEmitter) {
    super(container);
    this._list = this.container.querySelector('.basket__list');
    this._totalElement = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');
    this.setDisabled(this._button, true);
    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('order:open');
      });
    }
  }
  updateButtonState() {
    if (this._basketItems.length === 0) {
      this.setDisabled(this._button, true)
    }
    else {
      this.setDisabled(this._button, false)
    }
  }
  getBasketItems() {
    return this._basketItems;
  }

  basketIndex(item: HTMLElement, index:string) {
    const element = item.querySelector('.basket__item-index') as HTMLElement;
    const value = parseInt(index) + 1;
    this.setText(element, value);
   }
  
  getBasketTitle(basketItem: HTMLElement, item: ICard) {
    const element = basketItem.querySelector('.card__title');
	return element.textContent === item.title;
  }
  
  addItem(item: HTMLElement) {
    this._basketItems.push(item);
    this.updateButtonState();
  }
  removeAllItem() {
    this._basketItems = [];
    this.total = '0';
  }
  
  render(data: Partial < IBasketView > ): HTMLElement {
    if (data.items) {
      this.items = data.items;
    }
    if (data.total) {
      this.total = data.total.toString();
    }
    return this.container;
  }
  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
    }
    else {
      this._list.replaceChildren(createElement <
        HTMLParagraphElement > ('p', {
          textContent: 'Корзина пуста'
        }));
    }
  }
  get total(): string {
    return this._total;
  }
  set total(value: string) {
    this._total = value;
    this.setText(this._totalElement, `${value} синапсов`);
  }
}
