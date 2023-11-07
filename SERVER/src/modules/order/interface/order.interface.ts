import { Address } from 'src/modules/address/entities/address.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';

export class IOrder {
  codeOrder: number;
  quantity: number;
  status: string;
  addressId: Address;
  total: number;
  paymentId: Payment;
  userId: number;
}
export class IidCommon {
  id: number;
  codeOrder: number;
}
