/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.SP_ENDPOINT!,
  config.sp.SP_USERNAME!,
  config.sp.SP_PASSWORD!,
  config.sp.SP_PREFIX!,
  config.sp.SP_RETURN_URL!,
);

const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => {
        //console.log('ShurjoPay Response:', JSON.stringify(response, null, 2)); // Log the full response
        if (response && response.checkout_url) {
          resolve(response);
        } else {
          reject(
            new Error(
              'Invalid response from ShurjoPay: checkout_url not found',
            ),
          );
        }
      },
      (error) => {
        console.error('ShurjoPay Error:', error); // Log the error
        reject(error);
      },
    );
  });
};

const verifyPaymentAsync = (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
