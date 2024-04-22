import {
  Model
}
from './base/Model';
import {
  FormErrors,
  IAppState,
  ICard,
  IOrder,
  IOrderForm,
  OrderPay
}
from '../types';
export class Product extends Model < ICard > {
  id: string;
  title: string;
  price: number | null;
  description: string;
  category: string;
  image: string;
}
export class AppState extends Model < IAppState > {
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
  setCatalog(items: ICard[]) {
    this.catalog = items.map((item) => new Product(item, this.events));
    this.emitChanges('items:changed', {
      catalog: this.catalog
    });
  }
  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value as OrderPay;
    if (this.validateFormFirst() && this.validateFormSecond()) {
      this.events.emit('order:ready', this.order);
    }
  }
  validateFormFirst() {
    const errors: typeof this.formErrors = {};
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    const isValid = Object.keys(errors).length === 0;
    this.events.emit(`${this.constructor.name}.valid:change`, {
      isValid
    });
    return isValid;
  }
  validateFormSecond() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    else if (!emailRegex.test(this.order.email)) {
      errors.email = 'Некорректный формат email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    else if (!phoneRegex.test(this.order.phone)) {
      errors.phone = 'Некорректный формат телефона';
    }
    this.formErrors = errors;
    this.events.emit('formContactsErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}