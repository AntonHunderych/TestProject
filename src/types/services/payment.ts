export interface IPayment {
  createPayment(
    data: { productIdPaymentSystem: string; quantity: number },
    metadata: { userId: string; productIdProject: string },
  ): Promise<string>;
}
