import {
    IOrderForm
} from '../types';
import {
    IEvents
} from './base/Events';
import {
    Form
} from './common/Form';

export class OrderForm extends Form < IOrderForm > {
    protected _paymentButtons: NodeListOf < HTMLButtonElement > ;
    public payment: string = 'card';

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentButtons = container.querySelectorAll('.order__buttons button');

        if (this._paymentButtons) {
            this._paymentButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    this.handleButtonClick(button);
                });
                if (button.getAttribute('name') === 'card') {
				this.toggleClass(button, 'button_alt-active', true);

                }
            });
        }
    }

    private handleButtonClick(clickedButton: HTMLButtonElement) {
        this._paymentButtons.forEach((button) => {
            this.toggleClass(button, 'button_alt-active', false);
        });
        this.toggleClass(clickedButton, 'button_alt-active', true);
        this.payment = clickedButton.getAttribute('name');
        this.events.emit('order.payment:change', {
            field: 'payment',
            value: this.payment,
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value =
            value;
    }
}

export class ContactsOrder extends Form < IOrderForm > {
    protected _button: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._button = container.querySelector('.button__pay');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:success');
            });
        }
    }

    // Установка номера телефона
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value =
            value;
    }

    // Установка адреса электронной почты
    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value =
            value;
    }
}