import {
  Component
}
from './base/Component';
import {
  EventEmitter
}
from './base/Events';
import {
  ICard,
  categoryCard
}
from '../types';
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
export class Card extends Component < ICard > {
  protected _title: HTMLElement;
  protected _image ? : HTMLImageElement;
  protected _description ? : HTMLElement;
  protected _category ? : HTMLElement;
  protected _price: HTMLElement;
  protected _button ? : HTMLButtonElement;
  protected _id: string;
  constructor(container: HTMLElement, events ? : EventEmitter,
    actions ? : ICardActions) {
    super(container);
    this._title = container.querySelector(`.card__title`);
    this._image = container.querySelector(`.card__image`);
    this._category = container.querySelector(`.card__category`);
    this._price = container.querySelector(`.card__price`);
    this._button = container.querySelector(`.card__button`);
    this._description = container.querySelector(`.card__text`);
    if (actions?.onClick) {
      container.addEventListener(`click`, actions.onClick);
    }
    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('basket:add', {
          id: this.id || '',
          title: this._title.textContent || '',
          price: this._price.textContent || null,
        });
      });
    }
  }
  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }
  set title(value: string) {
    this.setText(this._title, value);
  }
  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }
  set price(value: string | null) {
    if (value === null) {
      this.setText(this._price, 'Бесценно');
      this.setText(this._button, "Нельзя купить");
    }
    else {
      this.setText(this._price, `${value} синапсов`);
    }
  }
  set category(value: string) {
    this.setText(this._category, value)
    this._category.className =
      `card__category card__category_${
			categoryCard[value.toLowerCase()]
		}`;
  }
  set description(value: string) {
    this.setText(this._description, value);
  }
  disableButton() {
    this._button.setAttribute('disabled', 'disabled');
    this.setText(this._button, "Уже в корзине")
  }
}
export class PromoCard extends Component < ICard > {
  protected _id: string;
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _deleteButton: HTMLButtonElement;
  protected _price: HTMLElement;
  constructor(container: HTMLElement, events ? : EventEmitter,
    actions?: ICardActions) {
    super(container);
    this._deleteButton = container.querySelector(
      `.basket__item-delete`);
    this._title = container.querySelector('.card__title');
    this._price = container.querySelector('.card__price');
    this._index = container.querySelector('.basket__item-index');
    if (actions?.onClick) {
      container.addEventListener(`click`, actions.onClick);
    }
    if (this._deleteButton) {
      const cardElement = this._deleteButton.closest(
        '.basket__item');
      this._deleteButton.addEventListener('click', () => {
        events.emit('basket:remove', cardElement);
        events.emit('basket:chenge', {
          id: this._id || '',
          index: this._index.textContent || '',
          title: this._title.textContent || '',
          price: this._price.textContent || null,
        });
      });
    }
  }
  set index(value: string) {
    this.setText(this._index, value);
  }
  set id(value: string) {
    this._id = value;
  }
  set title(value: string) {
    this.setText(this._title, value);
  }
  set price(value: number) {
    if (value === null) {
      this.setText(this._price, '0')
    }
    else {
      this.setText(this._price, value);
    }
  }
}