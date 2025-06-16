import { ICartItem} from "./cart-item-model";
import { ShippingAddress} from "./shipping-address.model";
export interface ICheckout {
    userId: number;
    cartItems: ICartItem[];
    availableAddresses: ShippingAddress[];
    totalAmount: number;
    availablePaymentMethods: string[];
  }